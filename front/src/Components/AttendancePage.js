import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../Styles/AttendancePage.css';

const AttendancePage = () => {
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserId = () => {
    return localStorage.getItem('userId');
  };

  const groupAttendanceIntoWeeks = useCallback((data) => {
    const weeks = [];
    let currentWeek = [];
    let currentStartDate = null;

    data.forEach((item, index) => {
      const startDate = new Date(item.start_date);

      if (!currentStartDate || !isSameWeek(startDate, currentStartDate)) {
        if (currentWeek.length > 0) weeks.push(currentWeek);
        currentWeek = [];
        currentStartDate = startDate;
      }

      currentWeek.push(item);
      if (index === data.length - 1) weeks.push(currentWeek);
    });

    return weeks;
  }, []);

  const isSameWeek = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const startOfWeek1 = new Date(d1.setDate(d1.getDate() - d1.getDay()));
    const startOfWeek2 = new Date(d2.setDate(d2.getDate() - d2.getDay()));

    return startOfWeek1.getTime() === startOfWeek2.getTime();
  };

  useEffect(() => {
    const userId = getUserId();
    const token = localStorage.getItem('token');

    if (userId && token) {
      axios.get(`http://localhost:5000/api/attendance/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const data = response.data;
          const groupedWeeks = groupAttendanceIntoWeeks(data);
          setWeeks(groupedWeeks);
        })
        .catch((error) => {
          console.error('Error fetching attendance data:', error);
          if (error.response?.status === 403) {
            alert('You are not authorized to access this attendance data.');
          } else {
            alert('Failed to fetch attendance data.');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert('User ID or token missing. Please log in again.');
      setLoading(false);
    }
  }, [groupAttendanceIntoWeeks]);

  const AttendanceTable = ({ title, data }) => (
    <section className="attendance">
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user.Name}</td>
              <td>{user.Role}</td>
              <td>{user.sunday_time}</td>
              <td>{user.monday_time}</td>
              <td>{user.tuesday_time}</td>
              <td>{user.wednesday_time}</td>
              <td>{user.thursday_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );

  return (
    <div className="attendance-container">
      <Sidebar />
      <main className="attendance-content">
        <h2>Employees Attendance</h2>
        {loading ? (
          <p>Loading attendance data...</p>
        ) : weeks.length > 0 ? (
          weeks.map((weekData, index) => {
            const startDate = new Date(weekData[0].start_date);
            const endDate = new Date(weekData[weekData.length - 1].end_date);
            const weekTitle = `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;

            return (
              <AttendanceTable
                key={index}
                title={weekTitle}
                data={weekData}
              />
            );
          })
        ) : (
          <p>No attendance data found.</p>
        )}
      </main>
    </div>
  );
};

export default AttendancePage;
