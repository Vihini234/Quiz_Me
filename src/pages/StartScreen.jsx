export default function StartScreen({ onStart, playerName }) {
  return (
    <div className="screen-center">
      <div className="card">
        <div className="start-icon">🧠</div>
        <span className="badge">10 questions · 15 sec each</span>
        <h1>General Knowledge Quiz</h1>
        <p className="sub">
          Welcome back, <strong>{playerName}</strong>! Test your knowledge across
          science, history, geography, and tech. Answer before the timer runs out!
        </p>
        <div className="divider" />
        <button className="btn-primary" onClick={onStart}>
          Start quiz →
        </button>
      </div>
    </div>
  );
}
