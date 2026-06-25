const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

const questions = [
  {
    id: 1,
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    answer: 2,
  },
  {
    id: 2,
    question: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Mars', 'Earth', 'Mercury'],
    answer: 3,
  },
  {
    id: 3,
    question: 'In what year did the Berlin Wall fall?',
    options: ['1987', '1989', '1991', '1993'],
    answer: 1,
  },
  {
    id: 4,
    question: 'How many sides does a hexagon have?',
    options: ['5', '6', '7', '8'],
    answer: 1,
  },
  {
    id: 5,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ['Charles Dickens', 'Jane Austen', 'William Shakespeare', 'Mark Twain'],
    answer: 2,
  },
  {
    id: 6,
    question: "What does 'HTTP' stand for?",
    options: [
      'HyperText Transfer Protocol',
      'High Transfer Text Protocol',
      'HyperText Transmission Protocol',
      'Hybrid Text Transfer Protocol',
    ],
    answer: 0,
  },
  {
    id: 7,
    question: 'What is the capital of Japan?',
    options: ['Seoul', 'Beijing', 'Bangkok', 'Tokyo'],
    answer: 3,
  },
  {
    id: 8,
    question: 'Which gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
    answer: 2,
  },
  {
    id: 9,
    question: 'How many bytes are in a kilobyte?',
    options: ['100', '512', '1000', '1024'],
    answer: 3,
  },
  {
    id: 10,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    answer: 3,
  },
];

// GET /api/quiz/questions — returns questions without answers
router.get('/questions', (req, res) => {
  const safeQuestions = questions.map(({ id, question, options, answer }) => ({
    id,
    question,
    options,
    correctAnswer: answer,
  }));
  res.json({ questions: safeQuestions, timePerQuestion: 15 });
});

// POST /api/quiz/submit — validates answers and saves score to MongoDB
router.post('/submit', async (req, res) => {
  const { answers, playerName } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'answers must be an array' });
  }

  let correct = 0;
  const results = answers.map((chosen, index) => {
    const q = questions[index];
    if (!q) return null;
    const isCorrect = chosen === q.answer;
    if (isCorrect) correct++;
    return {
      id: q.id,
      question: q.question,
      chosen,
      correctAnswer: q.answer,
      correctOption: q.options[q.answer],
      isCorrect,
    };
  });

  const score = Math.round((correct / questions.length) * 100);

  if (playerName) {
    await Score.create({ playerName, score, correct, total: questions.length });
  }

  res.json({
    score,
    correct,
    total: questions.length,
    results: results.filter(Boolean),
  });
});

// GET /api/quiz/leaderboard — top 10 all-time scores from MongoDB
router.get('/leaderboard', async (req, res) => {
  const leaderboard = await Score.find()
    .sort({ score: -1, date: -1 })
    .limit(10)
    .select('playerName score correct total date -_id');
  res.json({ leaderboard });
});

module.exports = router;
