import { useState } from 'react';

export default function StartScreen({ onStart }) {
  const [name, setName] = useState('');

  return (
    <div className="screen-center">
      <div className="card">
        <div className="start-icon">🧠</div>

        <span className="badge">10 questions · 15 sec each</span>

        <h1>General Knowledge Quiz</h1>

        <p className="sub">
          Test your knowledge across science, history, geography, and tech.
          Answer before the timer runs out!
        </p>

        <div className="divider" />

        <input
          className="name-input"
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onStart(name.trim())}
          maxLength={30}
        />

        <button className="btn-primary" onClick={() => onStart(name.trim())}>
          Start quiz →
        </button>
      </div>
    </div>
  );
}
