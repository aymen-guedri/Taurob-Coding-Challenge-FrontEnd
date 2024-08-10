import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MissionList from './components/MissionList';
import MissionDetails from './components/MissionDetails';
import RobotForm from './components/RobotForm';
import MissionForm from './components/MissionForm';
import RobotTeleoperation from './components/RobotTeleoperation';
import Navbar from './components/Navbar';

const App = () => {
  const handleMissionSubmit = (mission) => {
    console.log('Mission submitted:', mission);
  };

  const handleRobotSubmit = (robot) => {
    console.log('Robot submitted:', robot);
  };

  return (
    <Router>
      <div>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<MissionList />} />
          <Route path="/missions/:id" element={<MissionDetails />} />
          <Route path="/create-robot" element={<RobotForm onSubmit={handleRobotSubmit} />} />
          <Route path="/create-mission" element={<MissionForm onSubmit={handleMissionSubmit} />} />
          <Route path="/teleoperation" element={<RobotTeleoperation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;