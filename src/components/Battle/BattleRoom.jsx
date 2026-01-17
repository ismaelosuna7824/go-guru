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
            padding: 'var(--spacing-lg)',
            minHeight: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            {/* Header / Title Section */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                    background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Battle Lobby
                </h2>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '8px 16px',
                    borderRadius: '50px',
                    border: '1px solid var(--border-subtle)'
                }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>ROOM CODE:</span>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--accent-amber-text)',
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
                            color: 'var(--text-tertiary)',
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
                    borderTop: '4px solid #8b5cf6', // Purple accent
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--spacing-lg)',
                        paddingBottom: 'var(--spacing-md)',
                        borderBottom: '1px solid var(--border-subtle)'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>👥</span> Players
                        </h3>
                        <span style={{
                            background: '#8b5cf6',
                            color: 'white',
                            padding: '2px 10px',
                            borderRadius: '12px',
                            fontSize: '0.85rem',
                            fontWeight: 600
                        }}>
                            {players.length} / 2
                        </span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                        {players.map((p, i) => (
                            <li key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                background: p.name === playerName ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-secondary)',
                                border: p.name === playerName ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                                transition: 'transform 0.2s ease',
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 800,
                                    fontSize: '1rem',
                                    color: 'white',
                                    boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)'
                                }}>
                                    {p.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{
                                            fontWeight: 600,
                                            color: 'var(--text-primary)',
                                            fontSize: '1rem'
                                        }}>
                                            {p.name}
                                        </span>
                                        {p.name === playerName && (
                                            <span style={{
                                                fontSize: '0.7rem',
                                                color: 'var(--text-tertiary)',
                                                fontWeight: 500
                                            }}>(YOU)</span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                        {p.name === roomState.host ? '👑 Host' : 'Ready'}
                                    </div>
                                </div>
                                {/* Score Badge */}
                                <div style={{
                                    background: 'rgba(251, 191, 36, 0.1)',
                                    border: '1px solid rgba(251, 191, 36, 0.3)',
                                    borderRadius: '12px',
                                    padding: '4px 10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    <span style={{ fontSize: '0.75rem', color: '#fbbf24' }}>⭐</span>
                                    <span style={{ fontWeight: 700, color: '#fbbf24', fontSize: '0.9rem' }}>
                                        {p.score || 0}
                                    </span>
                                </div>
                            </li>
                        ))}
                        {players.length === 1 && (
                            <li style={{
                                padding: '16px',
                                textAlign: 'center',
                                color: 'var(--text-tertiary)',
                                border: '2px dashed var(--border-subtle)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.9rem'
                            }}>
                                Waiting for opponent to join...
                            </li>
                        )}
                    </ul>
                </div>

                {/* Game Control Card */}
                <div className="card" style={{
                    borderTop: '4px solid #10b981', // Green accent
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
                        <div style={{
                            fontSize: '4rem',
                            marginBottom: 'var(--spacing-md)',
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                        }}>
                            ⚔️
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                            Ready to Battle?
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
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
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: 'var(--text-secondary)',
                                    marginBottom: '8px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    Challenge Difficulty
                                </label>
                                <select
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    disabled={generating}
                                    style={{
                                        width: '100%',
                                        padding: '10px 36px 10px 12px',
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        outline: 'none',
                                        // Cross-browser reset
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none',
                                        appearance: 'none',
                                        // Custom dropdown arrow
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M2.5 4.5L6 8l3.5-3.5'/%3E%3C/svg%3E")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 12px center',
                                        backgroundSize: '12px'
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
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: 'var(--text-secondary)',
                                    marginBottom: '8px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    Challenge Language
                                </label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    disabled={generating}
                                    style={{
                                        width: '100%',
                                        padding: '10px 36px 10px 12px',
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        outline: 'none',
                                        // Cross-browser reset
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none',
                                        appearance: 'none',
                                        // Custom dropdown arrow
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M2.5 4.5L6 8l3.5-3.5'/%3E%3C/svg%3E")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 12px center',
                                        backgroundSize: '12px'
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
                                className="btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '12px',
                                    background: generating ? 'var(--bg-secondary)' : 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                                    cursor: (generating) ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                                    transform: generating ? 'none' : 'translateY(0)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {generating ? (
                                    <>
                                        <span className="spinner" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                                        Generating Challenge...
                                    </>
                                ) : (
                                    <>🚀 Start Battle</>
                                )}
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
                                    padding: '10px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    cursor: generating ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s ease',
                                    opacity: generating ? 0.5 : 1
                                }}
                            >
                                🗑️ Delete Room
                            </button>

                            {/* Validation / Error Message */}
                            {error && (
                                <div style={{
                                    marginTop: '1rem',
                                    padding: '10px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    borderLeft: '3px solid #ef4444',
                                    color: '#f87171',
                                    fontSize: '0.9rem',
                                    borderRadius: '4px'
                                }}>
                                    ⚠️ {error}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{
                            padding: '20px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 'var(--radius-md)',
                            textAlign: 'center',
                            border: '1px solid var(--border-subtle)'
                        }}>
                            <div style={{
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                background: '#fbbf24',
                                borderRadius: '50%',
                                marginRight: '8px',
                                animation: 'pulse 2s infinite'
                            }}></div>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                                Host is configuring the game...
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Global style tag for animations if not present */}
            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }
            `}</style>
        </div>
    );

}
