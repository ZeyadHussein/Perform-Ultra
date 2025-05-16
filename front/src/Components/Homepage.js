import React from "react";
import Sidebar from "./Sidebar";
import "../Styles/Homepage.css";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faGooglePlus,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bgImage from "../images/bg.jpg";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="sidebar">
        <Sidebar />
      </div>

      <main>
        <section
          className="hero"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1>Manage Your Remote Workforce Efficiently</h1>
          <p className="special-text">
            Track productivity, optimize workflows, and streamline communication with PerformUltra.
          </p>
          <Link to="/signup" className="cta-button">Get Started</Link><br /><br />
          <Link to="/login" className="cta-button">Login</Link>
        </section>

        <section className="features">
          <h2>Key Features</h2>
          <div className="feature-list">
            <div className="feature-item">
              Time Tracking
              <span className="feature-desc">
                Allows employees to log work hours, ensuring accurate timekeeping and productivity insights.
              </span>
            </div>
            <div className="feature-item">
              Task & Project Management
              <span className="feature-desc">
                Enables managers to assign, track, and prioritize tasks for efficient workflow management.
              </span>
            </div>
            <div className="feature-item">
              Performance Analytics
              <span className="feature-desc">
                Provides data-driven insights into employee productivity, helping managers evaluate performance.
              </span>
            </div>
            <div className="feature-item">
              Attendance Monitoring
              <span className="feature-desc">
                Automates attendance recording, monitoring employee presence, absences, and work shifts.
              </span>
            </div>
          </div>
        </section>

        <section className="features2">
          <div className="feature-list">
            <div className="feature-item">
              Team Collaboration
              <span className="feature-desc">
                Facilitates communication and coordination among team members through messaging and shared workspaces.
              </span>
            </div>
            <div className="feature-item">
              Role-Based Access
              <span className="feature-desc">
                Ensures data security by granting different levels of access based on user roles within the organization.
              </span>
            </div>
            <div className="feature-item">
              Integrations
              <span className="feature-desc">
                Seamlessly connects with third-party tools like payroll, project management, and communication platforms.
              </span>
            </div>
          </div>
        </section>

        <section className="how">
          <h2>How It Works</h2>
        </section>

        <section className="steps">
          {[...Array(3)].map((_, colIndex) => (
            <div className="column" key={colIndex}>
              <div className="flex flex-col gap-8">
                {[...Array(2)].map((_, rowIndex) => {
                  const i = rowIndex * 3 + colIndex;
                  return (
                    <div className="first" key={i}>
                      <div className="card">
                        <div className="align"></div>
                        <h1>STEP<br />{i + 1}</h1>
                        <p>
                          <b><i>{[
                            "Sign Up",
                            "Workspace",
                            "Tasks",
                            "Tracking",
                            "Collaborating",
                            "Reports"
                          ][i]}</i></b><br />
                          {[
                            "Get started by creating your account and logging in. Invite your team and assign roles to ensure everyone has the right access.",
                            "Organize your teams, define roles, and configure permissions. This step ensures a smooth workflow for your remote workforce.",
                            "Easily create tasks, set deadlines, and assign them to team members. Track progress in real time to keep projects on schedule.",
                            "Monitor productivity with real-time insights. Keep an eye on completed tasks, time spent, and overall team efficiency.",
                            "Stay connected with built-in messaging and notifications. Share files, provide feedback, and streamline teamwork effortlessly.",
                            "Get detailed reports on task completion, attendance, and productivity. Use data-driven insights to improve the performance."
                          ][i]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <br />

        <footer>
          <div className="footerContainer">
            <br></br>
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
          </div>
          <div className="footerBottom">
            <p>&copy;2025 PerformUltra. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomePage;
