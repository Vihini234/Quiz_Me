const LETTERS = ['A', 'B', 'C', 'D'];

function ScoreRing({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);
  const color = score >= 80 ? '#3fb950' : score >= 50 ? '#818cf8' : '#f85149';

  return (
    <div className="score-ring-wrap">
      <svg viewBox="0 0 130 130" className="score-ring">
        <circle cx="65" cy="65" r={radius} className="score-track" />
        <circle
          cx="65" cy="65" r={radius}
          className="score-progress"
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="score-inner">
        <span className="score-pct" style={{ color }}>{score}%</span>
        <span className="score-lbl-ring">Score</span>
      </div>
    </div>
  );
}

export default function ResultScreen({ result, onRestart }) {
  const { score, correct, total, results } = result;

  const headline =
    score >= 80 ? 'Great job!' : score >= 50 ? 'Good effort!' : 'Keep practising!';

  return (
    <div className="screen-center">
      <div className="card">
        <ScoreRing score={score} />

        <div>
          <h2>{headline}</h2>
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-num" style={{ color: '#3fb950' }}>{correct}</div>
            <div className="stat-lbl">Correct</div>
          </div>
          <div className="stat-card">
            <div className="stat-num" style={{ color: '#f85149' }}>{total - correct}</div>
            <div className="stat-lbl">Wrong</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{total}</div>
            <div className="stat-lbl">Total</div>
          </div>
        </div>

        <div className="divider" />

        <div className="result-list">
          {results.map((r) => (
            <div key={r.id} className={`result-item ${r.isCorrect ? 'r-correct' : 'r-wrong'}`}>
              <span className="r-icon">{r.isCorrect ? '✓' : '✗'}</span>
              <div className="r-text">
                <div className="r-q">{r.question}</div>
                <div className="r-ans">
                  {r.isCorrect
                    ? `${LETTERS[r.chosen]}: ${r.correctOption}`
                    : r.chosen === -1
                    ? `No answer · Correct: ${LETTERS[r.correctAnswer]}: ${r.correctOption}`
                    : `Your answer: ${LETTERS[r.chosen]} · Correct: ${LETTERS[r.correctAnswer]}: ${r.correctOption}`}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-primary" onClick={onRestart}>
          Play again
        </button>
      </div>
    </div>
  );
}
