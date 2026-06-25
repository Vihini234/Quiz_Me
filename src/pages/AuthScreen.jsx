import { useState } from 'react';

function validate(tab, fields) {
  if (tab === 'signup') {
    if (!fields.name.trim()) return 'Name is required.';
    if (!fields.email.includes('@')) return 'Enter a valid email.';
    if (fields.password.length < 6) return 'Password must be at least 6 characters.';
    if (fields.password !== fields.confirm) return 'Passwords do not match.';
  } else {
    if (!fields.email.trim()) return 'Email is required.';
    if (!fields.password) return 'Password is required.';
  }
  return null;
}

export default function AuthScreen({ onAuth }) {
  const [tab, setTab] = useState('login');
  const [fields, setFields] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const set = (key) => (e) => {
    setError('');
    setFields((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(tab, fields);
    if (err) { setError(err); return; }

    const users = JSON.parse(localStorage.getItem('qm_users') || '[]');

    if (tab === 'signup') {
      if (users.find((u) => u.email === fields.email)) {
        setError('An account with this email already exists.');
        return;
      }
      const user = { name: fields.name.trim(), email: fields.email.trim(), password: fields.password };
      users.push(user);
      localStorage.setItem('qm_users', JSON.stringify(users));
      localStorage.setItem('qm_session', JSON.stringify(user));
      onAuth(user);
    } else {
      const user = users.find((u) => u.email === fields.email && u.password === fields.password);
      if (!user) { setError('Invalid email or password.'); return; }
      localStorage.setItem('qm_session', JSON.stringify(user));
      onAuth(user);
    }
  };

  const switchTab = (t) => { setTab(t); setError(''); setFields({ name: '', email: '', password: '', confirm: '' }); };

  return (
    <div className="screen-center">
      <div className="card">
        <div className="start-icon">🧠</div>
        <h1>General Knowledge Quiz</h1>

        <div className="auth-tabs">
          <button className={`auth-tab${tab === 'login' ? ' active' : ''}`} onClick={() => switchTab('login')}>Log in</button>
          <button className={`auth-tab${tab === 'signup' ? ' active' : ''}`} onClick={() => switchTab('signup')}>Sign up</button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <input className="name-input" type="text" placeholder="Full name" value={fields.name} onChange={set('name')} />
          )}
          <input className="name-input" type="email" placeholder="Email address" value={fields.email} onChange={set('email')} />
          <input className="name-input" type="password" placeholder="Password" value={fields.password} onChange={set('password')} />
          {tab === 'signup' && (
            <input className="name-input" type="password" placeholder="Confirm password" value={fields.confirm} onChange={set('confirm')} />
          )}

          {error && <p className="auth-error">{error}</p>}

          <button className="btn-primary" type="submit">
            {tab === 'login' ? 'Log in →' : 'Create account →'}
          </button>
        </form>
      </div>
    </div>
  );
}
