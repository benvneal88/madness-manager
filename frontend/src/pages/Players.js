import React, { useState, useEffect } from 'react';
import { playersApi } from '../services/api';
import PlayerCard from '../components/PlayerCard';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('points_per_game');

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await playersApi.getAll();
      setPlayers(response.data.results || response.data);
    } catch (err) {
      setError('Failed to fetch players');
      console.error('Error fetching players:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedPlayers = players
    .filter(player => {
      const matchesFilter = filter === 'ALL' || 
        (filter === 'AVAILABLE' && !player.is_drafted) ||
        (filter === 'DRAFTED' && player.is_drafted);
      
      const matchesSearch = search === '' ||
        player.name.toLowerCase().includes(search.toLowerCase()) ||
        player.team_name.toLowerCase().includes(search.toLowerCase());
      
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'points_per_game':
          return b.points_per_game - a.points_per_game;
        case 'tournament_points':
          return b.tournament_points - a.tournament_points;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'team_seed':
          return a.team_seed - b.team_seed;
        default:
          return 0;
      }
    });

  if (loading) return <div className="loading">Loading players...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>Tournament Players</h1>
      
      <div className="card">
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <label>Filter: </label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              style={{ marginLeft: '5px', padding: '5px' }}
            >
              <option value="ALL">All Players</option>
              <option value="AVAILABLE">Available</option>
              <option value="DRAFTED">Drafted</option>
            </select>
          </div>
          
          <div>
            <label>Sort by: </label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ marginLeft: '5px', padding: '5px' }}
            >
              <option value="points_per_game">Points Per Game</option>
              <option value="tournament_points">Tournament Points</option>
              <option value="name">Name</option>
              <option value="team_seed">Team Seed</option>
            </select>
          </div>
          
          <div style={{ flex: 1, minWidth: '200px' }}>
            <input
              type="text"
              placeholder="Search players or teams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ddd', 
                borderRadius: '4px' 
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-3">
        {filteredAndSortedPlayers.map(player => (
          <PlayerCard 
            key={player.id} 
            player={player}
            showWatchlistButton={!player.is_drafted}
          />
        ))}
      </div>

      {filteredAndSortedPlayers.length === 0 && (
        <div className="text-center">
          <p>No players found matching your criteria.</p>
        </div>
      )}
      
      <div className="card mt-4">
        <h3>Player Statistics Legend</h3>
        <div className="grid grid-4">
          <div>
            <strong>PPG:</strong> Points Per Game (season average)
          </div>
          <div>
            <strong>RPG:</strong> Rebounds Per Game (season average)
          </div>
          <div>
            <strong>APG:</strong> Assists Per Game (season average)
          </div>
          <div>
            <strong>Tournament Points:</strong> Total points scored in tournament games
          </div>
        </div>
      </div>
    </div>
  );
};

export default Players;
