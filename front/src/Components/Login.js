import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "../Styles/Login.css";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        Email: formData.email,
        Password: formData.password,
      });

      if (response.status === 200) {
        const { token, user } = response.data; // Get token and user data
        const decodedToken = jwtDecode(token); // Decode JWT token to get user info
        console.log("Decoded Token:", decodedToken); // Log decoded token for debugging
        
        localStorage.setItem("userId", decodedToken.id); // Store user ID

        localStorage.setItem("token", token); // Store JWT token
        localStorage.setItem("user", JSON.stringify(user)); // Store user info

        navigate("/HomePage"); // Redirect after successful login
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <img src="/Logooo-removebg-preview.png" alt="Logo" className="logo" />
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit" className="signup-btn">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
      <div className="social-login">
        <button className="google-btn">
          <img src="/Google.png" alt="Google" />
          Sign in with Google
        </button>
        <button className="apple-btn">
          <img src="/apple.png" alt="Apple" />
          Sign in with Apple
        </button>
      </div>
    </div>
  );
};

export default Login;
