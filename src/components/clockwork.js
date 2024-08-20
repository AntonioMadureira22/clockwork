import React, { useState, useEffect } from 'react';
import './CountdownClock.css'; // Import the CSS file

const CountdownClock = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target - now;

    let timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-clock">
      <h1>Countdown Clock</h1>
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
