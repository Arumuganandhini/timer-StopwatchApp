// src/components/Timer.jsx
import React, { useEffect, useState } from 'react';

function Timer({ event, onReset }) {
  const [secondsLeft, setSecondsLeft] = useState(event.totalSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const secLeft = sec % 60;
    return `${String(min).padStart(2, '0')}:${String(secLeft).padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <h2>{event.eventName}</h2>
      <h1>{formatTime(secondsLeft)}</h1>
      {secondsLeft <= 0 && <p>⏰ Time's up!</p>}
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default Timer;
