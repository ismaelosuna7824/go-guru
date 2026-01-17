import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import BattleLobby from './BattleLobby';
import BattleRoom from './BattleRoom';

export default function BattlePage() {
    const navigate = useNavigate();
    // We can use URL params for direct linking too, but for now simple state
    const [roomId, setRoomId] = useState(null);
    const [playerId, setPlayerId] = useState(null);
    const [playerName, setPlayerName] = useState(null);

    const handleJoin = (id, name, pid) => {
        setRoomId(id);
        setPlayerName(name);
        setPlayerId(pid);
    };

    const handleLeave = () => {
        setRoomId(null);
        setPlayerId(null);
        // optionally disconnect
    };

    return (
        <div className="battle-page h-full"> {/* h-full to fill main content */}
            {/* Optional local header if needed, but Sidebar has the branding. 
                Maybe just a simple breadcrumb or title if desired. 
                For now, keeping it clean as Lobby has its own title. 
            */}

            <div className="container mx-auto" style={{ height: '100%' }}>
                {!roomId ? (
                    <BattleLobby onJoin={handleJoin} />
                ) : (
                    <BattleRoom
                        roomId={roomId}
                        playerId={playerId}
                        playerName={playerName}
                        onLeave={handleLeave}
                    />
                )}
            </div>
        </div>
    );
}
