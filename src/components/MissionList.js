import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MissionList.css';

const MissionList = () => {
  const [missions, setMissions] = useState([]);
  const [pagination, setPagination] = useState({
    next: null,
    previous: null,
    first: `${process.env.REACT_APP_API_URL}/missions/?page=1`,
    last: null,
    current: `${process.env.REACT_APP_API_URL}/missions/`,
    numPages: 1,
    currentPage: 1
  });

  useEffect(() => {
    fetchMissions(pagination.current);
  }, []);

  const fetchMissions = (url) => {
    axios.get(url)
      .then(response => {
        const data = response.data;
        if (data && data.missions) {
          setMissions(data.missions);
          setPagination({
            next: data.next ? `${process.env.REACT_APP_API_URL}/missions/?page=${data.next}` : null,
            previous: data.previous ? `${process.env.REACT_APP_API_URL}/missions/?page=${data.previous}` : null,
            first: `${process.env.REACT_APP_API_URL}/missions/?page=1`,
            last: `${process.env.REACT_APP_API_URL}/missions/?page=${data.num_pages}`,
            current: url,
            numPages: data.num_pages,
            currentPage: data.current_page
          });
        } else {
          setMissions([]);
          setPagination({
            next: null,
            previous: null,
            first: `${process.env.REACT_APP_API_URL}/missions/?page=1`,
            last: null,
            current: url,
            numPages: 1,
            currentPage: 1
          });
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="mission-list-container">
      <h1>Mission List</h1>
      <ul className="mission-list">
        {missions.map(mission => (
          <li key={mission.id} className="mission-item">
            <Link to={`/missions/${mission.id}`}>{mission.name}</Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {pagination.first && <button onClick={() => fetchMissions(pagination.first)}>First</button>}
        {pagination.previous && <button onClick={() => fetchMissions(pagination.previous)}>Previous</button>}
        <span>Page {pagination.currentPage} of {pagination.numPages}</span>
        {pagination.next && <button onClick={() => fetchMissions(pagination.next)}>Next</button>}
        {pagination.last && <button onClick={() => fetchMissions(pagination.last)}>Last</button>}
      </div>
    </div>
  );
};

export default MissionList;