const express = require('express');
const {
  createReservation,
  getAllReservations,
  getReservationById,
} = require('../controllers/reservationController');

const router = express.Router();

// Create a reservation
router.post('/', createReservation);

// Get all reservations
router.get('/', getAllReservations);

// Get a reservation by ID
router.get('/:id', getReservationById);

module.exports = router;