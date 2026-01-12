import React, { useState } from 'react';
import { executeCode, validateCode } from '../services/goExecutorService';

export default function CodePlayground({ initialCode, expectedOutput }) {
    const [code, setCode] = useState(initialCode ? initialCode.replace(/\\n/g, '\n') : '');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState('');
    const [validationResult, setValidationResult] = useState(null); // { success: boolean, message: string }
    const [executionTime, setExecutionTime] = useState(null);

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
            overflow: 'hidden'
        }}>
            <div className="editor-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-subtle)'
            }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Go Playground
                </span>
                <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="btn-primary"
                    style={{
                        fontSize: '0.85rem',
                        padding: '0.4rem 1rem',
                        opacity: isRunning ? 0.7 : 1,
                        cursor: isRunning ? 'wait' : 'pointer',
                        margin: 0
                    }}
                >
                    {isRunning ? 'Running...' : '▶ Run Code'}
                </button>
            </div>

            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        const start = e.target.selectionStart;
                        const end = e.target.selectionEnd;

                        const newValue = code.substring(0, start) + "\t" + code.substring(end);

                        setCode(newValue);

                        setTimeout(() => {
                            e.target.selectionStart = e.target.selectionEnd = start + 1;
                        }, 0);
                    }
                }}
                spellCheck="false"
                style={{
                    width: '100%',
                    minHeight: '200px',
                    padding: 'var(--spacing-md)',
                    background: 'var(--bg-code)',
                    color: 'var(--text-primary)',
                    border: 'none',
                    fontFamily: 'monospace',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    resize: 'vertical',
                    outline: 'none',
                    tabSize: 4
                }}
            />

            <div className="output-console" style={{
                borderTop: '1px solid var(--border-subtle)',
                background: '#1a1a1a',
                color: '#f0f0f0',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
            }}>
                <div style={{
                    padding: 'var(--spacing-xs) var(--spacing-md)',
                    background: '#2d2d2d',
                    color: '#aaa',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <span>Console Output {status && `• ${status}`}</span>
                    {executionTime && (
                        <span style={{ color: '#aaa' }}>{executionTime}ms</span>
                    )}
                </div>
                <pre style={{
                    padding: 'var(--spacing-md)',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    overflowX: 'auto',
                    minHeight: '60px'
                }}>
                    {output || (isRunning ? 'Waiting for output...' : '// Output will appear here')}
                </pre>

                {validationResult && (
                    <div style={{
                        padding: 'var(--spacing-md)',
                        background: validationResult.success ? 'rgba(22, 163, 74, 0.2)' : 'rgba(220, 38, 38, 0.2)',
                        borderTop: validationResult.success ? '1px solid #16a34a' : '1px solid #dc2626',
                        color: validationResult.success ? '#4ade80' : '#f87171',
                        fontWeight: 600
                    }}>
                        {validationResult.success ? '✅ ' : '❌ '}
                        {validationResult.message}
                    </div>
                )}
            </div>
        </div>
    );
}
