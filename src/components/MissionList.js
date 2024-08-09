import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MissionList.css';

const MissionList = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/missions/')
      .then(response => setMissions(response.data.missions))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="mission-list-container">
      <h1>Missions</h1>
      <ul className="mission-list">
        {missions.map(mission => (
          <li key={mission.id} className="mission-item">
            <Link to={`/missions/${mission.id}`}>{mission.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissionList;