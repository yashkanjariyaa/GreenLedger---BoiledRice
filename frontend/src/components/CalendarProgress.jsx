import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import Calendar CSS
import './calendar.css';
import { user } from '../constants/calendar';

const CalendarProgress = () => {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [correspondingWeight, setCorrespondingWeight] = useState('');

  // Dummy dates to be highlighted (replace with your desired dates)
  const weightDates = user.weightHistory.map(entry => new Date(entry.date));

  const tileClassName = ({ date }) => {
    const currentDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  
    if (weightDates.some(weightDate => {
      const weightDateUTC = new Date(Date.UTC(weightDate.getFullYear(), weightDate.getMonth(), weightDate.getDate()));
      return weightDateUTC.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0];
    })) {
      return 'highlighted-date';
    }
    return '';
  };
  
  const handleDateChange = (date) => {
    onChange(date);
    const selectedDateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())); // Convert date to UTC
    setSelectedDate(selectedDateUTC.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })); // Format the selected date as desired
  
    // Find corresponding weight for the selected date
    const selectedDateString = selectedDateUTC.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD format
    const weightEntry = user.weightHistory.find(entry => entry.date === selectedDateString);
    if (weightEntry) {
      setCorrespondingWeight(weightEntry.weight);
    } else {
      setCorrespondingWeight(null); // Set to 'N/A' if no weight entry found
    }
  };
  
  

  return (
    <div className='calendar-container'>
      <Calendar
        onChange={handleDateChange}
        value={value}
        tileClassName={tileClassName} // Apply custom tileClassName function
      />

      
        {selectedDate && correspondingWeight && (
          <p className='mt-5 bg-[#aee7c8] p-3 rounded-xl font-[system-ui] font-thin'>
            The weight you submitted on {selectedDate} is {correspondingWeight} kg
            <br />Keep going!
          </p>
        )}
        {selectedDate && !correspondingWeight && (
          <p className='mt-5 bg-[#f0fcf9] p-3 rounded-xl font-[system-ui] font-thin'>
            Phew!
            <br />You did not submit any waste that day.
          </p>
        )}
      
    </div>
  );
};

export default CalendarProgress;
