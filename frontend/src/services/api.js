import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Teams API
export const teamsApi = {
  getAll: () => api.get('/teams/'),
  getById: (id) => api.get(`/teams/${id}/`),
  getByRegion: (region) => api.get(`/teams/?region=${region}`),
};

// Players API
export const playersApi = {
  getAll: () => api.get('/players/'),
  getById: (id) => api.get(`/players/${id}/`),
  getAvailable: () => api.get('/players/available/'),
  getDrafted: () => api.get('/players/drafted/'),
  getByTeam: (teamId) => api.get(`/players/?team=${teamId}`),
};

// Fantasy Teams API
export const fantasyApi = {
  getTeams: () => api.get('/fantasy-teams/'),
  getTeamById: (id) => api.get(`/fantasy-teams/${id}/`),
  createTeam: (data) => api.post('/fantasy-teams/', data),
  draftPlayer: (teamId, playerId) => api.post(`/fantasy-teams/${teamId}/draft_player/`, { player_id: playerId }),
  getLeaderboard: () => api.get('/fantasy-teams/leaderboard/'),
};

// Watchlist API
export const watchlistApi = {
  getWatchlist: () => api.get('/watchlist/'),
  addToWatchlist: (playerId) => api.post('/watchlist/', { player_id: playerId }),
  removeFromWatchlist: (id) => api.delete(`/watchlist/${id}/`),
};

export default api;
