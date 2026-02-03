import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../context/ThemeContext';

export default function CodeViewer({ code, language = 'go' }) {
    const { theme, fontSizeValue } = useTheme();
    const lang = language.toLowerCase();
    // All themes except 'light' are considered dark
    const isDark = theme !== 'light';

    return (
        <div className="code-viewer-wrapper" style={{
            overflow: 'hidden',
        }}>
            <SyntaxHighlighter
                language={lang}
                style={isDark ? vscDarkPlus : vs}
                customStyle={{
                    margin: 0,
                    padding: '16px',
                    backgroundColor: 'var(--bg-code)',
                    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
                    fontSize: `${fontSizeValue}px`,
                    lineHeight: '1.5'
                }}
                showLineNumbers={false}
                lineNumberStyle={{
                    minWidth: '2em',
                    paddingRight: '1em',
                    color: isDark ? '#858585' : '#999999',
                    textAlign: 'right'
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
