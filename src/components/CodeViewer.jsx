import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeViewer({ code, language = 'go' }) {
    // Normalize language for highlighter (it usually expects lowercase)
    const lang = language.toLowerCase();

    return (
        <div className="code-viewer-wrapper" style={{
            fontSize: '0.9rem',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)'
        }}>
            <SyntaxHighlighter
                language={lang}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: 'var(--spacing-lg)',
                    backgroundColor: '#1e1e1e', // Matches VS Code dark
                    fontFamily: 'var(--font-mono)'
                }}
                showLineNumbers={false}
                lineNumberStyle={{
                    minWidth: '2em',
                    paddingRight: '1em',
                    color: '#6e7681',
                    textAlign: 'right'
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
