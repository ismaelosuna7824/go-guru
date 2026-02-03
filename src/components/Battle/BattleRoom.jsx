import { useState, useEffect } from 'react';
import { battleService } from '../../services/battleService';
import BattleArena from './BattleArena';

export default function BattleRoom({ roomId, playerId, playerName, onLeave }) {
    const [roomState, setRoomState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [difficulty, setDifficulty] = useState('beginner');
    const [language, setLanguage] = useState('es'); // 'es' or 'en'
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = battleService.subscribeToRoom(roomId, (data) => {
            setRoomState(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [roomId]);

    if (loading) return <div className="text-center p-8">Sincronizando con el servidor...</div>;
    if (!roomState) return <div className="text-center p-8 text-red-400">La sala no existe o ha sido cerrada.</div>;

    const isHost = roomState.host === playerName; // Simple check, ideally check ID
    const players = Object.values(roomState.players || {});

    const handleStartGame = async () => {
        if (!isHost) return;
        try {
            setGenerating(true);
            setError(null);

            // 1. Generate Challenge with selected difficulty and language
            const challenge = await battleService.generateChallenge(difficulty, language);

            // 2. Set Challenge and Start Game
            await battleService.setChallenge(roomId, challenge);

        } catch (err) {
            setError("Error al iniciar juego: " + err.message);
        } finally {
            setGenerating(false);
        }
    };

    if (roomState.status === 'playing' || roomState.status === 'finished') {
        return (
            <BattleArena
                roomId={roomId}
                playerId={playerId}
                player={roomState.players[playerId]} // pass my player object
                roomState={roomState}
                isHost={isHost}
            />
        );
    }

    // Waiting Lobby View

    return (
        <div className="battle-room" style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '24px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'var(--vscode-editor-bg)',
            color: 'var(--vscode-editor-fg)'
        }}>
            {/* Header / Title Section */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: 'var(--vscode-editor-fg)',
                    marginBottom: '16px'
                }}>
                    Battle Lobby
                </h2>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'var(--vscode-textBlockQuote-background)',
                    padding: '8px 16px',
                    borderRadius: '2px', // Square-ish for VS Code
                    border: '1px solid var(--vscode-textBlockQuote-border)'
                }}>
                    <span style={{ color: 'var(--vscode-descriptionForeground)', fontSize: '0.9rem', fontWeight: 500 }}>ROOM CODE:</span>
                    <span style={{
                        fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: 'var(--vscode-textLink-foreground)',
                        letterSpacing: '1px'
                    }}>
                        {roomId}
                    </span>
                    <button
                        onClick={() => navigator.clipboard.writeText(roomId)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--vscode-icon-foreground)',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        title="Copy Code"
                    >
                        📋
                    </button>
                </div>
            </div>

            <div className="lobby-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: 'var(--spacing-xl)'
            }}>
                {/* Players List Card */}
                <div className="card" style={{
                    backgroundColor: 'var(--vscode-sideBar-bg)',
                    border: '1px solid var(--vscode-sideBar-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px',
                        paddingBottom: '8px',
                        borderBottom: '1px solid var(--vscode-sideBar-border)'
                    }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--vscode-sideBarTitle-foreground)', textTransform: 'uppercase' }}>
                            <span>👥</span> Players
                        </h3>
                        <span style={{
                            background: 'var(--vscode-badge-background)',
                            color: 'var(--vscode-badge-foreground)',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '0.8rem',
                            fontWeight: 600
                        }}>
                            {players.length} / 2
                        </span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                        {players.map((p, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '8px',
                                borderRadius: '2px',
                                background: p.name === playerName ? 'var(--vscode-list-activeSelectionBg)' : 'transparent',
                                color: p.name === playerName ? 'var(--vscode-list-activeSelectionForeground)' : 'var(--vscode-foreground)',
                                border: '1px solid transparent',
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'var(--vscode-activityBar-badgeBackground)',
                                    color: 'var(--vscode-activityBar-badgeForeground)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                }}>
                                    {p.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{
                                            fontWeight: 600,
                                            fontSize: '0.95rem'
                                        }}>
                                            {p.name}
                                        </span>
                                        {p.name === playerName && (
                                            <span style={{
                                                fontSize: '0.7rem',
                                                opacity: 0.8,
                                                fontWeight: 500
                                            }}>(YOU)</span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                        {p.name === roomState.host ? '👑 Host' : 'Ready'}
                                    </div>
                                </div>
                                {/* Score Badge */}
                                <div style={{
                                    background: 'transparent',
                                    padding: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    <span style={{ fontSize: '0.75rem' }}>⭐</span>
                                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                                        {p.score || 0}
                                    </span>
                                </div>
                            </li>
                        ))}
                        {players.length === 1 && (
                            <li style={{
                                padding: '16px',
                                textAlign: 'center',
                                color: 'var(--vscode-descriptionForeground)',
                                border: '1px dashed var(--vscode-sideBar-border)',
                                fontSize: '0.9rem'
                            }}>
                                Waiting for opponent to join...
                            </li>
                        )}
                    </ul>
                </div>

                {/* Game Control Card */}
                <div className="card" style={{
                    backgroundColor: 'var(--vscode-sideBar-bg)',
                    border: '1px solid var(--vscode-sideBar-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '16px'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <div style={{
                            fontSize: '4rem',
                            marginBottom: '16px',
                        }}>
                            ⚔️
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--vscode-sideBarTitle-foreground)', marginBottom: '8px' }}>
                            Ready to Battle?
                        </h3>
                        <p style={{ color: 'var(--vscode-descriptionForeground)', lineHeight: 1.5 }}>
                            {isHost
                                ? 'Generate a unique AI challenge and start the match.'
                                : 'Wait for the host to start the game. Good luck!'}
                        </p>
                    </div>

                    {isHost ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Difficulty Selector */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    color: 'var(--vscode-input-placeholderForeground)',
                                    marginBottom: '6px',
                                    textTransform: 'uppercase'
                                }}>
                                    Challenge Difficulty
                                </label>
                                <select
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    disabled={generating}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        background: 'var(--vscode-dropdown-background)',
                                        border: '1px solid var(--vscode-dropdown-border)',
                                        color: 'var(--vscode-dropdown-foreground)',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="beginner">🟢 Beginner</option>
                                    <option value="intermediate">🟡 Intermediate</option>
                                    <option value="advanced">🔴 Advanced</option>
                                </select>
                            </div>

                            {/* Language Selector */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    color: 'var(--vscode-input-placeholderForeground)',
                                    marginBottom: '6px',
                                    textTransform: 'uppercase'
                                }}>
                                    Challenge Language
                                </label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    disabled={generating}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        background: 'var(--vscode-dropdown-background)',
                                        border: '1px solid var(--vscode-dropdown-border)',
                                        color: 'var(--vscode-dropdown-foreground)',
                                        fontSize: '0.9rem',
                                        cursor: 'pointer',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="es">🇪🇸 Español</option>
                                    <option value="en">🇺🇸 English</option>
                                </select>
                            </div>

                            {/* Start Battle Button */}
                            <button
                                onClick={handleStartGame}
                                disabled={generating || players.length < 1}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    fontSize: '1rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: generating ? 'var(--vscode-button-secondaryBackground)' : 'var(--vscode-button-bg)',
                                    color: 'var(--vscode-button-fg)',
                                    border: 'none',
                                    cursor: (generating) ? 'not-allowed' : 'pointer',
                                }}
                                onMouseEnter={(e) => !generating && (e.target.style.background = 'var(--vscode-button-hoverBackground)')}
                                onMouseLeave={(e) => !generating && (e.target.style.background = 'var(--vscode-button-bg)')}
                            >
                                {generating ? 'Generating...' : '🚀 Start Battle'}
                            </button>

                            {/* Delete Room Button */}
                            <button
                                onClick={async () => {
                                    if (window.confirm('Are you sure you want to delete this room? All players will be disconnected.')) {
                                        await battleService.deleteRoom(roomId);
                                        onLeave(); // Navigate back to lobby
                                    }
                                }}
                                disabled={generating}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    background: 'var(--vscode-button-secondaryBackground)',
                                    color: 'var(--vscode-button-secondaryForeground)',
                                    border: '1px solid var(--vscode-button-border)',
                                    fontSize: '0.9rem',
                                    cursor: generating ? 'not-allowed' : 'pointer',
                                }}
                                onMouseEnter={(e) => !generating && (e.target.style.background = 'var(--vscode-button-secondaryHoverBackground)')}
                                onMouseLeave={(e) => !generating && (e.target.style.background = 'var(--vscode-button-secondaryBackground)')}
                            >
                                🗑️ Delete Room
                            </button>

                            {/* Validation / Error Message */}
                            {error && (
                                <div style={{
                                    marginTop: '1rem',
                                    padding: '8px',
                                    background: 'var(--vscode-inputValidation-errorBackground)',
                                    border: '1px solid var(--vscode-inputValidation-errorBorder)',
                                    color: 'var(--vscode-errorForeground)',
                                    fontSize: '0.9rem'
                                }}>
                                    ⚠️ {error}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{
                            padding: '20px',
                            background: 'transparent',
                            textAlign: 'center',
                            border: '1px dashed var(--vscode-sideBar-border)',
                            color: 'var(--vscode-descriptionForeground)'
                        }}>
                            <span style={{ fontWeight: 500 }}>
                                Host is configuring the game...
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Global style tag for animations if not present */}
            {/* Styles removed */}
        </div>
    );

}
