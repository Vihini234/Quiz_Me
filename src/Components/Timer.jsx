import { useEffect, useState } from 'react';

export default function Timer({ duration, onExpire, running }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      onExpire();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, running, onExpire]);

  const urgent = timeLeft <= 5;

  return (
    <span className={`timer-badge ${urgent ? 'urgent' : ''}`}>
      {timeLeft}s
    </span>
  );
}
