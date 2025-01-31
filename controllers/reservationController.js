const Reservation = require('../models/Reservation');

// Create a reservation
const createReservation = async (req, res) => {
  const { user, schedule, seats, totalPrice } = req.body;

  try {
    const reservation = new Reservation({ user, schedule, seats, totalPrice });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user schedule');
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a reservation by ID
const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('user schedule');
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createReservation, getAllReservations, getReservationById };