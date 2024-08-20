import React, { useState, useEffect } from 'react';

// CountdownClock component
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
    <div style={{ textAlign: 'center', fontSize: '24px' }}>
      <h1>Countdown Clock</h1>
      <div>
        <span>{timeLeft.days} Days </span>
        <span>{timeLeft.hours} Hours </span>
        <span>{timeLeft.minutes} Minutes </span>
        <span>{timeLeft.seconds} Seconds </span>
      </div>
    </div>
  );
};

export default CountdownClock;
