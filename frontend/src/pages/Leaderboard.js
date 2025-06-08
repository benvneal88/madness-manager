import React, { useState, useEffect } from 'react';
import { fantasyApi } from '../services/api';

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      // For demo purposes, create mock leaderboard data
      const mockTeams = [
        {
          id: 1,
          name: "March Madness Masters",
          owner: { username: "coach_k", first_name: "Mike", last_name: "K" },
          total_points: 285,
          player_count: 8,
          updated_at: "2024-03-20T10:30:00Z"
        },
        {
          id: 2,
          name: "Bracket Busters",
          owner: { username: "hoops_fan", first_name: "Sarah", last_name: "J" },
          total_points: 267,
          player_count: 7,
          updated_at: "2024-03-20T09:15:00Z"
        },
        {
          id: 3,
          name: "Cinderella Squad",
          owner: { username: "upset_alert", first_name: "Alex", last_name: "M" },
          total_points: 251,
          player_count: 9,
          updated_at: "2024-03-20T11:45:00Z"
        },
        {
          id: 4,
          name: "Final Four Fantasy",
          owner: { username: "champion", first_name: "Jordan", last_name: "S" },
          total_points: 243,
          player_count: 6,
          updated_at: "2024-03-20T08:20:00Z"
        },
        {
          id: 5,
          name: "Sweet Sixteen Selects",
          owner: { username: "basketball_pro", first_name: "Casey", last_name: "L" },
          total_points: 229,
          player_count: 8,
          updated_at: "2024-03-20T12:10:00Z"
        }
      ];
      setTeams(mockTeams);
    } catch (err) {
      setError('Failed to fetch leaderboard');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="loading">Loading leaderboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>Fantasy Team Leaderboard</h1>
      
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Current Standings</h3>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Last updated: {formatDate(new Date().toISOString())}
          </div>
        </div>

        {teams.length > 0 ? (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team Name</th>
                <th>Owner</th>
                <th>Players</th>
                <th>Total Points</th>
                <th>Avg Points/Player</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team.id}>
                  <td>
                    <span className="rank">#{index + 1}</span>
                  </td>
                  <td>
                    <strong>{team.name}</strong>
                  </td>
                  <td>
                    {team.owner.first_name} {team.owner.last_name}
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      @{team.owner.username}
                    </div>
                  </td>
                  <td>{team.player_count}</td>
                  <td>
                    <span className="points">{team.total_points}</span>
                  </td>
                  <td>
                    {team.player_count > 0 
                      ? Math.round(team.total_points / team.player_count * 10) / 10
                      : 0
                    }
                  </td>
                  <td style={{ fontSize: '12px', color: '#666' }}>
                    {formatDate(team.updated_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">
            <p>No fantasy teams found. Be the first to create one!</p>
          </div>
        )}
      </div>

      <div className="grid grid-3">
        <div className="card">
          <h4>🥇 Top Team</h4>
          {teams.length > 0 && (
            <div>
              <div className="stat">
                <div className="stat-value">{teams[0].name}</div>
                <div className="stat-label">Leading Team</div>
              </div>
              <div className="stat">
                <div className="stat-value">{teams[0].total_points}</div>
                <div className="stat-label">Points</div>
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <h4>📊 Tournament Stats</h4>
          <div className="stat">
            <div className="stat-value">{teams.length}</div>
            <div className="stat-label">Active Teams</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              {teams.reduce((sum, team) => sum + team.total_points, 0)}
            </div>
            <div className="stat-label">Total Points Scored</div>
          </div>
        </div>

        <div className="card">
          <h4>🏀 Average Performance</h4>
          <div className="stat">
            <div className="stat-value">
              {teams.length > 0 
                ? Math.round(teams.reduce((sum, team) => sum + team.total_points, 0) / teams.length)
                : 0
              }
            </div>
            <div className="stat-label">Avg Team Points</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              {teams.length > 0 
                ? Math.round(teams.reduce((sum, team) => sum + team.player_count, 0) / teams.length * 10) / 10
                : 0
              }
            </div>
            <div className="stat-label">Avg Players Drafted</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
