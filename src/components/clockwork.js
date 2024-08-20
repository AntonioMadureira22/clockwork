import React, { useState, useEffect } from 'react';
import './CountdownClock.css'; // Import the CSS file
import alertSound from '../components/wolves.mp3';

const CountdownClock = ({ targetDate, onDateChange }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [inputDate, setInputDate] = useState(targetDate);
  const [theme, setTheme] = useState('dark'); // Default theme
  const [hasPlayed, setHasPlayed] = useState(false); // Flag to track if the sound has been played

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setTimeLeft(timeLeft);

      if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        if (!hasPlayed) { // Check if the sound has already been played
          new Audio(alertSound).play();
          setHasPlayed(true); // Set the flag to true
        }
      } else {
        setHasPlayed(false); // Reset the flag if time is not zero
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, hasPlayed]);

  const handleDateChange = (event) => {
    setInputDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onDateChange) {
      onDateChange(inputDate);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`countdown-clock ${theme}`}>
      <h1>Countdown Clock</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          value={inputDate}
          onChange={handleDateChange}
        />
        <button type="submit">Set Date</button>
      </form>
      <button onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
      </button>
      <div className="time-container">
        <div className="time-unit">
          <span className="time-number">{timeLeft.days}</span>
          <span className="time-label">Days</span>
        </div>
        <div className="time-unit">
          <span className="time-number">{timeLeft.hours}</span>
          <span className="time-label">Hours</span>
        </div>
        <div className="time-unit">
          <span className="time-number">{timeLeft.minutes}</span>
          <span className="time-label">Minutes</span>
        </div>
        <div className="time-unit">
          <span className="time-number">{timeLeft.seconds}</span>
          <span className="time-label">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownClock;
