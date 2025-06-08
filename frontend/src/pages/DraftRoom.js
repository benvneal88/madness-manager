import React, { useState, useEffect } from 'react';
import { playersApi, fantasyApi, watchlistApi } from '../services/api';
import PlayerCard from '../components/PlayerCard';

const DraftRoom = () => {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [draftedPlayers, setDraftedPlayers] = useState([]);
  const [myTeam, setMyTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDraftData();
  }, []);

  const fetchDraftData = async () => {
    try {
      setLoading(true);
      const [availableResponse, watchlistResponse, draftedResponse] = await Promise.all([
        playersApi.getAvailable(),
        watchlistApi.getWatchlist().catch(() => ({ data: [] })), // Handle auth errors gracefully
        playersApi.getDrafted()
      ]);
      
      setAvailablePlayers(availableResponse.data.results || availableResponse.data);
      setWatchlist(watchlistResponse.data.results || watchlistResponse.data);
      setDraftedPlayers(draftedResponse.data.results || draftedResponse.data);
      
      // For demo purposes, we'll create a mock team
      // In real app, this would come from user's actual fantasy team
      setMyTeam({
        id: 1,
        name: "My Fantasy Team",
        total_points: 0,
        drafts: []
      });
      
    } catch (err) {
      setError('Failed to fetch draft data');
      console.error('Error fetching draft data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDraftPlayer = async (playerId) => {
    if (!myTeam) {
      alert('Please create a fantasy team first!');
      return;
    }

    try {
      // For demo purposes, we'll simulate drafting
      const player = availablePlayers.find(p => p.id === playerId);
      if (player) {
        // Move player from available to drafted
        setAvailablePlayers(prev => prev.filter(p => p.id !== playerId));
        setDraftedPlayers(prev => [...prev, { ...player, is_drafted: true }]);
        
        // Remove from watchlist if present
        setWatchlist(prev => prev.filter(w => w.player.id !== playerId));
        
        alert(`Successfully drafted ${player.name}!`);
      }
    } catch (err) {
      console.error('Error drafting player:', err);
      alert('Failed to draft player. Please try again.');
    }
  };

  const handleAddToWatchlist = async (playerId) => {
    try {
      const player = availablePlayers.find(p => p.id === playerId);
      if (player) {
        // For demo purposes, simulate adding to watchlist
        const isAlreadyWatched = watchlist.some(w => w.player.id === playerId);
        if (!isAlreadyWatched) {
          setWatchlist(prev => [...prev, { 
            id: Date.now(), 
            player: player, 
            added_at: new Date().toISOString() 
          }]);
          alert(`Added ${player.name} to watchlist!`);
        } else {
          alert('Player is already in your watchlist!');
        }
      }
    } catch (err) {
      console.error('Error adding to watchlist:', err);
      alert('Failed to add to watchlist. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading draft room...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>Draft Room</h1>
      
      <div className="card mb-4">
        <h3>🏀 {myTeam?.name || 'Create Your Fantasy Team'}</h3>
        <p>Draft players to build your ultimate March Madness fantasy team!</p>
        {myTeam && (
          <div className="stats">
            <div className="stat">
              <div className="stat-value">{myTeam.drafts?.length || 0}</div>
              <div className="stat-label">Players Drafted</div>
            </div>
            <div className="stat">
              <div className="stat-value">{myTeam.total_points}</div>
              <div className="stat-label">Total Points</div>
            </div>
          </div>
        )}
      </div>

      <div className="draft-interface">
        <div className="available-players">
          <h3>Available Players ({availablePlayers.length})</h3>
          <div className="player-list">
            {availablePlayers.slice(0, 20).map(player => (
              <PlayerCard 
                key={player.id} 
                player={player}
                onDraft={handleDraftPlayer}
                onAddToWatchlist={handleAddToWatchlist}
                showDraftButton={true}
                showWatchlistButton={true}
              />
            ))}
          </div>
          {availablePlayers.length > 20 && (
            <p className="text-center" style={{ marginTop: '10px' }}>
              Showing first 20 players. Use the Players page to see all available players.
            </p>
          )}
        </div>

        <div className="watchlist">
          <h3>My Watchlist ({watchlist.length})</h3>
          <div className="player-list">
            {watchlist.map(item => (
              <PlayerCard 
                key={item.id} 
                player={item.player}
                onDraft={handleDraftPlayer}
                showDraftButton={true}
              />
            ))}
          </div>
          {watchlist.length === 0 && (
            <p>No players in your watchlist yet. Add some players to keep track of them!</p>
          )}
        </div>

        <div className="drafted-players">
          <h3>Recently Drafted ({draftedPlayers.length})</h3>
          <div className="player-list">
            {draftedPlayers.slice(-15).reverse().map(player => (
              <PlayerCard 
                key={player.id} 
                player={player}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftRoom;
