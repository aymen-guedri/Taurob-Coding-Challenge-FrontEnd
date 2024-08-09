import React, { useState } from 'react';
import axios from 'axios';
import './RobotForm.css';

const RobotForm = ({ robot = {}, onSubmit }) => {
  const [name, setName] = useState(robot.name || '');
  const [modelName, setModelName] = useState(robot.model_name || '');
  const [poseX, setPoseX] = useState(robot.pose_x || '');
  const [poseY, setPoseY] = useState(robot.pose_y || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const robotData = { name, model_name: modelName, pose_x: poseX, pose_y: poseY };

    if (robot.id) {
      axios.put(`http://localhost:8000/api/robots/${robot.id}/`, robotData)
        .then(response => onSubmit(response.data.robot))
        .catch(error => console.error(error));
    } else {
      axios.post(`http://localhost:8000/api/robots/`, robotData)
        .then(response => onSubmit(response.data.robot))
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="robot-form-container">
      <h1>Robot Form</h1>
      <form onSubmit={handleSubmit} className="robot-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          placeholder="Model Name"
          required
        />
        <input
          type="number"
          value={poseX}
          onChange={(e) => setPoseX(e.target.value)}
          placeholder="Pose X"
          required
        />
        <input
          type="number"
          value={poseY}
          onChange={(e) => setPoseY(e.target.value)}
          placeholder="Pose Y"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RobotForm;