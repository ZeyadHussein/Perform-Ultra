import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  FaBars,
  FaHome,
  FaGlobe,
  FaMoneyBill,
  FaMoon,
  FaSun,
  FaPhone,
  FaQrcode,
  FaComments,
  FaFileAlt,
  FaShieldAlt,
  FaRegCommentDots,
  FaInfoCircle,
} from "react-icons/fa";
import Sidebar from "./Sidebar";
import { ThemeContext } from "../context/ThemeContext";
import "../Styles/Settings.css";

const Settings = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className={`settings-container ${darkMode ? "dark" : ""}`}>
      {/* Sidebar Toggle Button */}
      <button
        className="menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <Sidebar active="Settings" setActive={() => {}} />
      </div>

      {/* Settings Content */}
      <div className="settings-content">
        <h2 className="settings-title">Settings</h2>

        {/* General Section */}
        <div className="settings-section">
          <h3 className="section-title">General</h3>
          <div className="space-y-2">
            <div
              className="settings-item"
              onClick={() => navigate("/HomePage")}
              style={{ cursor: "pointer" }}
            >
              <div className="flex items-center space-x-2">
                <FaHome /> <span>Home</span>
              </div>
              <span>Style 1</span>
            </div>
            <div className="settings-item">
              <div className="flex items-center space-x-2">
                <FaGlobe /> <span>Language</span>
              </div>
              <span>English</span>
            </div>
            <div className="settings-item">
              <div className="flex items-center space-x-2">
                <FaGlobe /> <span>Country & Regions</span>
              </div>
              <span>Egypt</span>
            </div>
            <div className="settings-item">
              <div className="flex items-center space-x-2">
                <FaMoneyBill /> <span>Currency</span>
              </div>
              <span>EGP</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="settings-section">
          <h3 className="section-title">Features</h3>
          <div className="space-y-2">
            <div className="settings-item">
              <div className="flex items-center space-x-2">
                <FaMoon /> <span>Dark Mode</span>
              </div>
              <div
                className="dark-toggle"
                role="switch"
                aria-checked={darkMode}
                onClick={() => setDarkMode(!darkMode)}
              >
                <div className={`toggle-button ${darkMode ? "active" : ""}`}>
                  <FaSun className="icon sun" />
                  <FaMoon className="icon moon" />
                </div>
              </div>
            </div>
            <div className="settings-item">
              <div className="flex items-center space-x-2">
                <FaQrcode /> <span>Scan QR Code</span>
              </div>
            </div>
            <div
              className="settings-item"
              onClick={() => navigate("/customer-support")}
              style={{ cursor: "pointer" }}
            >
              <div className="flex items-center space-x-2">
                <FaPhone /> <span>Customer Support</span>
              </div>
            </div>
            <div className="settings-item">
              <div className="flex items-center space-x-2">
                <FaFileAlt /> <span>Terms & Conditions</span>
              </div>
            </div>
            <div
              className="settings-item"
              onClick={() => navigate("/service-chat")}
              style={{ cursor: "pointer" }}
            >
              <div className="flex items-center space-x-2">
                <FaComments /> <span>Service chat</span>
              </div>
            </div>
            <div className="settings-item">
              <div className="flex items-center space-x-2">
                <FaShieldAlt /> <span>Email Us</span>
              </div>
            </div>
            <div
              className="settings-item"
              onClick={() => navigate("/feedback")}
              style={{ cursor: "pointer" }}
            >
              <div className="flex items-center space-x-2">
                <FaRegCommentDots /> <span>Feedback</span>
              </div>
            </div>
            <div className="settings-item">
              <div className="flex items-center space-x-2">
                <FaInfoCircle /> <span>Accessibility</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
