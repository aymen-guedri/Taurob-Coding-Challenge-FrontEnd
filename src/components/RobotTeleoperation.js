import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './RobotTeleoperation.css';

const RobotTeleoperation = () => {
  const [robot, setRobot] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/robots/1/')
      .then(response => setRobot(response.data.robot))
      .catch(error => console.error(error));
  }, []);

  const moveRobot = (direction) => {
    if (robot) {
      const moveAmount = 20;
      const updatedPose = { ...robot };
      if (direction === 'up') updatedPose.pose_y -= moveAmount;
      if (direction === 'down') updatedPose.pose_y += moveAmount;
      if (direction === 'left') updatedPose.pose_x -= moveAmount;
      if (direction === 'right') updatedPose.pose_x += moveAmount;

      axios.put(`http://localhost:8000/api/robots/${robot.id}/`, updatedPose)
        .then(response => setRobot(response.data.robot))
        .catch(error => console.error(error));
    }
  };

  if (!robot) return <div>Loading...</div>;

  return (
    <div>
      <div className="teleoperation-container">
        <h1>Robot Teleoperation</h1>
        <img src="/img/robot.png" alt="Robot" style={{ position: 'absolute', top: robot.pose_y, left: robot.pose_x, width:'80px' }} />
        <div className="controls">
          <button onClick={() => moveRobot('up')}>Up</button>
          <button onClick={() => moveRobot('down')}>Down</button>
          <button onClick={() => moveRobot('left')}>Left</button>
          <button onClick={() => moveRobot('right')}>Right</button>
        </div>
      </div>
    </div>
  );
};

export default RobotTeleoperation;