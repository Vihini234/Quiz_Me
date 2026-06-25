import { useState, useEffect } from 'react';
import AuthScreen from './pages/AuthScreen';
import StartScreen from './pages/StartScreen';
import QuizScreen from './pages/QuizScreen';
import ResultScreen from './pages/ResultScreen';
import { fetchQuestions, submitAnswers } from './api/quizApi';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState('start');
  const [questions, setQuestions] = useState([]);
  const [timePerQuestion, setTimePerQuestion] = useState(15);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem('qm_session');
    if (session) setUser(JSON.parse(session));
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchQuestions()
      .then((data) => {
        setQuestions(data.questions);
        setTimePerQuestion(data.timePerQuestion);
      })
      .catch(() => setError('Could not load questions. Is the backend running?'));
  }, [user]);

  const handleAuth = (u) => { setUser(u); };

  const handleStart = () => setScreen('quiz');

  const handleFinish = async (answers) => {
    setLoading(true);
    try {
      const data = await submitAnswers(answers, user?.name);
      setResult(data);
      setScreen('result');
    } catch { setError('Could not submit answers.'); }
    finally { setLoading(false); }
  };

  const handleRestart = () => { setResult(null); setScreen('start'); };

  const handleLogout = () => {
    localStorage.removeItem('qm_session');
    setUser(null);
    setScreen('start');
    setResult(null);
    setError(null);
  };

  if (!user) return <div className="app-wrap"><AuthScreen onAuth={handleAuth} /></div>;

  if (error) return (
    <div className="app-wrap">
      <div className="screen-center">
        <div className="card">
          <p style={{ color: 'var(--wrong)' }}>{error}</p>
          <button className="btn-primary btn-sm" style={{ width: 'auto' }} onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="app-wrap"><div className="screen-center"><p className="sub">Submitting answers…</p></div></div>;

  return (
    <div className="app-wrap">
      {screen !== 'quiz' && (
        <header className="app-header">
          <span className="header-user">👤 {user.name}</span>
          <button className="btn-logout" onClick={handleLogout}>Log out</button>
        </header>
      )}
      {screen === 'start' && <StartScreen onStart={handleStart} playerName={user.name} />}
      {screen === 'quiz' && questions.length > 0 && (
        <QuizScreen questions={questions} timePerQuestion={timePerQuestion} onFinish={handleFinish} onLogout={handleLogout} />
      )}
      {screen === 'result' && result && <ResultScreen result={result} onRestart={handleRestart} />}
    </div>
  );
}
