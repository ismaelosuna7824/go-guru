import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../context/ThemeContext';

export default function CodeViewer({ code, language = 'go' }) {
    const { theme, fontSizeValue } = useTheme();
    const lang = language.toLowerCase();
    const isDark = theme === 'dark';

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
                    backgroundColor: isDark ? '#1e1e1e' : '#f8f8f8',
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
