import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import Calendar CSS
import './calendar.css';
import axios from "axios";

const CalendarProgress = () => {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [correspondingWeight, setCorrespondingWeight] = useState(null); // Initialize correspondingWeight as null
  const [user, setUser] = useState(null); // Initialize user as null

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Make API call to fetch user data
        const email = localStorage.getItem("email");
        const response = await axios.get('http://localhost:3000/api/info/getcalenderitems', {
          params: {
            email: email,
          },
        });

        // Set user data in state
        setUser(response.data);

        // Find the latest weight entry date
        const latestWeightDate = response.data.weightHistory.reduce((latestDate, entry) => {
          return entry.date > latestDate ? entry.date : latestDate;
        }, '');

        // Set the latest date as the default value
        onChange(new Date(latestWeightDate));
      } catch (error) {
        // Handle errors
        console.error('Error fetching user data:', error);
      }
    };

    // Call the function to fetch user data on component load
    fetchUser();
  }, []);

  // Function to handle date change
  const handleDateChange = (date) => {
    onChange(date);
    const selectedDateString = date.toISOString().split('T')[0]; // Convert selected date to YYYY-MM-DD format
    
    // Find corresponding weight for the selected date
    if (user && user.weightHistory) {
      const weightEntry = user.weightHistory.find(entry => entry.date.split('T')[0] === selectedDateString);
      if (weightEntry) {
        setCorrespondingWeight(weightEntry.weight);
      } else {
        setCorrespondingWeight(null); // Set to null if no weight entry found
      }
    }
  };

  // Custom function to determine tile class name
  const tileClassName = ({ date }) => {
    const selectedDateString = date.toISOString().split('T')[0]; // Convert selected date to YYYY-MM-DD format

    // Check if there is a weight entry for the selected date
    if (user && user.weightHistory) {
      return user.weightHistory.some(entry => entry.date.split('T')[0] === selectedDateString) ? 'highlighted-date' : '';
    }
    return '';
  };

  return (
    <div className='calendar-container'>
      <Calendar
        onChange={handleDateChange}
        value={value}
        tileClassName={tileClassName} // Apply custom tileClassName function
      />

      {correspondingWeight !== null && (
        <p className='mt-5 bg-[#aee7c8] p-3 rounded-xl font-[system-ui] font-thin'>
          The weight you submitted on is {correspondingWeight} kg
          <br />Keep going!
        </p>
      )}
      {correspondingWeight === null && (
        <p className='mt-5 bg-[#f0fcf9] p-3 rounded-xl font-[system-ui] font-thin'>
          Phew!
          <br />You did not submit any weight that day.
        </p>
      )}
    </div>
  );
};

export default CalendarProgress;