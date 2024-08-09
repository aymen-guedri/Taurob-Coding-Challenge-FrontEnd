import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MissionForm = ({ mission = {}, onSubmit }) => {
  const [name, setName] = useState(mission.name || '');
  const [description, setDescription] = useState(mission.description || '');
  const [robotId, setRobotId] = useState(mission.robot?.id || '');

  const [robots, setRobots] = useState([]);

  useEffect(() => {
    axios.get('/robots/')
      .then(response => setRobots(response.data.robots))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const missionData = { name, description, robot: robotId };

    if (mission.id) {
      axios.put(`/mission/${mission.id}/`, missionData)
        .then(response => onSubmit(response.data.mission))
        .catch(error => console.error(error));
    } else {
      axios.post('/mission/', missionData)
        .then(response => onSubmit(response.data.mission))
        .catch(error => console.error(error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <select value={robotId} onChange={(e) => setRobotId(e.target.value)} required>
        <option value="">Select Robot</option>
        {robots.map(robot => (
          <option key={robot.id} value={robot.id}>{robot.name}</option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MissionForm;
