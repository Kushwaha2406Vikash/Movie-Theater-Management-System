const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
  genre: {
    type: [String], // Array of genres (e.g., ["Action", "Adventure"])
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  theaters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater',
    },
  ],
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;