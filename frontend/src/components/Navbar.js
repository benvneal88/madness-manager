import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-nav">
          <Link to="/" className="navbar-brand">
            🏀 Madness Manager
          </Link>
          <Link to="/" className={isActive('/')}>
            Home
          </Link>
          <Link to="/teams" className={isActive('/teams')}>
            Teams
          </Link>
          <Link to="/players" className={isActive('/players')}>
            Players
          </Link>
          <Link to="/draft" className={isActive('/draft')}>
            Draft Room
          </Link>
          <Link to="/leaderboard" className={isActive('/leaderboard')}>
            Leaderboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
