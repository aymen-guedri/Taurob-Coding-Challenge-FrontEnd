import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MissionForm.css';

const MissionForm = ({ onSubmit }) => {
  const [missions, setMissions] = useState([]);
  const [selectedMissionId, setSelectedMissionId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [robotId, setRobotId] = useState('');
  const [robots, setRobots] = useState([]);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/missions/?all=true`)
      .then(response => setMissions(response.data.missions))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/robots/`)
      .then(response => setRobots(response.data.robots))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedMissionId) {
      const mission = missions.find(m => m.id === selectedMissionId);
      if (mission) {
        setName(mission.name);
        setDescription(mission.description);
        setRobotId(mission.robot.id);
      }
    } else {
      setName('');
      setDescription('');
      setRobotId('');
    }
  }, [selectedMissionId, missions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const missionData = { name, description, robot: robotId };
  
    const request = selectedMissionId
      ? axios.put(`${process.env.REACT_APP_API_URL}/missions/${selectedMissionId}/`, missionData)
      : axios.post(`${process.env.REACT_APP_API_URL}/missions/`, missionData);
  
    request
      .then(response => {
        onSubmit(response.data.mission);
        setMessage(selectedMissionId ? 'Mission updated successfully!' : 'Mission created successfully!');
        setMessageColor('green');
        setTimeout(() => setMessage(''), 5000);
        setName('');
        setDescription('');
        setRobotId('');
        setSelectedMissionId('');
      })
      .catch(error => {
        if (error.response) {
          console.error('Error response:', error.response);
          if (error.response.data) {
            console.error('Error details:', error.response.data);
          }
        } else {
          console.error('Error message:', error.message);
        }
        setMessage('Failed to submit the mission; please verify the robot selection.');
        setMessageColor('red');
        setTimeout(() => setMessage(''), 5000);
      });
  };

  return (
    <div className="mission-form-container">
      <h2>Update or create a Mission</h2>
      <p style={{color:"blue"}}>{selectedMissionId ? 'Update existing mission' : 'Create new mission'}</p>
      <div className="mission-select-container">
        <label htmlFor="mission-select"></label>
        <select id="mission-select" onChange={(e) => setSelectedMissionId(e.target.value)} value={selectedMissionId}>
          <option value="">Create new Mission</option>
          {missions.map(mission => (
            <option key={mission.id} value={mission.id}>{mission.name}</option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit} className="mission-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required={!selectedMissionId}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required={!selectedMissionId}
        />
        <select value={robotId} onChange={(e) => setRobotId(e.target.value)} required={!selectedMissionId}>
          <option value="">Select Robot</option>
          {robots.map(robot => (
            <option key={robot.id} value={robot.id}>{robot.name}</option>
          ))}
        </select>
        <button type="submit">{selectedMissionId ? 'Update Mission' : 'Create Mission'}</button>
      </form>
      {message && <p style={{ color: messageColor }}>{message}</p>}
    </div>
  );
};

export default MissionForm;