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

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, deptRes] = await Promise.all([
          axios.get('http://localhost:5000/api/employees-with-users'),
          axios.get('http://localhost:5000/api/departments')
        ]);
        setEmployees(empRes.data);
        setDepartments(deptRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load employee data. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const groupEmployeesByDepartment = () => {
    const grouped = {};
    
    departments.forEach(dept => {
      grouped[dept.Department_name] = [];
    });
    
    grouped['Unassigned'] = [];
    
    employees.forEach(emp => {
      const dept = emp.Department_name || 'Unassigned';
      if (!grouped[dept]) {
        grouped[dept] = [];
      }
      grouped[dept].push(emp);
    });
    
    return grouped;
  };

  if (loading) {
    return (
      <div className="page-container">
        <Sidebar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading employee data...</p>
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

  const employeesByDepartment = groupEmployeesByDepartment();

  return (
    <div className="page-container">
      <Sidebar />
      
      <div className="content-wrapper">
        <div className="employee-list-container">
          <h1>Employees</h1>
          
          {Object.entries(employeesByDepartment).map(([department, emps]) => (
            emps.length > 0 && (
              <div key={department} className="department-section">
                <h3>{department}</h3>
                <ul className="employee-items">
                  {emps.map(emp => (
                    <li key={emp.Employee_ID}>
                      <div className="employee-info">
                        <span className="employee-name">{emp.Name}</span>
                        <span className="employee-details">
                          ${emp.hourly_rate}/hr | {emp.Email}
                        </span>
                        {emp.Role && (
                          <span className="employee-role">{emp.Role}</span>
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

export default EmployeeList;