import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);

      setUsername('User123'); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <div className="navbar-user-dropdown">
            <span>{username}</span>
            <div className="dropdown-content">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
