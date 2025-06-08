import React from 'react';

const PlayerCard = ({ player, onDraft, onAddToWatchlist, showDraftButton = false, showWatchlistButton = false }) => {
  return (
    <div className="player-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ margin: '0 0 5px 0' }}>{player.name}</h4>
          <p style={{ margin: '0 0 5px 0', color: '#666' }}>
            <span className="seed-badge">{player.team_seed}</span>
            {player.team_name}
            <span className="region-badge">{player.team_region}</span>
          </p>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
            {player.position} • #{player.jersey_number || 'N/A'}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="stat">
            <div className="stat-value">{player.points_per_game}</div>
            <div className="stat-label">PPG</div>
          </div>
        </div>
      </div>
      
      <div className="stats">
        <div className="stat">
          <div className="stat-value">{player.rebounds_per_game}</div>
          <div className="stat-label">RPG</div>
        </div>
        <div className="stat">
          <div className="stat-value">{player.assists_per_game}</div>
          <div className="stat-label">APG</div>
        </div>
        <div className="stat">
          <div className="stat-value">{player.tournament_points}</div>
          <div className="stat-label">Tournament Points</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {showDraftButton && !player.is_drafted && (
          <button 
            className="draft-button"
            onClick={() => onDraft(player.id)}
          >
            Draft Player
          </button>
        )}
        
        {showWatchlistButton && !player.is_drafted && (
          <button 
            className="watchlist-button"
            onClick={() => onAddToWatchlist(player.id)}
          >
            Add to Watchlist
          </button>
        )}
        
        {player.is_drafted && (
          <span style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '12px' }}>
            DRAFTED
          </span>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
