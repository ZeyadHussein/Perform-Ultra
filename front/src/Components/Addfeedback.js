import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../Styles/AssignTask.css";
import bgImage from "../images/bg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faGooglePlus,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const AddFeedback = () => {
  const [feedback, setFeedback] = useState({
    feedback_text: "",
    recipient: "",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch users for recipient dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        if (response.data.length > 0) {
          setFeedback((prevFeedback) => ({
            ...prevFeedback,
            recipient: response.data[0].User_ID, // Set the first user as default recipient
          }));
        }
      } catch (err) {
        console.error("❌ Failed to fetch users:", err);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      // Send feedback to the selected user
      await axios.post(
        "http://localhost:5000/api/addfeed",
        {
          feedback_text: feedback.feedback_text,
          recipient_id: feedback.recipient, // Use recipient from the selected dropdown
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("✅ Feedback submitted successfully!");
      setFeedback({
        feedback_text: "",
        recipient: users[0]?.User_ID || "",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFeedback({
      feedback_text: "",
      recipient: users[0]?.User_ID || "",
    });
    setError(null);
    setSuccess(null);
  };

  return (
    <div
      className="task-container"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <Sidebar />
      <br></br>
      <br></br>
      <main className="task-content">
        <div className="container">
          <h1>Submit Feedback</h1>

          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
              <button onClick={() => setError(null)} className="close-error">
                ×
              </button>
            </div>
          )}

          {success && (
            <div className="success-message">
              <strong>Success:</strong> {success}
              <button
                onClick={() => setSuccess(null)}
                className="close-success"
              >
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="feedback-text">Your Feedback:</label>
              <textarea
                id="feedback-text"
                name="feedback_text"
                value={feedback.feedback_text}
                onChange={handleChange}
                required
                minLength="10"
                placeholder="Please share your feedback here..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="recipient">Select Recipient:</label>
              {loading ? (
                <p>Loading users...</p>
              ) : (
                <select
                  id="recipient"
                  name="recipient"
                  value={feedback.recipient}
                  onChange={handleChange}
                  required
                >
                  {users.map((user) => (
                    <option key={user.User_ID} value={user.User_ID}>
                      {user.Name} ({user.Role})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={isSubmitting}
                className={isSubmitting ? "submitting" : ""}
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </button>
              <button type="button" onClick={resetForm}>
                Reset Form
              </button>
            </div>
          </form>
        </div>
        <br></br>
        <br></br>

        <footer>
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
                <li>
                  <Link to="/Homepage">Home</Link>
                </li>
                <li>
                  <Link to="/news">News</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
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

export default AddFeedback;
