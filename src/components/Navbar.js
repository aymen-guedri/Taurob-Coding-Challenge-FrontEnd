import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import useWebSocket from 'react-use-websocket';

const Navbar = () => {
  const [socketUrl] = useState(process.env.REACT_APP_WS_URL);
  const { readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    0: 'Web socket Connecting',
    1: 'Web socket Connected',
    2: 'Web socket Closing',
    3: 'Web socket Closed',
  }[readyState];

  const statusColor = {
    0: 'yellow',
    1: 'green',
    2: 'yellow',
    3: 'red',
  }[readyState];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/"><img src="/img/logo.jpg" alt="Logo" />Taurob - Coding Challenge</Link>
      </div>
      <div className="navbar-links">
        <Link to="/teleoperation">Teleoperation</Link>
        <Link to="/create-robot">Robot Form</Link>
      </div>
      <div className="navbar-status">
        <span className={`status-circle ${statusColor}`}></span>
        <span style={{ color: 'white' }}>{connectionStatus}</span>
      </div>
    </nav>
  );
};

export default Navbar;