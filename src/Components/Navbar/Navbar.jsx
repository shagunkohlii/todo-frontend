import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img
            src="https://img.icons8.com/?size=25&id=f9MbZqpEUKcQ&format=png&color=ffffff" alt=""
          />
          Todoist
        </Link>
      </div>
      <div className="navbar-links">
        {localStorage.getItem("token") ? (
          <button onClick={handleLogout} className="nav-btn">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="nav-btn">
              Login
            </Link>
            <Link to="/signup" className="nav-btn">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
