// src/App.jsx
import React, { useState } from 'react';
import EventForm from './components/EventForm';
import Timer from './components/Timer';
import './App.css';

function App() {
  const [event, setEvent] = useState(null);

  return (
    <div className="App">
      {!event ? (
        <EventForm onStart={setEvent} />
      ) : (
        <Timer event={event} onReset={() => setEvent(null)} />
      )}
    </div>
  );
}

export default App;
