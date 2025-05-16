import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";
import Feedback from "./Components/Feedback";
import Departments from "./Components/Departments";
import Settings from "./Components/Setting";
import AssignTask from "./Components/AssignTask";
import TeamPage from "./Components/TeamPage";
import EmployeeList from "./Components/EmployeeList";
import AddFeedback from "./Components/Addfeedback";
import DashboardCharts from "./Components/DashboardCharts";
import EmployeePerformance from "./Components/EmployeePerformance";
import CalendarView from './Components/Calendar';
import { ThemeContext } from "./context/ThemeContext";
import ProfileSettings from "./Components/ProfileSettings";
import ManagerList from "./Components/ManagerList";
import AttendancePage from "./Components/AttendancePage";
import CustomerSupport from "./Components/CustomerSupport";
import ServiceChat from "./Components/ServiceChat";
import ChatPage from "./Components/Chatpage";

import "./App.css";

function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/assigntask" element={<AssignTask />} />
        <Route path="/teampage" element={<TeamPage />} />
        <Route path="/addfeedback" element={<AddFeedback />} />
        <Route path="/employee" element={<EmployeeList />} />
        <Route path="/manager" element={<ManagerList />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<DashboardCharts />} />
        <Route path="/employee-performance" element={<EmployeePerformance />} />
        <Route path="/calendar/:userId" element={<CalendarView />} /> {/* ✅ Calendar route */}
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/customer-support" element={<CustomerSupport />} />
        <Route path="/service-chat" element={<ServiceChat />} />
        <Route path="/chat" element={<ChatPage />} />
        
        
        
      </Routes>
    </div>
  );
}

export default App;
