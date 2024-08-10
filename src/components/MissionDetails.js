import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MissionDetails.css';

const MissionDetails = () => {
  const { id } = useParams();
  const [mission, setMission] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/missions/${id}/`)
      .then(response => setMission(response.data.mission))
      .catch(error => console.error(error));
  }, [id]);

  if (!mission) return <div>Loading...</div>;

  return (
    <div className="mission-details-container">
      <h1>{mission.name}</h1>
      <p>{mission.description}</p>
      <h2>Robot Details</h2>
      <div className="robot-details">
        <p><strong>Name:</strong> {mission.robot.name}</p>
        <p><strong>Model:</strong> {mission.robot.model_name}</p>
        <p><strong>Pose X:</strong> {mission.robot.pose_x}</p>
        <p><strong>Pose Y:</strong> {mission.robot.pose_y}</p>
      </div>
    </div>
  );

};
export default MissionDetails;