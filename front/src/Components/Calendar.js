import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import Sidebar from './Sidebar';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Styles/CalendarView.css';

const localizer = momentLocalizer(moment);


const CustomToolbar = ({ label, onNavigate, onView }) => {
  return (
    <div className="custom-toolbar">
      <div className="navigation-buttons">
        <button onClick={() => onNavigate('TODAY')}>Today</button>
        <button onClick={() => onNavigate('PREV')}>Back</button>
        <button onClick={() => onNavigate('NEXT')}>Next</button>
      </div>
      <div className="current-label">{label}</div>
      <div className="view-buttons">
        <button onClick={() => onView('month')}>Month</button>
        <button onClick={() => onView('week')}>Week</button>
        <button onClick={() => onView('day')}>Day</button>
      </div>
    </div>
  );
};

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;

    
    axios.get(`http://localhost:5000/api/calendar/${userId}`)
      .then(response => {
        const data = response.data;
        const formattedEvents = data.map(event => ({
          id: event.Event_ID,
          title: event.Title,
          start: new Date(event.Start_Time),
          end: new Date(event.End_Time),
          desc: event.Description,
          type: event.Event_Type
        }));
        setEvents(formattedEvents);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  }, [userId]);

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad';
    if (event.type === 'Break') backgroundColor = '#fcbf49';
    else if (event.type === 'Task') backgroundColor = '#ef233c';
    else if (event.type === 'Meeting') backgroundColor = '#4361ee';
    else if (event.type === 'Reminder') backgroundColor = '#3a86ff';
    else if (event.type === 'Deadline') backgroundColor = '#ff006e';
    else if (event.type === 'Training') backgroundColor = '#06d6a0';

    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '8px',
        border: 'none',
        padding: '4px',
      }
    };
  };

  const handleAddEvent = () => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const newEvent = {
      User_ID: userId,
      Title: 'New Event',
      Description: 'Description of the event',
      Start_Time: now,
      End_Time: oneHourLater,
      Event_Type: 'Meeting',
      Location: 'Conference Room',
    };

    axios.post('http://localhost:5000/api/calendar', newEvent)
      .then(response => {
        const addedEvent = response.data;
        setEvents([...events, {
          ...newEvent,
          id: addedEvent.Event_ID,
          start: now,
          end: oneHourLater,
        }]);
      })
      .catch(error => {
        console.error("Error adding event:", error);
      });
  };


  const handleNavigate = (action) => {
    const newDate = new Date(currentDate); 

    switch (action) {
      case 'TODAY':
        setCurrentDate(new Date()); // Set date to today
        break;
      case 'PREV':
        if (view === 'month') {
          newDate.setMonth(newDate.getMonth() - 1); // Previous month
        } else if (view === 'week') {
          newDate.setDate(newDate.getDate() - 7); // Previous week
        } else if (view === 'day') {
          newDate.setDate(newDate.getDate() - 1); // Previous day
        }
        setCurrentDate(newDate);
        break;
      case 'NEXT':
        if (view === 'month') {
          newDate.setMonth(newDate.getMonth() + 1); // Next month
        } else if (view === 'week') {
          newDate.setDate(newDate.getDate() + 7); // Next week
        } else if (view === 'day') {
          newDate.setDate(newDate.getDate() + 1); // Next day
        }
        setCurrentDate(newDate);
        break;
      default:
        break;
    }
  };

  const handleViewChange = (newView) => {
    setView(newView); 
  };

  return (
    <div className="calendar-view">
      <Sidebar />
      <div className="calendar-container">
        <h2>My Weekly Schedule</h2>
        <button onClick={handleAddEvent} className="add-event-button">
          Add Event
        </button>
        <Calendar
          localizer={localizer}
          events={events}
          view={view}  
          views={['week', 'day', 'month']}
          step={30}
          timeslots={2}
          style={{ height: '85vh' }}
          eventPropGetter={eventStyleGetter}
          components={{ toolbar: (props) => <CustomToolbar {...props} onNavigate={handleNavigate} onView={handleViewChange} /> }}
          onNavigate={handleNavigate}
          onView={handleViewChange}  
          date={currentDate}  
        />
      </div>
    </div>
  );
};

export default CalendarView;
