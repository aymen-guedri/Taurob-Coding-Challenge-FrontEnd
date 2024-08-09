import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RobotTeleoperation.css';

const RobotTeleoperation = () => {
  const [robots, setRobots] = useState([]);
  const [selectedRobotId, setSelectedRobotId] = useState('');
  const [robot, setRobot] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/robots/`)
      .then(response => setRobots(response.data.robots))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedRobotId) {
      axios.get(`${process.env.REACT_APP_API_URL}/robots/${selectedRobotId}/`)
        .then(response => setRobot(response.data.robot))
        .catch(error => console.error(error));
    }
  }, [selectedRobotId]);

  const moveRobot = (direction) => {
    if (robot) {
      const moveAmount = 20;
      const updatedPose = { ...robot };
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (direction === 'up' && updatedPose.pose_y - moveAmount >= 0) updatedPose.pose_y -= moveAmount;
      if (direction === 'down' && updatedPose.pose_y + moveAmount <= windowHeight - 80) updatedPose.pose_y += moveAmount;
      if (direction === 'left' && updatedPose.pose_x - moveAmount >= 0) updatedPose.pose_x -= moveAmount;
      if (direction === 'right' && updatedPose.pose_x + moveAmount <= windowWidth - 80) updatedPose.pose_x += moveAmount;

      axios.put(`${process.env.REACT_APP_API_URL}/robots/${robot.id}/`, updatedPose)
        .then(response => setRobot(response.data.robot))
        .catch(error => console.error(error));
    }
  };

  const startMoving = (direction) => {
    moveRobot(direction);
    const id = setInterval(() => moveRobot(direction), 250);
    setIntervalId(id);
  };

  const stopMoving = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  if (!robots.length) return <div>Loading...</div>;

  return (
    <div>
      <div className="teleoperation-container">
        <h1>Robot Teleoperation</h1>
        <select className="robot-select" onChange={(e) => setSelectedRobotId(e.target.value)} value={selectedRobotId}>
          <option value="">Select a Robot</option>
          {robots.map(robot => (
            <option key={robot.id} value={robot.id}>{robot.name}</option>
          ))}
        </select>
        {robot && (
          <>
            <img src="/img/robot.png" alt="Robot" className="robot-image" style={{ top: `${robot.pose_y}px`, left: `${robot.pose_x}px` }} />
            <div className="controls">
              <button className="control-button" onMouseDown={() => startMoving('up')} onMouseUp={stopMoving} onMouseLeave={stopMoving}>Up</button>
              <div className="middle-buttons">
                <button className="control-button" onMouseDown={() => startMoving('left')} onMouseUp={stopMoving} onMouseLeave={stopMoving}>Left</button>
                <button className="control-button" onMouseDown={() => startMoving('right')} onMouseUp={stopMoving} onMouseLeave={stopMoving}>Right</button>
              </div>
              <button className="control-button" onMouseDown={() => startMoving('down')} onMouseUp={stopMoving} onMouseLeave={stopMoving}>Down</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RobotTeleoperation;