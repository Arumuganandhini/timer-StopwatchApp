import React, { useEffect, useState } from 'react';

const playBeep = () => {
  const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-classic-alarm-995.mp3");
  audio.play().catch((e) => console.error("Beep failed", e));
};

function Timer({ event, onReset }) {
  const [secondsLeft, setSecondsLeft] = useState(event.totalSeconds);
  const [history, setHistory] = useState([]);
  const [repeat, setRepeat] = useState(false);
  const [mode, setMode] = useState('countdown'); // or 'stopwatch'
  const [active, setActive] = useState(true);

  // Format HH:MM:SS
  const formatTime = (total) => {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Load history on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('pastTimers')) || [];
    setHistory(saved);
  }, []);

  // Main timer logic
  useEffect(() => {
    if (!active) return;

    if (mode === 'countdown') {
      if (secondsLeft <= 0) {
        playBeep();

        const newEntry = {
          name: event.name,
          duration: event.totalSeconds,
          completedAt: new Date().toLocaleString()
        };

        const past = [newEntry, ...history];
        localStorage.setItem('pastTimers', JSON.stringify(past));
        setHistory(past);

        if (repeat) {
          setSecondsLeft(event.totalSeconds); // auto-restart
        } else {
          setActive(false);
        }
        return;
      }
      const interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setSecondsLeft(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [secondsLeft, active, repeat, mode]);

  // Clear history
  const handleClearHistory = () => {
    localStorage.removeItem('pastTimers');
    setHistory([]);
  };

  return (
    <>
      <div className="timer-container">
        <h1>{event.name || "Timer"}</h1>
        <div className="timer-display">{formatTime(secondsLeft)}</div>

        <div style={{ margin: '10px 0' }}>
          <button onClick={() => setActive(!active)}>
            {active ? 'Pause' : 'Resume'}
          </button>
          <button onClick={onReset}>Reset</button>
        </div>

        <div style={{ margin: '10px 0' }}>
          <label>
            <input
              type="checkbox"
              checked={repeat}
              onChange={() => setRepeat(!repeat)}
            /> Auto Repeat
          </label>
          <br />
          <button onClick={() => {
            setMode(mode === 'countdown' ? 'stopwatch' : 'countdown');
            setSecondsLeft(mode === 'countdown' ? 0 : event.totalSeconds);
          }}>
            Switch to {mode === 'countdown' ? 'Stopwatch' : 'Countdown'}
          </button>
        </div>
      </div>

      <div className="history-container">
        <h3>Previous Timers</h3>
        {history.length === 0 ? (
          <p>No history yet.</p>
        ) : (
          <>
            <ul>
              {history.map((item, i) => (
                <li key={i}>
                  <strong>{item.name}</strong> – {formatTime(item.duration)} – {item.completedAt}
                </li>
              ))}
            </ul>
            <button onClick={handleClearHistory}>Clear History</button>
          </>
        )}
      </div>
    </>
  );
}

export default Timer;
