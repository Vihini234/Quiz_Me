const BASE_URL = '/api/quiz';

export async function fetchQuestions() {
  const res = await fetch(`${BASE_URL}/questions`);
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}

export async function submitAnswers(answers, playerName) {
  const res = await fetch(`${BASE_URL}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers, playerName }),
  });
  if (!res.ok) throw new Error('Failed to submit answers');
  return res.json();
}

export async function fetchLeaderboard() {
  const res = await fetch(`${BASE_URL}/leaderboard`);
  if (!res.ok) throw new Error('Failed to fetch leaderboard');
  return res.json();
}
