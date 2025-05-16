import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faGooglePlus, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import '../Styles/ChatPage.css'; // You should create this file to style the chat

const socket = io('http://localhost:3001');

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChatLog((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', message);
      setMessage('');
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="content-wrapper">
        <div className="chat-content">
          <div className="chat-container">
            <h2 className="chat-title">💬 Team Chat</h2>
            <div className="chat-log">
              {chatLog.map((msg, i) => (
                <div key={i} className="chat-message">{msg}</div>
              ))}
            </div>
            <div className="chat-input-area">
              <input
                className="chat-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
              />
              <button className="chat-send-button" onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>

        <footer className="dashboard-footer">
          <div className="footerContainer">
            <div className="socialIcons">
              <button><FontAwesomeIcon icon={faFacebook} size="2x" /></button>
              <button><FontAwesomeIcon icon={faInstagram} size="2x" /></button>
              <button><FontAwesomeIcon icon={faTwitter} size="2x" /></button>
              <button><FontAwesomeIcon icon={faGooglePlus} size="2x" /></button>
              <button><FontAwesomeIcon icon={faYoutube} size="2x" /></button>
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
      </div>
    </div>
  );
};

export default ChatPage;