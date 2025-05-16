import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faGooglePlus,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import Sidebar from "./Sidebar";
import '../Styles/EmployeeList.css'; 

const ManagerList = () => {
  const [managers, setManagers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mgrRes, deptRes] = await Promise.all([
          axios.get('http://localhost:5000/api/managers-with-users'),
          axios.get('http://localhost:5000/api/departments')
        ]);
        setManagers(mgrRes.data);
        setDepartments(deptRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching manager data:', err);
        setError('Failed to load manager data. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const groupManagersByDepartment = () => {
    const grouped = {};
    
    departments.forEach(dept => {
      grouped[dept.Department_name] = [];
    });
    
    grouped['Unassigned'] = [];

    managers.forEach(manager => {
      const dept = manager.Department_name || 'Unassigned';
      if (!grouped[dept]) {
        grouped[dept] = [];
      }
      grouped[dept].push(manager);
    });

    return grouped;
  };

  if (loading) {
    return (
      <div className="page-container">
        <Sidebar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading manager data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Sidebar />
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const managersByDepartment = groupManagersByDepartment();

  return (
    <div className="page-container">
      <Sidebar />

      <div className="content-wrapper">
        <div className="employee-list-container">
          <h1>Managers</h1>

          {Object.entries(managersByDepartment).map(([department, mgrs]) => (
            mgrs.length > 0 && (
              <div key={department} className="department-section">
                <h3>{department}</h3>
                <ul className="employee-items">
                  {mgrs.map(manager => (
                    <li key={manager.Manager_ID}>
                      <div className="employee-info">
                        <span className="employee-name">{manager.Name || `${manager.first_name} ${manager.last_name}`}</span>
                        <span className="employee-details">
                          {manager.Email}
                        </span>
                        {manager.Role && (
                          <span className="employee-role">{manager.Role}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
        <footer className="employee-footer">
          <div className="footerContainer">
            <div className="socialIcons">
              <button onClick={() => console.log("Facebook")}>
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </button>
              <button onClick={() => console.log("Instagram")}>
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </button>
              <button onClick={() => console.log("Twitter")}>
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </button>
              <button onClick={() => console.log("Google Plus")}>
                <FontAwesomeIcon icon={faGooglePlus} size="2x" />
              </button>
              <button onClick={() => console.log("YouTube")}>
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </button>
            </div>
            <div className="footerNav">
              <ul>
                <li><Link to="/homepage">Home</Link></li>
                <li><Link to="/news">News</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="footerBottom">
              <p>&copy;2025 PerformUltra. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ManagerList;
