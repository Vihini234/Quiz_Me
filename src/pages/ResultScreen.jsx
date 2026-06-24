const LETTERS = ['A', 'B', 'C', 'D'];

export default function ResultScreen({ result, onRestart }) {
  const { score, correct, total, results } = result;

  const headline =
    score >= 80 ? '🎉 Great job!' : score >= 50 ? 'Good effort!' : 'Keep practising!';

  return (
    <div className="screen-center">
      <div className="card">
        <h2>{headline}</h2>

        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-num">{score}%</div>
            <div className="stat-lbl">Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{correct}</div>
            <div className="stat-lbl">Correct</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{total - correct}</div>
            <div className="stat-lbl">Wrong</div>
          </div>
        </div>

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
                    : `You: ${LETTERS[r.chosen]} · Correct: ${LETTERS[r.correctAnswer]}: ${r.correctOption}`}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-primary" onClick={onRestart}>
          Restart quiz
        </button>
      </div>
    </div>
  );
}
