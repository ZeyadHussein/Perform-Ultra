import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "../Styles/ServiceChat.css";

const ServiceChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message.trim() !== "") {
      const userMessage = { text: message, sender: "user", timestamp: new Date() };
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");

      setTimeout(() => {
        const botReply = { text: getBotReply(message), sender: "bot", timestamp: new Date() };
        setMessages((prev) => [...prev, botReply]);
      }, 800);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

const getBotReply = (input) => {
  const msg = input.toLowerCase().trim();
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(msg)) {
    return "Hello! 👋 How can I assist you with your workforce management tasks today?";
  }
  if (msg.includes("leave") || msg.includes("vacation") || msg.includes("time off")) {
    return "To apply for leave, please go to the Leave Management page where you can select your dates, provide reasons, and track approval status easily.";
  }
  if (msg.includes("attendance") || msg.includes("check in") || msg.includes("check out")) {
    return "📊 You can view your attendance summary and daily logs under **Dashboard > Attendance. Need help with correcting attendance? Just let me know!";
  }
  if (msg.includes("report") || msg.includes("reports") || msg.includes("analytics")) {
    return "To generate or download detailed reports, visit the Analytics section. You can filter by department, date range, or specific employees.";
  }
  if (msg.includes("email") || msg.includes("contact") || msg.includes("support email")) {
    return "For support, you can reach out via email at support@performultra.com. Our team usually replies within 24 hours.";
  }
  if (msg.includes("support") || msg.includes("help") || msg.includes("issue") || msg.includes("problem")) {
    return "I'm here to help with leave requests, attendance, reporting, task assignments, and general platform guidance. What do you need assistance with?";
  }
  if (msg.includes("payroll") || msg.includes("salary") || msg.includes("payment")) {
    return "For payroll information, please visit the **Payroll** section in your profile. If you notice any discrepancies, contacting HR directly is recommended.";
  }
  if (msg.includes("task") || msg.includes("assignment") || msg.includes("to-do")) {
    return "📝 You can find your assigned tasks in the Task Manager. Track progress, upload files, and add notes to stay organized.";
  }
  if (msg.includes("profile") || msg.includes("account") || msg.includes("settings")) {
    return "Manage your personal information, update your password, or change your department details anytime on the Profile Settings page.";
  }
  if (msg.includes("thank") || msg.includes("thanks")) {
    return "You're very welcome! 😊 If you need anything else, just ask.";
  }
  if (msg.includes("who are you") || msg.includes("what can you do")) {
    return "I'm your Perform Ultra assistant bot, here to help with leave, attendance, tasks, reports, and more. Just ask!";
  }
  if (msg.includes("schedule") || msg.includes("calendar")) {
    return "You can view and manage your work schedule and upcoming events on the **Schedule** page.";
  }
  if (msg.includes("policy") || msg.includes("rules")) {
    return "Workforce policies and guidelines are available under the Company Policies section for your reference.";
  }

  return "I'm not sure I understood that. Could you please rephrase or provide more details so I can assist you better?";
};



  return (
    <div className="service-chat-page">
      <Sidebar />

      <div className="chat-container">
        <h3 className="chat-title">Perform Ultra AI Support Chat</h3>

        <div className="chat-box">
          <div className="chat-header">
            <h2>Welcome to Perform Ultra Chat Support</h2>
            <p>
              <strong>Need help?</strong> Chat with us 24/7.
              <br />
              Our workforce AI assistant is here for attendance, reports, leave, and more.
            </p>
          </div>

          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <span>{msg.text}</span>
                <div className="timestamp">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask about attendance, leave, reports..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceChat;
