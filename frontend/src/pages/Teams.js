import React, { useState, useEffect } from 'react';
import { teamsApi } from '../services/api';
import TeamCard from '../components/TeamCard';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('ALL');

  const regions = ['ALL', 'EAST', 'WEST', 'SOUTH', 'MIDWEST'];

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await teamsApi.getAll();
      setTeams(response.data.results || response.data);
    } catch (err) {
      setError('Failed to fetch teams');
      console.error('Error fetching teams:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeams = selectedRegion === 'ALL' 
    ? teams 
    : teams.filter(team => team.region === selectedRegion);

  if (loading) return <div className="loading">Loading teams...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>Tournament Teams</h1>
      
      <div className="region-filter">
        {regions.map(region => (
          <button
            key={region}
            className={`filter-button ${selectedRegion === region ? 'active' : ''}`}
            onClick={() => setSelectedRegion(region)}
          >
            {region === 'ALL' ? 'All Regions' : region}
          </button>
        ))}
      </div>

      <div className="team-grid">
        {filteredTeams.map(team => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center">
          <p>No teams found for the selected region.</p>
        </div>
      )}
    </div>
  );
};

export default Teams;
