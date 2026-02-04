import React, { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';

// Confetti particle component
const Confetti = ({ delay }) => {
    const colors = ['#00d4aa', '#ffd700', '#ff6b35', '#c586c0', '#569cd6', '#4ec9b0'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const animDuration = 2 + Math.random() * 2;
    const size = 4 + Math.random() * 6;

    return (
        <div
            style={{
                position: 'absolute',
                left: `${left}%`,
                top: '-10px',
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                animation: `confettiFall ${animDuration}s ease-out ${delay}s forwards`,
                opacity: 0,
                transform: `rotate(${Math.random() * 360}deg)`
            }}
        />
    );
};

/**
 * Enhanced Achievement notification with confetti and elaborate animations
 */
export default function AchievementNotification() {
    const { newAchievement, dismissAchievement } = useProgress();
    const [showConfetti, setShowConfetti] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (newAchievement) {
            setShowConfetti(true);
            setIsExiting(false);

            // Auto-dismiss after 6 seconds with exit animation
            const timer = setTimeout(() => {
                handleDismiss();
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [newAchievement]);

    const handleDismiss = () => {
        setIsExiting(true);
        setTimeout(() => {
            dismissAchievement();
            setShowConfetti(false);
            setIsExiting(false);
        }, 400);
    };

    if (!newAchievement) return null;

    // Generate confetti particles
    const confettiParticles = Array.from({ length: 30 }, (_, i) => (
        <Confetti key={i} delay={i * 0.05} />
    ));

    return (
        <>
            {/* Confetti Container */}
            {showConfetti && (
                <div style={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '20px',
                    width: '320px',
                    height: '200px',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    overflow: 'hidden'
                }}>
                    {confettiParticles}
                </div>
            )}

            {/* Achievement Card */}
            <div
                className="achievement-notification"
                onClick={handleDismiss}
                style={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '20px',
                    background: 'linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%)',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    zIndex: 9999,
                    minWidth: '300px',
                    overflow: 'hidden',
                    animation: isExiting
                        ? 'slideOutRight 0.4s ease-in forwards'
                        : 'achievementBounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    boxShadow: '0 10px 40px rgba(0, 212, 170, 0.4), 0 0 60px rgba(0, 212, 170, 0.2)'
                }}
            >
                {/* Animated Border */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '16px',
                    padding: '2px',
                    background: 'linear-gradient(90deg, #00d4aa, #ffd700, #ff6b35, #00d4aa)',
                    backgroundSize: '300% 100%',
                    animation: 'borderGradient 3s linear infinite',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none'
                }} />

                {/* Shine Effect */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    animation: 'shine 2s ease-in-out infinite',
                    pointerEvents: 'none'
                }} />

                {/* Achievement Icon with Glow */}
                <div style={{
                    fontSize: '48px',
                    lineHeight: 1,
                    animation: 'iconBounce 0.6s ease-out 0.3s both, iconGlow 2s ease-in-out infinite',
                    position: 'relative'
                }}>
                    {newAchievement.icon}
                    {/* Icon Ring */}
                    <div style={{
                        position: 'absolute',
                        inset: '-8px',
                        borderRadius: '50%',
                        border: '2px solid rgba(0, 212, 170, 0.5)',
                        animation: 'ringPulse 1.5s ease-out infinite'
                    }} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                    <div style={{
                        color: '#00d4aa',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: '6px',
                        animation: 'textFadeIn 0.5s ease-out 0.2s both'
                    }}>
                        ¡Logro Desbloqueado!
                    </div>
                    <div style={{
                        color: '#ffffff',
                        fontSize: '18px',
                        fontWeight: 700,
                        marginBottom: '4px',
                        animation: 'textSlideIn 0.5s ease-out 0.3s both'
                    }}>
                        {newAchievement.title}
                    </div>
                    <div style={{
                        color: '#a8b9d4',
                        fontSize: '13px',
                        animation: 'textSlideIn 0.5s ease-out 0.4s both'
                    }}>
                        {newAchievement.description}
                    </div>

                    {/* XP Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '10px',
                        padding: '6px 12px',
                        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.1) 100%)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 215, 0, 0.4)',
                        animation: 'xpBadgePop 0.5s ease-out 0.5s both'
                    }}>
                        <span style={{ fontSize: '14px' }}>✨</span>
                        <span style={{
                            color: '#ffd700',
                            fontSize: '14px',
                            fontWeight: 700
                        }}>
                            +{newAchievement.xpReward} XP
                        </span>
                    </div>
                </div>

                {/* Close Button */}
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8b9dc3',
                    fontSize: '14px',
                    transition: 'all 0.2s ease'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = '#8b9dc3';
                    }}
                >
                    ×
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes achievementBounceIn {
                    0% {
                        transform: translateX(120%) scale(0.8);
                        opacity: 0;
                    }
                    50% {
                        transform: translateX(-10%) scale(1.05);
                        opacity: 1;
                    }
                    70% {
                        transform: translateX(5%) scale(0.98);
                    }
                    100% {
                        transform: translateX(0) scale(1);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(120%);
                        opacity: 0;
                    }
                }
                
                @keyframes borderGradient {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 300% 50%; }
                }
                
                @keyframes shine {
                    0% { left: -100%; }
                    50%, 100% { left: 200%; }
                }
                
                @keyframes iconBounce {
                    0% {
                        transform: scale(0) rotate(-180deg);
                        opacity: 0;
                    }
                    60% {
                        transform: scale(1.2) rotate(10deg);
                    }
                    100% {
                        transform: scale(1) rotate(0deg);
                        opacity: 1;
                    }
                }
                
                @keyframes iconGlow {
                    0%, 100% {
                        filter: drop-shadow(0 0 8px rgba(0, 212, 170, 0.6));
                    }
                    50% {
                        filter: drop-shadow(0 0 20px rgba(0, 212, 170, 0.8));
                    }
                }
                
                @keyframes ringPulse {
                    0% {
                        transform: scale(1);
                        opacity: 0.5;
                    }
                    100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }
                
                @keyframes textFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes textSlideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes xpBadgePop {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    60% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                
                @keyframes confettiFall {
                    0% {
                        opacity: 1;
                        transform: translateY(0) rotate(0deg);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(200px) rotate(720deg);
                    }
                }
            `}</style>
        </>
    );
}
