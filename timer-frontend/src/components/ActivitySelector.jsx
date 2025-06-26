import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const activities = [
  { name: 'Running', image: '/images/running.png' },
  { name: 'Cooking', image: '/images/cooking.png' },
  { name: 'Studying', image: '/images/studying.png' },
  { name: 'Competing', image: '/images/competing.png' },
];

function ActivitySelector() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleStart = () => {
    if (selected) {
      navigate('/timer', { state: { activity: selected } });
    }
  };

  return (
    <div className="activity-selector">
      <h2>Select an Activity</h2>
      <div className="activity-options">
        {activities.map((act, index) => (
          <div
            key={index}
            className={`activity-card ${selected?.name === act.name ? 'selected' : ''}`}
            onClick={() => setSelected(act)}
          >
            <img src={act.image} alt={act.name} width="100" />
            <p>{act.name}</p>
          </div>
        ))}
      </div>
      <button disabled={!selected} onClick={handleStart}>
        Start Timer
      </button>
    </div>
  );
}

export default ActivitySelector;
