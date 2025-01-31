const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  availableSeats: {
    type: [String], // Array of available seat numbers (e.g., ["A1", "A2", "B1"])
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;