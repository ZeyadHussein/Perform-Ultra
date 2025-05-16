import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./Sidebar";
import "../Styles/performance.css";

const EmployeePerformance = () => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/perfor');
        setPerformanceData(response.data);
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    fetchPerformanceData();
  }, []);

  return (
    <div className="performance-container">
      <Sidebar />
      <main className="performance-content">
        <div className="performance-section">
          <h3>Employee's Performance</h3>
          <div className="performance-cards">
            {performanceData.length > 0 ? (
              performanceData.map((item, index) => (
                <div className="performance-card" key={index}>
                  <h4>{item.Full_Name}'s Task</h4>
                  <p><strong>{item.Task_completed}%</strong> Task Completed</p>
                </div>
              ))
            ) : (
              <p>No performance data available.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeePerformance;
