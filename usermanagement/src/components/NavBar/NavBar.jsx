import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure this import is included
import './NavBar.css';

function NavBar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    if (isNavbarOpen) {
      toggleNavbar();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <i className="fas fa-users" style={{ fontSize: '30px' }}></i> Users
        </NavLink>
        <button
          className={`navbar-toggler ${isNavbarOpen ? 'btn-close btn-close-white' : ''}`}
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isNavbarOpen}
          aria-label={isNavbarOpen ? "Close" : "Open"}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                to="/users"
                onClick={handleNavLinkClick}
              >
                <i className="fas fa-user-friends"></i> Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                to="/new-user"
                onClick={handleNavLinkClick}
              >
                <i className="fas fa-user-plus"></i> New User
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                to="/removed-user"
                onClick={handleNavLinkClick}
              >
                <i className="fas fa-user-slash"></i> Removed Users
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
