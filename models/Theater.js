const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  seats: {
    type: [[String]], // 2D array representing seat layout (e.g., [["A1", "A2"], ["B1", "B2"]])
    required: true,
  },
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;