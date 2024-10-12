import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import './Footer.css'; // Custom CSS for additional styles

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-4">
      <div className="container">
        <p className="mb-0">© {new Date().getFullYear()} Arbaz's Website. All rights reserved.</p>
        <ul className="list-inline mt-2">
          <li className="list-inline-item">
            <NavLink to="/privacy" className="text-white" activeClassName="active">
              Privacy Policy
            </NavLink>
          </li>
          <li className="list-inline-item">
            <NavLink to="/terms" className="text-white" activeClassName="active">
              Terms of Service
            </NavLink>
          </li>
          <li className="list-inline-item">
            <NavLink to="/contact" className="text-white" activeClassName="active">
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
