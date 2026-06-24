import { useState, useEffect } from 'react';
import StartScreen from './pages/StartScreen';
import QuizScreen from './pages/QuizScreen';
import ResultScreen from './pages/ResultScreen';
import { fetchQuestions, submitAnswers } from './api/quizApi';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [questions, setQuestions] = useState([]);
  const [timePerQuestion, setTimePerQuestion] = useState(15);
  const [result, setResult] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions()
      .then((data) => {
        setQuestions(data.questions);
        setTimePerQuestion(data.timePerQuestion);
      })
      .catch(() => setError('Could not load questions. Is the backend running?'));
  }, []);

  const handleStart = (name) => { setPlayerName(name); setScreen('quiz'); };

  const handleFinish = async (answers) => {
    setLoading(true);
    try {
      const data = await submitAnswers(answers, playerName);
      setResult(data); setScreen('result');
    } catch { setError('Could not submit answers.'); }
    finally { setLoading(false); }
  };

  const handleRestart = () => { setResult(null); setScreen('start'); };

  if (error) return <div className="app-wrap"><div className="screen-center"><div className="card"><p style={{color:'#A32D2D'}}>{error}</p></div></div></div>;
  if (loading) return <div className="app-wrap"><div className="screen-center"><p className="sub">Submitting answers…</p></div></div>;

  return (
    <div className="app-wrap">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'quiz' && questions.length > 0 && <QuizScreen questions={questions} timePerQuestion={timePerQuestion} onFinish={handleFinish} />}
      {screen === 'result' && result && <ResultScreen result={result} onRestart={handleRestart} />}
    </div>
  );
}