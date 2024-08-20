import React, { useState } from 'react';
import CountdownClock from './components/clockwork';
import './App.css'; // Import your main app styles

function App() {
  const [targetDate, setTargetDate] = useState('2024-12-31T23:59:59');

  const handleDateChange = (newDate) => {
    setTargetDate(newDate);
  };

  return (
    <div className="App">
      <CountdownClock targetDate={targetDate} onDateChange={handleDateChange} />
    </div>
  );
}

export default App;
