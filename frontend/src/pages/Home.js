import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="text-center mb-4">
        <h1>Welcome to Madness Manager</h1>
        <p className="lead">Your NCAA March Madness Fantasy Basketball Manager</p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3>🏀 Tournament Overview</h3>
          <p>
            Draft your fantasy team from all NCAA tournament players and compete with friends. 
            Points are scored based on actual player performance during March Madness games.
          </p>
          <Link to="/teams" className="btn btn-primary">
            View Teams
          </Link>
        </div>

        <div className="card">
          <h3>👥 Draft Your Team</h3>
          <p>
            Build your ultimate fantasy team by drafting players from the tournament. 
            Watch games and see your players rack up points in real-time.
          </p>
          <Link to="/draft" className="btn btn-primary">
            Enter Draft Room
          </Link>
        </div>

        <div className="card">
          <h3>📊 Player Stats</h3>
          <p>
            Browse detailed player statistics, season averages, and tournament performance 
            to make informed draft decisions.
          </p>
          <Link to="/players" className="btn btn-primary">
            View Players
          </Link>
        </div>

        <div className="card">
          <h3>🏆 Leaderboard</h3>
          <p>
            Check the current standings and see how your fantasy team stacks up against 
            the competition. Track your progress throughout the tournament.
          </p>
          <Link to="/leaderboard" className="btn btn-primary">
            View Leaderboard
          </Link>
        </div>
      </div>

      <div className="card mt-4">
        <h3>How It Works</h3>
        <div className="grid grid-3">
          <div className="text-center">
            <h4>1. Draft Players</h4>
            <p>Select players from tournament teams to build your fantasy roster.</p>
          </div>
          <div className="text-center">
            <h4>2. Watch Games</h4>
            <p>Follow the tournament and watch your players compete in real games.</p>
          </div>
          <div className="text-center">
            <h4>3. Score Points</h4>
            <p>Earn fantasy points based on your players' actual game performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
