import React from 'react';
import { Link } from 'react-router-dom';

const TeamCard = ({ team }) => {
  return (
    <div className="team-card">
      <div style={{ marginBottom: '15px' }}>
        <span className="seed-badge">{team.seed}</span>
        <h3 style={{ margin: '10px 0 5px 0' }}>{team.name}</h3>
        <p style={{ margin: '0', color: '#666' }}>{team.school}</p>
        <span className="region-badge">{team.region}</span>
      </div>
      
      <div className="stats">
        <div className="stat">
          <div className="stat-value">{team.wins}</div>
          <div className="stat-label">Wins</div>
        </div>
        <div className="stat">
          <div className="stat-value">{team.losses}</div>
          <div className="stat-label">Losses</div>
        </div>
      </div>
      
      <p style={{ margin: '10px 0', fontSize: '14px' }}>
        Conference: {team.conference || 'N/A'}
      </p>
      
      {team.eliminated && (
        <div style={{ color: '#dc3545', fontWeight: 'bold', marginBottom: '10px' }}>
          ELIMINATED
        </div>
      )}
      
      <Link to={`/teams/${team.id}`} className="btn btn-primary">
        View Team
      </Link>
    </div>
  );
};

export default TeamCard;
