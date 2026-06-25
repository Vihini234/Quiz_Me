const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  playerName: { type: String, default: 'Anonymous' },
  score:   { type: Number, required: true },
  correct: { type: Number, required: true },
  total:   { type: Number, required: true },
  date:    { type: Date,   default: Date.now },
});

module.exports = mongoose.model('Score', scoreSchema);
