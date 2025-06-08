import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { teamsApi, playersApi } from '../services/api';
import PlayerCard from '../components/PlayerCard';

const TeamDetail = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamData();
  }, [id]);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      const [teamResponse, playersResponse] = await Promise.all([
        teamsApi.getById(id),
        playersApi.getByTeam(id)
      ]);
      
      setTeam(teamResponse.data);
      setPlayers(playersResponse.data.results || playersResponse.data);
    } catch (err) {
      setError('Failed to fetch team data');
      console.error('Error fetching team data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading team details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!team) return <div className="error">Team not found</div>;

  return (
    <div>
      <div className="mb-4">
        <Link to="/teams" className="btn btn-secondary">← Back to Teams</Link>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <div>
            <span className="seed-badge" style={{ fontSize: '24px', padding: '10px 15px' }}>
              {team.seed}
            </span>
          </div>
          <div>
            <h1 style={{ margin: '0' }}>{team.name}</h1>
            <h3 style={{ margin: '5px 0', color: '#666' }}>{team.school}</h3>
            <span className="region-badge" style={{ fontSize: '14px', padding: '5px 12px' }}>
              {team.region} Region
            </span>
          </div>
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
          <div className="stat">
            <div className="stat-value">{team.record}</div>
            <div className="stat-label">Record</div>
          </div>
          <div className="stat">
            <div className="stat-value">{team.conference || 'N/A'}</div>
            <div className="stat-label">Conference</div>
          </div>
        </div>

        {team.eliminated && (
          <div style={{ 
            color: '#dc3545', 
            fontWeight: 'bold', 
            fontSize: '18px', 
            textAlign: 'center',
            marginTop: '20px',
            padding: '10px',
            border: '2px solid #dc3545',
            borderRadius: '8px'
          }}>
            ELIMINATED FROM TOURNAMENT
          </div>
        )}
      </div>

      <div className="card">
        <h2>Team Roster ({players.length} players)</h2>
        {players.length > 0 ? (
          <div className="grid grid-2">
            {players.map(player => (
              <PlayerCard 
                key={player.id} 
                player={player}
                showWatchlistButton={true}
              />
            ))}
          </div>
        ) : (
          <p>No players found for this team.</p>
        )}
      </div>
    </div>
  );
};

export default TeamDetail;
