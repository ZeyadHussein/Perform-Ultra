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

const AssignTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    date: "",
    assignee: "",
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        if (response.data.length > 0) {
          setTask((prevTask) => ({
            ...prevTask,
            assignee: response.data[0].User_ID,
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
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const formattedDate = task.date
        ? new Date(task.date).toISOString().split("T")[0]
        : null;

      const taskResponse = await axios.post(
        "http://localhost:5000/api/add-task",
        {
          task_title: task.title,
          description: task.description,
          Due_date: formattedDate,
          priority: task.priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const taskId = taskResponse.data.taskId;

      setSuccess(`✅ Task created and assigned successfully! Task ID: ${taskId}`);
      setTask({
        title: "",
        description: "",
        priority: "Low",
        date: "",
        assignee: users[0]?.User_ID || "",
      });
    } catch (error) {
      console.error("Error submitting task:", error);
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
    setTask({
      title: "",
      description: "",
      priority: "Low",
      date: "",
      assignee: users[0]?.User_ID || "",
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
      <main className="task-content">
        <br></br>
        <div className="container">
          <h1>Create a New Task</h1>

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
              <label htmlFor="task-title">Task Title:</label>
              <input
                type="text"
                id="task-title"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
                minLength="3"
                maxLength="255"
              />
            </div>

            <div className="form-group">
              <label htmlFor="task-desc">Task Description:</label>
              <textarea
                id="task-desc"
                name="description"
                value={task.description}
                onChange={handleChange}
                required
                minLength="10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority:</label>
              <select
                id="priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date-picker">Due Date:</label>
              <input
                type="date"
                id="date-picker"
                name="date"
                value={task.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="assignee">Assign to:</label>
              {loading ? (
                <p>Loading users...</p>
              ) : (
                <select
                  id="assignee"
                  name="assignee"
                  value={task.assignee}
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
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span> Creating...
                  </>
                ) : (
                  "Create Task"
                )}
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

export default AssignTask;
