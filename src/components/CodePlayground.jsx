import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { executeCode, validateCode } from '../services/goExecutorService';

export default function CodePlayground({ initialCode, expectedOutput }) {
    const [code, setCode] = useState(initialCode ? initialCode.replace(/\\n/g, '\n') : '');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState('');
    const [validationResult, setValidationResult] = useState(null); // { success: boolean, message: string }
    const [executionTime, setExecutionTime] = useState(null);

    const handleEditorChange = (value) => {
        setCode(value || '');
    };

    const runCode = async () => {
        // Pre-flight validation
        const localValidation = validateCode(code);
        if (!localValidation.valid) {
            setOutput(localValidation.error);
            setValidationResult({ success: false, message: 'Código inválido' });
            return;
        }

        setIsRunning(true);
        setOutput('');
        setStatus('Running...');
        setValidationResult(null);
        setExecutionTime(null);

        const startTime = performance.now();

        try {
            // Call the execution service
            const result = await executeCode(code, expectedOutput);

            const endTime = performance.now();
            const duration = (endTime - startTime).toFixed(2);
            setExecutionTime(duration);

            setIsRunning(false);

            if (result.success) {
                setStatus('Finished');
                setOutput(result.output || 'No output');

                // If expectedOutput was provided, the backend returns 'correct' flag
                if (expectedOutput) {
                    setValidationResult({
                        success: result.correct,
                        message: result.message || (result.correct ? '¡Correcto!' : 'Resultado incorrecto')
                    });
                }
            } else {
                setStatus('Failed');
                // Handle different error types from the service
                if (result.stderr) {
                    setOutput(`Error:\n${result.stderr}`);
                } else {
                    setOutput(`Error: ${result.error || 'Unknown error'}`);
                }

                setValidationResult({
                    success: false,
                    message: result.message || 'Error en la ejecución'
                });
            }

        } catch (err) {
            setIsRunning(false);
            setStatus('Network Error');
            setOutput(err.message);
        }
    };

    return (
        <div className="code-playground" style={{
            marginTop: 'var(--spacing-md)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div className="editor-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                background: '#1e1e1e', // Matches VS Code dark header
                borderBottom: '1px solid #333'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cccccc' }}>
                        main.go
                    </span>
                    <span style={{
                        fontSize: '0.7rem',
                        background: '#37373d',
                        color: '#fff',
                        padding: '2px 6px',
                        borderRadius: '3px'
                    }}>
                        GO
                    </span>
                </div>
                <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="btn-primary"
                    style={{
                        fontSize: '0.85rem',
                        padding: '0.3rem 1rem',
                        opacity: isRunning ? 0.7 : 1,
                        cursor: isRunning ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        margin: 0
                    }}
                >
                    {isRunning ? (
                        <>
                            <span className="spinner" style={{
                                width: '12px',
                                height: '12px',
                                border: '2px solid rgba(255,255,255,0.3)',
                                borderTop: '2px solid #fff',
                                borderRadius: '50%',
                                display: 'inline-block',
                                animation: 'spin 1s linear infinite'
                            }} />
                            Running
                        </>
                    ) : (
                        <>▶ Run</>
                    )}
                </button>
            </div>

            <div style={{ height: '300px', position: 'relative' }}>
                <Editor
                    height="100%"
                    defaultLanguage="go"
                    defaultValue={initialCode ? initialCode.replace(/\\n/g, '\n') : ''}
                    value={code}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                        tabSize: 4,
                        insertSpaces: false, // Go uses tabs
                        automaticLayout: true,
                        padding: { top: 16, bottom: 16 },
                        lineNumbers: 'on',
                        renderLineHighlight: 'all',
                        scrollbar: {
                            vertical: 'visible',
                            horizontal: 'visible',
                            useShadows: false,
                            verticalScrollbarSize: 10
                        }
                    }}
                    loading={
                        <div style={{
                            color: '#aaa',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'
                        }}>
                            Loading Editor...
                        </div>
                    }
                />
            </div>

            <div className="output-console" style={{
                borderTop: '1px solid #333',
                background: '#1a1a1a',
                color: '#f0f0f0',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.9rem'
            }}>
                <div style={{
                    padding: 'var(--spacing-xs) var(--spacing-md)',
                    background: '#252526',
                    color: '#aaa',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #333'
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        TERMINAL {status && <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: status === 'Running...' ? '#fbbf24' : (status === 'Finished' ? '#4ade80' : '#f87171')
                        }} />}
                    </span>
                    {executionTime && (
                        <span style={{ color: '#888' }}>⏱ {executionTime}ms</span>
                    )}
                </div>
                <pre style={{
                    padding: 'var(--spacing-md)',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    overflowX: 'auto',
                    minHeight: '80px',
                    maxHeight: '200px',
                    fontFamily: 'inherit',
                    lineHeight: '1.5'
                }}>
                    {output || (isRunning ? <span style={{ color: '#666' }}>Compiling and executing...</span> : <span style={{ color: '#444' }}>// Execution output will appear here</span>)}
                </pre>

                {validationResult && (
                    <div style={{
                        padding: '12px 16px',
                        background: validationResult.success ? 'rgba(22, 163, 74, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                        borderTop: validationResult.success ? '1px solid #15803d' : '1px solid #991b1b',
                        color: validationResult.success ? '#4ade80' : '#f87171',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span>{validationResult.success ? '✅' : '❌'}</span>
                        {validationResult.message}
                    </div>
                )}
            </div>
            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
