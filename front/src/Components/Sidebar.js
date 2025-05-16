import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCalendar,
  faUsers,
  faList,
  faComments,
  faThumbtack,
  faBars,
  faGauge,
  faCog,
  faUser,
  faBuilding,
  faUsersGear,
  faBars as faMenu, // Hamburger icon
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext
import "../Styles/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useContext(ThemeContext); // Get darkMode from context

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Small Screens */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faMenu} />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""} ${darkMode ? "dark" : ""}`}>
        {/* Logo with Link to Homepage */}
        <div className="logo">
          <Link to="/HomePage" onClick={toggleSidebar}>
            <img src="/Logooo-removebg-preview.png" alt="Logo" />
          </Link>
        </div>

        <br />
        <h2>Menu</h2>
        <ul className="navbar-links">
          <li>
            <Link to="/dashboard" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/calendar/:userId" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faCalendar} /> Calendar
            </Link>
          </li>
          <li>
            <Link to="/TeamPage" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUsers} /> Teams
            </Link>
          </li>
          <li>
            <Link to="/attendance" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faList} /> Attendance
            </Link>
          </li>
          <li>
            <Link to="/chat" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faComments} /> Chat
            </Link>
          </li>
          <li>
            <Link to="/employee" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUsers} /> Employee List
            </Link> 
          </li>
          <li>
            <Link to="/manager" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUsersGear} /> Manager List
            </Link>
          </li>

        </ul>
        <h2>Utilities</h2>
        <ul className="navbar-links">
        <li>
            <Link to="/AddFeedback" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faThumbtack} /> Voice Your Feedback
            </Link>
          </li>
          <li>
            <Link to="/AssignTask" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faThumbtack} /> Task Management
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} /> Projects
            </Link>
          </li>
          <li>
            <Link to="/employee-performance" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faGauge} /> Performance
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faCog} /> Settings
            </Link>
          </li>
          <li>
            <Link to="/profile-settings" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUser} /> Profile Settings
            </Link>
          </li>
          <li>
            <Link to="/departments" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBuilding} /> Departments
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
