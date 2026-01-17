import { useState } from 'react';
import { battleService } from '../../services/battleService';
import { useNavigate } from 'react-router-dom';

export default function BattleLobby({ onJoin }) {
    const [hostName, setHostName] = useState('');
    const [roomIdToJoin, setRoomIdToJoin] = useState('');
    const [joinName, setJoinName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!hostName.trim()) return;

        setIsCreating(true);
        try {
            const roomId = await battleService.createRoom(hostName);
            // Store player info locally or in context
            localStorage.setItem('battle_username', hostName);
            localStorage.setItem('battle_userid', roomId); // For host, playerID can be roomID or separate. Using roomID as playerID for host in this simple version might conflict if not careful. Let's start fresh.
            // Correction: battleService.createRoom adds host to players with ID == roomID.
            // Let's stick to that for simplicity or use a proper ID.
            // Actually battleService.createRoom uses newRoomRef.key as the key for the host player too.
            onJoin(roomId, hostName, roomId);
        } catch (err) {
            setError("Error creating room: " + err.message);
        } finally {
            setIsCreating(false);
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault();
        if (!roomIdToJoin.trim() || !joinName.trim()) return;

        try {
            const playerId = await battleService.joinRoom(roomIdToJoin, joinName);
            localStorage.setItem('battle_username', joinName);
            onJoin(roomIdToJoin, joinName, playerId);
        } catch (err) {
            setError("Error joining room: " + err.message);
        }
    };

    const navigate = useNavigate();

    return (
        <div className="battle-lobby" style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'var(--spacing-xl)',
            minHeight: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative' // For absolute positioning if needed
        }}>
            {/* Navigation */}
            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'var(--bg-secondary)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
                ← Back to Home
            </button>

            {/* Branding Header */}
            <div style={{ textAlign: 'center', marginBottom: '80px', marginTop: '60px' }}> {/* Increased spacing */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    marginBottom: 'var(--spacing-md)'
                }}>
                    <img
                        src="/logo.png"
                        alt="GoGuru Logo"
                        style={{ width: '64px', height: '64px', filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))' }}
                    />
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)', // Premium White/Grey Gradient
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: 0,
                        letterSpacing: '-1px'
                    }}>
                        GoGuru <span style={{
                            background: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Battle</span>
                    </h1>
                </div>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: 1.6
                }}>
                    Compete in real-time Go challenges. Verify your skills against others and climb the ranks to become a true <span style={{ color: 'var(--accent-amber-text)', fontWeight: 600 }}>Gopher Master</span>.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                gap: 'var(--spacing-2xl)',
                maxWidth: '1000px',
                margin: '0 auto',
                width: '100%'
            }}>
                {/* Create Room Card */}
                <div className="card" style={{
                    borderTop: '4px solid #a855f7', // Purple Accent
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                    // hover effect handling via CSS in global styles usually, inline assumes static
                }}>
                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(168, 85, 247, 0.1)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            marginBottom: 'var(--spacing-md)'
                        }}>
                            🚀
                        </div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '8px' }}>Crear Sala</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Start a new battle session and invite friends or colleagues to join.
                        </p>
                    </div>

                    <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                                Tu Nombre
                            </label>
                            <input
                                type="text"
                                value={hostName}
                                onChange={(e) => setHostName(e.target.value)}
                                className="search-input"
                                style={{
                                    padding: '12px 16px',
                                    fontSize: '1rem',
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-subtle)',
                                    width: '100%'
                                }}
                                placeholder="e.g. Gopher Master"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                padding: '14px',
                                fontSize: '1.05rem',
                                background: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
                                boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)'
                            }}
                        >
                            {isCreating ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span className="spinner" style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                                    Creando...
                                </span>
                            ) : 'Crear Sala'}
                        </button>
                    </form>
                </div>

                {/* Join Room Card */}
                <div className="card" style={{
                    borderTop: '4px solid #3b82f6' // Blue Accent
                }}>
                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(59, 130, 246, 0.1)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            marginBottom: 'var(--spacing-md)'
                        }}>
                            🎮
                        </div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '8px' }}>Unirse a Sala</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Enter an existing room code to join the battle.
                        </p>
                    </div>

                    <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: 'var(--text-secondary)',
                                    marginBottom: '8px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    ID de Sala
                                </label>
                                <input
                                    type="text"
                                    value={roomIdToJoin}
                                    onChange={(e) => setRoomIdToJoin(e.target.value)}
                                    className="search-input"
                                    style={{
                                        padding: '12px 16px',
                                        fontSize: '1rem',
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-subtle)',
                                        width: '100%',
                                        fontFamily: 'var(--font-mono)'
                                    }}
                                    placeholder="e.g. -Okd..."
                                    required
                                />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: 'var(--text-secondary)',
                                    marginBottom: '8px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    Tu Nombre
                                </label>
                                <input
                                    type="text"
                                    value={joinName}
                                    onChange={(e) => setJoinName(e.target.value)}
                                    className="search-input"
                                    style={{
                                        padding: '12px 16px',
                                        fontSize: '1rem',
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-subtle)',
                                        width: '100%'
                                    }}
                                    placeholder="e.g. Gopher Ninja"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                padding: '14px',
                                fontSize: '1.05rem',
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                            }}
                        >
                            Unirse
                        </button>
                    </form>
                </div>
            </div>

            {error && (
                <div style={{
                    marginTop: 'var(--spacing-xl)',
                    padding: 'var(--spacing-md)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderLeft: '4px solid #ef4444',
                    color: '#f87171',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: 'var(--spacing-xl) auto 0'
                }}>
                    ⚠️ {error}
                </div>
            )}

            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
