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
            maxWidth: '900px',
            margin: '0 auto',
            padding: '40px 20px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: 'var(--vscode-editor-bg)',
            color: 'var(--vscode-editor-fg)'
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
                    color: 'var(--vscode-textLink-foreground)',
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
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
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
                        style={{ width: '64px', height: '64px', borderRadius: '50%', filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))' }}
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
                        GoGuru <span style={{ color: 'var(--vscode-textLink-foreground)' }}>Battle</span>
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
                    backgroundColor: 'var(--vscode-sideBar-bg)',
                    border: '1px solid var(--vscode-sideBar-border)',
                    padding: '24px',
                }}>
                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px', color: 'var(--vscode-sideBarTitle-foreground)' }}>Crear Sala</h2>
                        <p style={{ color: 'var(--vscode-descriptionForeground)', fontSize: '0.9rem' }}>
                            Start a new battle session and invite friends or colleagues to join.
                        </p>
                    </div>

                    <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: 'var(--vscode-input-placeholderForeground)',
                                marginBottom: '6px',
                                textTransform: 'uppercase'
                            }}>
                                Tu Nombre
                            </label>
                            <input
                                type="text"
                                value={hostName}
                                onChange={(e) => setHostName(e.target.value)}
                                style={{
                                    padding: '8px 12px',
                                    fontSize: '0.9rem',
                                    background: 'var(--vscode-input-background)',
                                    color: 'var(--vscode-input-foreground)',
                                    border: '1px solid var(--vscode-input-border)',
                                    width: '100%',
                                    outline: 'none'
                                }}
                                placeholder="e.g. Gopher Master"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isCreating}
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '0.9rem',
                                background: 'var(--vscode-button-bg)',
                                color: 'var(--vscode-button-fg)',
                                border: 'none',
                                cursor: isCreating ? 'wait' : 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onMouseEnter={(e) => !isCreating && (e.target.style.background = 'var(--vscode-button-hoverBackground)')}
                            onMouseLeave={(e) => !isCreating && (e.target.style.background = 'var(--vscode-button-bg)')}
                        >
                            {isCreating ? 'Creating...' : 'Crear Sala'}
                        </button>
                    </form>
                </div>

                {/* Join Room Card */}
                <div className="card" style={{
                    backgroundColor: 'var(--vscode-sideBar-bg)',
                    border: '1px solid var(--vscode-sideBar-border)',
                    padding: '24px',
                }}>
                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px', color: 'var(--vscode-sideBarTitle-foreground)' }}>Unirse a Sala</h2>
                        <p style={{ color: 'var(--vscode-descriptionForeground)', fontSize: '0.9rem' }}>
                            Enter an existing room code to join the battle.
                        </p>
                    </div>

                    <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    color: 'var(--vscode-input-placeholderForeground)',
                                    marginBottom: '6px',
                                    textTransform: 'uppercase'
                                }}>
                                    ID de Sala
                                </label>
                                <input
                                    type="text"
                                    value={roomIdToJoin}
                                    onChange={(e) => setRoomIdToJoin(e.target.value)}
                                    style={{
                                        padding: '8px 12px',
                                        fontSize: '0.9rem',
                                        background: 'var(--vscode-input-background)',
                                        color: 'var(--vscode-input-foreground)',
                                        border: '1px solid var(--vscode-input-border)',
                                        width: '100%',
                                        fontFamily: 'monospace',
                                        outline: 'none'
                                    }}
                                    placeholder="e.g. -Okd..."
                                    required
                                />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    color: 'var(--vscode-input-placeholderForeground)',
                                    marginBottom: '6px',
                                    textTransform: 'uppercase'
                                }}>
                                    Tu Nombre
                                </label>
                                <input
                                    type="text"
                                    value={joinName}
                                    onChange={(e) => setJoinName(e.target.value)}
                                    style={{
                                        padding: '8px 12px',
                                        fontSize: '0.9rem',
                                        background: 'var(--vscode-input-background)',
                                        color: 'var(--vscode-input-foreground)',
                                        border: '1px solid var(--vscode-input-border)',
                                        width: '100%',
                                        outline: 'none'
                                    }}
                                    placeholder="e.g. Gopher Ninja"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '0.9rem',
                                background: 'var(--vscode-button-bg)',
                                color: 'var(--vscode-button-fg)',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'var(--vscode-button-hoverBackground)'}
                            onMouseLeave={(e) => e.target.style.background = 'var(--vscode-button-bg)'}
                        >
                            Unirse
                        </button>
                    </form>
                </div>
            </div>

            {error && (
                <div style={{
                    marginTop: '24px',
                    padding: '8px 12px',
                    background: 'var(--vscode-inputValidation-errorBackground)',
                    border: '1px solid var(--vscode-inputValidation-errorBorder)',
                    color: 'var(--vscode-errorForeground)',
                    borderRadius: '2px',
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '24px auto 0'
                }}>
                    ⚠️ {error}
                </div>
            )}

            {/* Styles removed */}
        </div>
    );
}
