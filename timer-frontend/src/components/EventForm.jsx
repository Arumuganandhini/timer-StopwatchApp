// src/components/EventForm.jsx
import React, { useState } from 'react';

function EventForm({ onStart }) {
  const [eventName, setEventName] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    if (eventName && totalSeconds > 0) {
      onStart({ eventName, totalSeconds });
    }
  };

  return (
    <div className="form-container">
      <h2>Start a New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        /><br />
        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <input
          type="number"
          placeholder="Seconds"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        /><br />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}

export default EventForm;
