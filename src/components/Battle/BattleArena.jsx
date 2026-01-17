import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { battleService } from '../../services/battleService';
import { executeCode } from '../../services/goExecutorService';

export default function BattleArena({ roomId, playerId, player, roomState, isHost }) {
    const [code, setCode] = useState('// Waiting for challenge...');
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, running, success, failed

    const challenge = roomState.currentChallenge;
    const players = Object.values(roomState.players || {}).sort((a, b) => b.score - a.score);

    // Effect to set initial code when challenge arrives
    useEffect(() => {
        if (challenge?.initialCode) {
            // Unescape escaped newlines if coming from JSON string
            // The generator sends it as a string with \n, which JS might treat literally or not depending on parsing.
            // If it comes as "package main\n\nfunc...", it should be fine.
            // But let's be safe.
            setCode(challenge.initialCode);
        }
    }, [challenge]);

    const handleRun = async () => {
        setStatus('running');
        setOutput('Compiling and running tests...\n');

        try {
            if (!challenge?.testCases || challenge.testCases.length === 0) {
                setStatus('failed');
                setOutput('No test cases available');
                return;
            }

            // Build a test runner that executes Solution() for each test case
            // We need to remove the existing main() and replace it with our test runner
            let testCode = code;

            // Find and remove the main() function more carefully
            // Look for "func main()" and remove everything until we find the matching closing brace
            const mainFuncStart = testCode.indexOf('func main()');
            if (mainFuncStart !== -1) {
                // Find the opening brace
                const openBraceIndex = testCode.indexOf('{', mainFuncStart);
                if (openBraceIndex !== -1) {
                    // Count braces to find the matching closing brace
                    let braceCount = 1;
                    let i = openBraceIndex + 1;
                    while (i < testCode.length && braceCount > 0) {
                        if (testCode[i] === '{') braceCount++;
                        if (testCode[i] === '}') braceCount--;
                        i++;
                    }
                    // Remove from "func main()" to the closing brace (inclusive)
                    testCode = testCode.substring(0, mainFuncStart) + testCode.substring(i);
                }
            }

            // Build test runner with all test cases
            let testRunner = '\n\nfunc main() {\n';
            testRunner += '\tpassed := 0\n';
            testRunner += '\tfailed := 0\n\n';

            challenge.testCases.forEach((tc, i) => {
                const input = JSON.stringify(tc.input);
                const expectedOutput = String(tc.output);

                testRunner += `\t// Test Case ${i + 1}\n`;
                testRunner += `\tresult${i} := Solution(${input})\n`;
                testRunner += `\tif fmt.Sprint(result${i}) == "${expectedOutput}" {\n`;
                testRunner += `\t\tfmt.Printf("✓ Test ${i + 1}: PASS\\n")\n`;
                testRunner += `\t\tpassed++\n`;
                testRunner += `\t} else {\n`;
                testRunner += `\t\tfmt.Printf("✗ Test ${i + 1}: FAIL (expected ${expectedOutput}, got %v)\\n", result${i})\n`;
                testRunner += `\t\tfailed++\n`;
                testRunner += `\t}\n\n`;
            });

            testRunner += '\tfmt.Printf("\\n=== Results: %d/%d tests passed ===\\n", passed, passed+failed)\n';
            testRunner += '\tif failed > 0 {\n';
            testRunner += '\t\tfmt.Println("FAILED")\n';
            testRunner += '\t} else {\n';
            testRunner += '\t\tfmt.Println("SUCCESS")\n';
            testRunner += '\t}\n';
            testRunner += '}\n';

            const finalCode = testCode + testRunner;

            // Execute the modified code
            const result = await executeCode(finalCode);

            if (!result.success) {
                setStatus('failed');
                setOutput(result.error || result.stderr || 'Compilation failed');
                return;
            }

            setOutput(result.output);

            // Check if all tests passed by looking for "SUCCESS" in output
            const allPassed = result.output.includes('SUCCESS');

            if (allPassed) {
                setStatus('success');

                // Check if this player has already solved this challenge
                if (player.status === 'solved') {
                    // Already solved, don't award another point
                    return;
                }

                // Check if anyone else has already solved it
                const anyoneSolved = players.some(p => p.status === 'solved');

                if (!anyoneSolved) {
                    // This player is the FIRST to solve - award point
                    await battleService.addPoint(roomId, playerId);
                }

                // Mark this player as solved (regardless of being first or not)
                await battleService.updatePlayerStatus(roomId, playerId, 'solved');
            } else {
                setStatus('failed');
            }

        } catch (err) {
            setStatus('failed');
            setOutput('Error: ' + err.message);
        }
    };

    const handleEndGame = async () => {
        await battleService.updateRoomStatus(roomId, 'waiting');
    };

    return (
        <div className="battle-arena" style={{
            height: 'calc(100vh - 80px)', // Maximize height minus header/nav
            display: 'grid',
            gridTemplateColumns: '350px 1fr',
            gridTemplateRows: '1fr',
            gap: 'var(--spacing-md)',
            padding: 'var(--spacing-md)',
            maxWidth: '1920px',
            margin: '0 auto',
            '@media (max-width: 1024px)': {
                gridTemplateColumns: '250px 1fr'
            },
            '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
                gridTemplateRows: 'auto 1fr'
            }
        }}>
            {/* Left Column: Challenge & Leaderboard */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)',
                height: '100%',
                overflow: 'hidden' // Parent doesn't scroll
            }}>
                {/* Challenge Card - SCROLLABLE */}
                <div className="card" style={{
                    flex: '1', // Take available space
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden', // Contain inner scroll
                    minHeight: '0' // flex bug fix
                }}>
                    <div style={{ marginBottom: 'var(--spacing-md)', flexShrink: 0 }}>
                        <span style={{
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'var(--text-tertiary)',
                            fontWeight: 600
                        }}>
                            Current Challenge
                        </span>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--accent-amber-text)',
                            marginTop: '4px',
                            lineHeight: 1.2
                        }}>
                            {challenge?.title || 'Waiting for Challenge...'}
                        </h2>
                    </div>

                    <div style={{
                        flex: 1, // This part grows/shrinks
                        overflowY: 'auto', // Scroll ONLY this content
                        paddingRight: '8px', // Space for scrollbar
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        <div style={{
                            fontSize: '0.95rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6,
                            background: 'rgba(255,255,255,0.03)',
                            padding: '12px',
                            borderRadius: 'var(--radius-sm)',
                            marginBottom: 'var(--spacing-md)'
                        }}>
                            <p style={{ whiteSpace: 'pre-line' }}>{challenge?.description || 'The host is generating a challenge...'}</p>
                        </div>

                        <div>
                            <h3 style={{
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: 'var(--text-primary)',
                                marginBottom: '10px'
                            }}>
                                <span style={{ color: 'var(--accent-blue-text)' }}>⚡</span> Test Cases
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {challenge?.testCases?.map((tc, i) => (
                                    <div key={i} style={{
                                        background: 'var(--bg-code)',
                                        borderRadius: '6px',
                                        padding: '10px',
                                        fontSize: '0.85rem',
                                        fontFamily: 'var(--font-mono)',
                                        border: '1px solid var(--border-subtle)'
                                    }}>
                                        <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{ color: 'var(--text-tertiary)', width: '30px' }}>In:</span>
                                            <span style={{ color: 'var(--text-primary)' }}>{tc.input}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <span style={{ color: 'var(--text-tertiary)', width: '30px' }}>Out:</span>
                                            <span style={{ color: 'var(--accent-green-text)' }}>{tc.output}</span>
                                        </div>
                                    </div>
                                ))}
                                {!challenge?.testCases && (
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                                        No test cases visible yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leaderboard Card - FIXED at bottom */}
                <div className="card" style={{ flex: '0 0 auto', maxHeight: '300px', overflowY: 'auto' }}>
                    <h3 style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        marginBottom: 'var(--spacing-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        position: 'sticky',
                        top: 0,
                        background: 'var(--bg-card)', // Match card bg to cover scroll
                        zIndex: 1
                    }}>
                        <span>🏆</span> Leaderboard
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {players.map((p, i) => (
                            <div key={p.name} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
                                borderRadius: 'var(--radius-sm)',
                                background: i === 0 ? 'rgba(251, 191, 36, 0.1)' : 'rgba(255,255,255,0.03)',
                                border: i === 0 ? '1px solid rgba(251, 191, 36, 0.2)' : '1px solid transparent'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{
                                        fontWeight: 700,
                                        color: i === 0 ? '#fbbf24' : 'var(--text-tertiary)',
                                        width: '20px'
                                    }}>#{i + 1}</span>
                                    <span style={{ fontWeight: 500 }}>{p.name}</span>
                                    {p.status === 'solved' && <span title="Solved" style={{ fontSize: '0.8rem' }}>✅</span>}
                                </div>
                                <span style={{ fontWeight: 700, color: 'var(--accent-amber-text)' }}>{p.score} pts</span>
                            </div>
                        ))}
                    </div>

                    {isHost && (
                        <button
                            onClick={handleEndGame}
                            className="btn-secondary" // Use a danger/secondary styled button
                            style={{
                                marginTop: 'var(--spacing-lg)',
                                width: '100%',
                                padding: '10px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                fontSize: '0.9rem'
                            }}
                        >
                            End Game
                        </button>
                    )}
                </div>
            </div>

            {/* Right Column: Editor & Terminal */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                background: '#1e1e1e', // Editor base
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
            }}>
                {/* Editor Toolbar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: '#18181b', // Slightly darker than editor
                    borderBottom: '1px solid #333'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.2rem' }}>📄</span>
                            <span style={{ fontWeight: 600, color: '#e4e4e7', fontSize: '0.9rem' }}>main.go</span>
                        </div>
                        {status === 'success' ? (
                            <span style={{
                                padding: '2px 8px',
                                background: 'rgba(74, 222, 128, 0.1)',
                                color: '#4ade80',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                border: '1px solid rgba(74, 222, 128, 0.2)'
                            }}>
                                SOLVED
                            </span>
                        ) : (
                            <span style={{
                                padding: '2px 8px',
                                background: '#3f3f46',
                                color: '#a1a1aa',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 500
                            }}>
                                UNPUBLISHED
                            </span>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={handleRun}
                            disabled={status === 'running' || status === 'success'}
                            className="btn-primary"
                            style={{
                                padding: '6px 16px',
                                fontSize: '0.9rem',
                                background: status === 'success' ? '#15803d' : undefined,
                                opacity: (status === 'running') ? 0.7 : 1
                            }}
                        >
                            {status === 'running' ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span className="spinner" style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                                    Running...
                                </span>
                            ) : (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    ▶ Run Code
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Monaco Editor */}
                <div style={{ flex: 1, position: 'relative' }}>
                    <Editor
                        height="100%"
                        defaultLanguage="go"
                        theme="vs-dark"
                        value={code}
                        onChange={setCode}
                        options={{
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            fontSize: 14,
                            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                            padding: { top: 20, bottom: 20 },
                            lineNumbers: 'on',
                            renderLineHighlight: 'all',
                            automaticLayout: true
                        }}
                    />
                </div>

                {/* Console / Output */}
                <div style={{
                    height: '220px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderTop: '1px solid #333',
                    background: '#1a1a1a'
                }}>
                    <div style={{
                        padding: '8px 16px',
                        background: '#27272a',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #333'
                    }}>
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: '#a1a1aa',
                            textTransform: 'uppercase'
                        }}>
                            Terminal Output
                        </span>
                        {status !== 'idle' && (
                            <span style={{ fontSize: '0.75rem', color: status === 'failed' ? '#f87171' : '#4ade80' }}>
                                {status === 'failed' ? 'Process exited with error' : 'Success'}
                            </span>
                        )}
                    </div>
                    <pre style={{
                        flex: 1,
                        padding: '16px',
                        margin: 0,
                        overflowY: 'auto',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.9rem',
                        lineHeight: 1.5,
                        color: status === 'failed' ? '#fca5a5' : '#e4e4e7',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {output || <span style={{ color: '#52525b' }}>// Output will appear here after running...</span>}
                    </pre>
                </div>
            </div>
        </div>
    );
}
