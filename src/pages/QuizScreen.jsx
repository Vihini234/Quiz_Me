import { useState, useCallback } from 'react';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizScreen({ questions, timePerQuestion, onFinish, onLogout }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timerKey, setTimerKey] = useState(0);

  const current = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const reveal = useCallback(
    (chosen) => {
      setRevealed(true);
      setAnswers((prev) => [...prev, chosen]);
    },
    []
  );

  const handleSelect = (i) => {
    if (revealed) return;
    setSelected(i);
    reveal(i);
  };

  const handleExpire = useCallback(() => {
    if (!revealed) reveal(-1);
  }, [revealed, reveal]);

  const handleNext = () => {
    const next = currentIndex + 1;
    if (next >= questions.length) {
      onFinish(answers);
      return;
    }
    setCurrentIndex(next);
    setSelected(null);
    setRevealed(false);
    setTimerKey((k) => k + 1);
  };

  const feedbackText = () => {
    if (!revealed) return null;
    const last = answers[answers.length - 1];
    if (last === -1) return { text: `Time's up! Answer: ${LETTERS[current.correctAnswer ?? 0]}`, cls: 'wrong' };
    if (last === current.correctAnswer) return { text: '✓ Correct!', cls: 'correct' };
    return { text: `✗ Correct answer: ${LETTERS[current.correctAnswer]}`, cls: 'wrong' };
  };

  const fb = feedbackText();

  return (
    <div className="quiz-screen">
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="meta-row">
        <span className="meta-label">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <Timer
          key={timerKey}
          duration={timePerQuestion}
          running={!revealed}
          onExpire={handleExpire}
        />
      </div>

      <QuestionCard
        question={current.question}
        options={current.options}
        selected={selected}
        revealed={revealed}
        correctAnswer={current.correctAnswer}
        onSelect={handleSelect}
      />

      <div className="feedback-row">
        {fb && <span className={`feedback-text ${fb.cls}`}>{fb.text}</span>}
        {revealed && (
          <button className="btn-primary btn-sm" onClick={handleNext}>
            {currentIndex + 1 === questions.length ? 'See results' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
}
