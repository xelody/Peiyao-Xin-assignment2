import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/simulation">Simulation</Link></li>
        <li><Link to="/credits">Credits</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
