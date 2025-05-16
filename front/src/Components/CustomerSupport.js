import React from "react";
import Sidebar from "./Sidebar"; // ✅ Adjust path as needed
import "../Styles/CustomerSupport.css"; // CSS for the support page

const CustomerSupport = () => {
  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      <Sidebar />

      <div className="customer-support-container">
        <h2>Customer support</h2>

        <div className="support-card">
          <div className="support-card-section">
            <div>
              <h3>Service Chat</h3>
              <p>7:00 - 21:00 (GMT+8), 7 Days a Week</p>
            </div>
            <span className="icon">🎧</span>
          </div>

          <div className="support-card-section">
            <div>
              <h3>Email Us</h3>
              <p>support@performultra.com</p>
            </div>
            <span className="icon">✉️</span>
          </div>

          <div className="support-card-section">
            <div>
              <p>Egypt</p>
              <strong>+20 1005259976</strong>
              <p className="note">Support available in English 24/7</p>
            </div>
            <span className="icon">📞</span>
          </div>

          <div className="support-card-section">
            <div>
              <p>Egypt</p>
              <strong>+20 1244583392</strong>
              <p className="note">Support available in Arabic 24/7</p>
            </div>
            <span className="icon">📞</span>
          </div>

          <div className="support-card-section">
            <div>
              <p>Other countries and regions</p>
            </div>
            <span className="icon">➡️</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
