import React, { useEffect, useState, useContext } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFacebook, 
  faInstagram, 
  faTwitter, 
  faGooglePlus, 
  faYoutube 
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "../Styles/Feedback.css";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUserFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/userfeedback", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchUserFeedback();
  }, [token]);

  return (
    <div className={`feedback-page ${darkMode ? "dark-mode" : ""}`}>
      {/* Theme Toggle Button */}
      <button 
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="content-container">
        <div className="feedback-content-wrapper">
          <div className="feedback-section">
            <h1 className="feedback-title">User Feedback</h1>
            
            <div className="feedback-container">
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback, index) => (
                  <div key={feedback.feedback_ID || index} className="feedback-card">
                    <div className="feedback-header">
                      <span className="feedback-role">USER</span>
                    </div>
                    <p className="feedback-text">{feedback.feedback_text}</p>
                    {index !== feedbacks.length - 1 && <hr className="feedback-divider" />}
                  </div>
                ))
              ) : (
                <p className="no-feedback">No feedback submitted yet.</p>
              )}
            </div>
          </div>
          <br />
          <br />
          {/* Footer with Social Icons */}
          <footer className="page-footer">
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
                  <li><Link to="/Homepage">Home</Link></li>
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
    </div>
  );
};

export default Feedback;