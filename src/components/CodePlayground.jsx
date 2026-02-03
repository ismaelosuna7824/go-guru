import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { executeCode, validateCode } from '../services/goExecutorService';
import { useTheme } from '../context/ThemeContext';

export default function CodePlayground({ initialCode, expectedOutput }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [code, setCode] = useState(initialCode ? initialCode.replace(/\\n/g, '\n') : '');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState('');
    const [validationResult, setValidationResult] = useState(null);
    const [executionTime, setExecutionTime] = useState(null);

    const handleEditorChange = (value) => {
        setCode(value || '');
    };

    const runCode = async () => {
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
            const result = await executeCode(code, expectedOutput);

            const endTime = performance.now();
            const duration = (endTime - startTime).toFixed(2);
            setExecutionTime(duration);

            setIsRunning(false);

            if (result.success) {
                setStatus('Finished');
                setOutput(result.output || 'No output');

                if (expectedOutput) {
                    setValidationResult({
                        success: result.correct,
                        message: result.message || (result.correct ? '¡Correcto!' : 'Resultado incorrecto')
                    });
                }
            } else {
                setStatus('Failed');
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

    // Theme-aware colors
    const colors = {
        headerBg: isDark ? 'var(--vscode-editorGroupHeader-tabsBg)' : '#f5f5f5',
        headerBorder: isDark ? '#111' : '#d4d4d4',
        badgeBg: isDark ? '#37373d' : '#e0e0e0',
        badgeColor: isDark ? '#fff' : '#333',
        consoleBg: isDark ? '#1e1e1e' : '#f8f8f8',
        consoleBorder: isDark ? '#333' : '#d4d4d4',
        consoleHeaderBg: isDark ? '#252526' : '#ececec',
        consoleText: isDark ? '#cccccc' : '#333333',
        placeholderText: isDark ? '#666' : '#999'
    };

    return (
        <div className="code-playground" style={{
            marginTop: '16px',
            border: `1px solid ${isDark ? 'var(--vscode-focusBorder)' : '#d4d4d4'}`,
            borderRadius: '6px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div className="editor-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 16px',
                background: colors.headerBg,
                borderBottom: `1px solid ${colors.headerBorder}`
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--vscode-editor-fg)' }}>
                        main.go
                    </span>
                    <span style={{
                        fontSize: '0.7rem',
                        background: colors.badgeBg,
                        color: colors.badgeColor,
                        padding: '2px 6px',
                        borderRadius: '3px'
                    }}>
                        GO
                    </span>
                </div>
                <button
                    onClick={runCode}
                    disabled={isRunning}
                    style={{
                        backgroundColor: isRunning ? '#666' : 'var(--vscode-button-bg)',
                        color: 'var(--vscode-button-fg)',
                        border: 'none',
                        fontSize: '0.85rem',
                        padding: '4px 12px',
                        borderRadius: '4px',
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

            <div style={{ height: '400px', position: 'relative' }}>
                <Editor
                    height="100%"
                    defaultLanguage="go"
                    defaultValue={initialCode ? initialCode.replace(/\\n/g, '\n') : ''}
                    value={code}
                    onChange={handleEditorChange}
                    theme={isDark ? 'vs-dark' : 'light'}
                    options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                        tabSize: 4,
                        insertSpaces: false,
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
                            color: colors.placeholderText,
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
                borderTop: `1px solid ${colors.consoleBorder}`,
                background: colors.consoleBg,
                color: colors.consoleText,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.9rem'
            }}>
                <div style={{
                    padding: '4px 16px',
                    background: colors.consoleHeaderBg,
                    color: isDark ? '#aaa' : '#666',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${colors.consoleBorder}`
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
                        <span style={{ color: isDark ? '#888' : '#666' }}>⏱ {executionTime}ms</span>
                    )}
                </div>
                <pre style={{
                    padding: '16px',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    overflowX: 'auto',
                    minHeight: '80px',
                    maxHeight: '200px',
                    fontFamily: 'inherit',
                    lineHeight: '1.5'
                }}>
                    {output || (isRunning ? <span style={{ color: colors.placeholderText }}>Compiling and executing...</span> : <span style={{ color: colors.placeholderText }}>// Execution output will appear here</span>)}
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
