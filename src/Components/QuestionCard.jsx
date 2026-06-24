const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuestionCard({
  question,
  options,
  selected,
  revealed,
  correctAnswer,
  onSelect,
}) {
  function getClass(i) {
    if (!revealed) return selected === i ? 'option selected' : 'option';
    if (i === correctAnswer) return 'option correct';
    if (i === selected && i !== correctAnswer) return 'option wrong';
    return 'option';
  }

  return (
    <div className="question-card">
      <p className="question-text">{question}</p>
      <div className="options-grid">
        {options.map((opt, i) => (
          <button
            key={i}
            className={getClass(i)}
            onClick={() => onSelect(i)}
            disabled={revealed}
          >
            <span className="option-letter">{LETTERS[i]}</span>
            <span>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
