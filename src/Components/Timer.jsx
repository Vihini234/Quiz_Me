import { useEffect, useState } from 'react';

export default function Timer({ duration, onExpire, running }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => { setTimeLeft(duration); }, [duration]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) { onExpire(); return; }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, running, onExpire]);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - timeLeft / duration);
  const urgent = timeLeft <= 5;

  return (
    <div className={`timer${urgent ? ' urgent' : ''}`}>
      <svg viewBox="0 0 50 50" className="timer-ring">
        <circle cx="25" cy="25" r={radius} className="timer-track" />
        <circle
          cx="25" cy="25" r={radius}
          className="timer-progress"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="timer-text">{timeLeft}</span>
    </div>
  );
}
