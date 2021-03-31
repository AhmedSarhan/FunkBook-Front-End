import React from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="border-top text-center small text-muted py-3">
      <p>
        <NavLink to="/" className="mx-1">
          Home
        </NavLink>{' '}
        |{' '}
        <NavLink className="mx-1" to="/about-us">
          About Us
        </NavLink>{' '}
        |{' '}
        <NavLink className="mx-1" to="/terms">
          Terms
        </NavLink>
      </p>
      <p className="m-0">
        Copyright &copy; 2020{' '}
        <NavLink to="/" className="text-muted">
          FunkBook
        </NavLink>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
