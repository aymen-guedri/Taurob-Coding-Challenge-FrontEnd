import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RobotForm.css';

const RobotForm = ({ onSubmit }) => {
  const [selectedRobotId, setSelectedRobotId] = useState('');
  const [name, setName] = useState('');
  const [modelName, setModelName] = useState('');
  const [poseX, setPoseX] = useState('');
  const [poseY, setPoseY] = useState('');
  const [robots, setRobots] = useState([]);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/robots/`)
      .then(response => setRobots(response.data.robots))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedRobotId) {
      const robot = robots.find(r => r.id === selectedRobotId);
      if (robot) {
        setName(robot.name);
        setModelName(robot.model_name);
        setPoseX(robot.pose_x);
        setPoseY(robot.pose_y);
      }
    } else {
      setName('');
      setModelName('');
      setPoseX('');
      setPoseY('');
    }
  }, [selectedRobotId, robots]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const robotData = { name, model_name: modelName };
  
    if (poseX !== '') {
      robotData.pose_x = parseFloat(poseX);
    }
  
    if (poseY !== '') {
      robotData.pose_y = parseFloat(poseY);
    }
  
    const request = selectedRobotId
      ? axios.put(`${process.env.REACT_APP_API_URL}/robots/${selectedRobotId}/`, robotData)
      : axios.post(`${process.env.REACT_APP_API_URL}/robots/`, robotData);
  
    request
      .then(response => {
        onSubmit(response.data.robot);
        setMessage(selectedRobotId ? 'Robot updated successfully!' : 'Robot created successfully!');
        setMessageColor('green');
        setTimeout(() => setMessage(''), 5000);
        setName('');
        setModelName('');
        setPoseX('');
        setPoseY('');
        setSelectedRobotId('');
        setTimeout(() => window.location.reload(), 3000);
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
        setMessage('Failed to submit robot.');
        setMessageColor('red');
        setTimeout(() => setMessage(''), 5000);
      });
  };

  return (
    <div className="robot-form-container">
      <h2>Update or create a Robot</h2>
      <p style={{color:"blue"}}>{selectedRobotId ? 'Update existing robot' : 'Create new robot'}</p>
      <div className="robot-select-container">
        <label htmlFor="robot-select"></label>
        <select id="robot-select" onChange={(e) => setSelectedRobotId(e.target.value)} value={selectedRobotId}>
          <option value="">Create new Robot</option>
          {robots.map(robot => (
            <option key={robot.id} value={robot.id}>{robot.name}</option>
          ))}
        </select>
      </div>
      <form onSubmit={handleSubmit} className="robot-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required={!selectedRobotId}
        />
        <input
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          placeholder="Model Name"
          required={!selectedRobotId}
        />
        <input
          type="number"
          value={poseX}
          onChange={(e) => setPoseX(e.target.value)}
          placeholder="Pose X"
          required={!selectedRobotId}
        />
        <input
          type="number"
          value={poseY}
          onChange={(e) => setPoseY(e.target.value)}
          placeholder="Pose Y"
          required={!selectedRobotId}
        />
        <button type="submit">{selectedRobotId ? 'Update Robot' : 'Create Robot'}</button>
      </form>
      {message && <p style={{ color: messageColor }}>{message}</p>}
    </div>
  );
};

export default RobotForm;