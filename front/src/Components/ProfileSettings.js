import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../Styles/ProfileSettings.css";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    Name: "",
    Email: "",
    City: "",
    District: "",
    Department_ID: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setMessage("Failed to load profile.");
        setError("Failed to load profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      await axios.put("http://localhost:5000/api/user/profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Update failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-settings-container">
      <Sidebar />
      <div className="profile-settings-center">
        <div className="profile-settings-card">
          <h2 className="mb-4">Profile Settings</h2>

          <div className="profile-preview">
            <div
              className="avatar-circle"
              data-initial={profile.Name ? profile.Name.charAt(0).toUpperCase() : "U"}
            ></div>
            <div className="profile-info-text">
              <h4>{profile.Name || "Unnamed User"}</h4>
              <p>{profile.Email || "No email provided"}</p>
            </div>
          </div>

          {message && (
            <div className="alert alert-info">
              <strong>Info:</strong> {message}
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group-row">
              <label htmlFor="Name" className="form-label">Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={profile.Name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group-row">
              <label htmlFor="Email" className="form-label">Email</label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={profile.Email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group-row">
              <label htmlFor="City" className="form-label">City</label>
              <input
                type="text"
                id="City"
                name="City"
                value={profile.City || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group-row">
              <label htmlFor="District" className="form-label">District</label>
              <input
                type="text"
                id="District"
                name="District"
                value={profile.District || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group-row">
              <label htmlFor="Department_ID" className="form-label">Department ID</label>
              <input
                type="number"
                id="Department_ID"
                name="Department_ID"
                value={profile.Department_ID || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
