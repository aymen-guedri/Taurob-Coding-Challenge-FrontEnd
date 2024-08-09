import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import useWebSocket from 'react-use-websocket';

const Navbar = () => {
  const [socketUrl] = useState('ws://localhost:8000/ws/robots/');
  const { readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    0: 'Connecting',
    1: 'Connected',
    2: 'Closing',
    3: 'Closed',
  }[readyState];

  const statusColor = {
    'Connecting': 'yellow',
    'Connected': 'green',
    'Closing': 'yellow',
    'Closed': 'red',
  }[connectionStatus];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Taurob - Coding Challenge
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/teleoperation">Teleoperation</Link>
        <Link to="/create-robot">Robot Form</Link>
      </div>
      <div className="navbar-status">
        <span className={`status-circle ${statusColor}`}></span>
        <span>{connectionStatus}</span>
      </div>
    </nav>
  );
};

export default Navbar;