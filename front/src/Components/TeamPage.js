import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faGooglePlus,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Sidebar from "./Sidebar";
import "../Styles/AssignTask.css";
import bgImage from "../images/bg.jpg";

axios.defaults.baseURL = 'http://localhost:5000/api';

const TeamPage = () => {
  const [team, setTeam] = useState({
    team_name: "",
    department_id: "",
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptResponse = await axios.get("/departments");
        setDepartments(deptResponse.data);
        
        if (deptResponse.data.length > 0) {
          setTeam((prev) => ({
            ...prev,
            department_id: deptResponse.data[0].Department_ID,
          }));
        }
      } catch (err) {
        console.error("❌ Failed to fetch data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      await axios.post("/teams", {
        team_name: team.team_name,
        department_id: team.department_id,
      });

      setSuccess("✅ Team created successfully!");
      setTeam({
        team_name: "",
        department_id: departments[0]?.Department_ID || "",
      });
    } catch (error) {
      console.error("Error submitting team:", error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          setError(`Validation Error: ${data.message}`);
        } else if (status === 500) {
          setError(`Server Error: ${data.message || "Something went wrong."}`);
        }
      } else if (error.request) {
        setError("Network Error: No response from server.");
      } else {
        setError("Application Error: Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTeam({
      team_name: "",
      department_id: departments[0]?.Department_ID || "",
    });
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="team-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <Sidebar />
      <br></br>
      <br></br>
      <main className="team-content">
        <div className="container">
          <h1>Team Management</h1>

          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
              <button onClick={() => setError(null)} className="close-error">×</button>
            </div>
          )}

          {success && (
            <div className="success-message">
              <strong>Success:</strong> {success}
              <button onClick={() => setSuccess(null)} className="close-success">×</button>
            </div>
          )}

          <div className="create-team-form">
            <h2>Create New Team</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="team-name">Team Name:</label>
                <input
                  type="text"
                  id="team-name"
                  name="team_name"
                  value={team.team_name}
                  onChange={handleChange}
                  required
                  minLength="3"
                  maxLength="255"
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department:</label>
                {loading ? (
                  <p>Loading departments...</p>
                ) : (
                  <select
                    id="department"
                    name="department_id"
                    value={team.department_id}
                    onChange={handleChange}
                    required
                  >
                    {departments.map((dept) => (
                      <option key={dept.Department_ID} value={dept.Department_ID}>
                        {dept.Department_name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Team"}
                </button>
                <button type="button" onClick={resetForm}>Reset Form</button>
              </div>
            </form>
          </div>
        </div>
        <br></br>
        <br></br>
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
      </main>
    </div>
  );
};

export default TeamPage;
