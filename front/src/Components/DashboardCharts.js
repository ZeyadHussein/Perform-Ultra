import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import {
  PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer
} from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faFacebook, faInstagram, faTwitter, faGooglePlus, faYoutube } from '@fortawesome/free-brands-svg-icons'; // Import icons
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../Styles/Dashboard.css';  // Importing the existing CSS file

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#D65DB1'];

const DashboardCharts = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/employees-with-users')
      .then(res => res.json())
      .then(setEmployees)
      .catch(console.error);
  }, []);

  const departmentCounts = employees.reduce((acc, emp) => {
    const dept = emp.Department_name || 'Unknown';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});
  const departmentPieData = Object.entries(departmentCounts).map(([name, value]) => ({ name, value }));

  const deptHourly = {};
  employees.forEach(emp => {
    const dept = emp.Department_name || 'Unknown';
    if (!deptHourly[dept]) deptHourly[dept] = { total: 0, count: 0 };
    deptHourly[dept].total += emp.hourly_rate;
    deptHourly[dept].count += 1;
  });
  const avgHourlyData = Object.entries(deptHourly).map(([name, stats]) => ({
    name,
    avgRate: parseFloat((stats.total / stats.count).toFixed(2)),
  }));

  const roleCounts = employees.reduce((acc, emp) => {
    acc[emp.Role] = (acc[emp.Role] || 0) + 1;
    return acc;
  }, {});
  const rolePieData = Object.entries(roleCounts).map(([name, value]) => ({ name, value }));

  const topEmployees = employees
    .sort((a, b) => b.performance_score - a.performance_score)
    .slice(0, 4)
    .map(emp => ({
      name: `${emp.first_name} ${emp.last_name}`,
      role: emp.Role,
      tasks: emp.task_count || 194,
      points: emp.performance_score || 1000,
    }));

  return (
    <div className="page-container">
      <Sidebar />
      <div className="content-wrapper">
        <div className="dashboard-header">
          <h1>Employee Dashboard</h1>
        </div>

        <div className="dashboard-cards">
          <div className="card">
            <h4>Total Employees</h4>
            <p>{employees.length}</p>
            <span className="stat">+35% This Month</span>
          </div>
          <div className="card">
            <h4>Total Tasks</h4>
            <p>2301</p>
            <span className="stat">+35% This Month</span>
          </div>
          <div className="card">
            <h4>Completed Tasks</h4>
            <p>1920</p>
            <span className="stat">+35% This Month</span>
          </div>
          <div className="card">
            <h4>Incompleted Tasks</h4>
            <p>381</p>
            <span className="stat">+35% This Month</span>
          </div>
        </div>

        <div className="dashboard-visuals">
          <div className="chart-box">
            <h3>Employees per Department</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={departmentPieData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {departmentPieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Average Hourly Rate by Department</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={avgHourlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgRate" fill="#845EC2" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Role Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={rolePieData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {rolePieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="top-employees-section">
          <h3>Top Employees</h3>
          <ul className="top-employee-list">
            {topEmployees.map((emp, i) => (
              <li key={i} className="employee-card">
                <div className="emp-name">{emp.name}</div>
                <div className="emp-role">{emp.role}</div>
                <div className="emp-tasks">{emp.tasks} Tasks</div>
                <div className="emp-points">{emp.points} pts</div>
              </li>
            ))}
          </ul>
        </div>

        <footer className="dashboard-footer">
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

export default DashboardCharts;
