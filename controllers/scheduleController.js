const Schedule = require('../models/Schedule');

// Create a schedule
const createSchedule = async (req, res) => {
  const { movie, theater, startTime, endTime, availableSeats, price } = req.body;

  try {
    const schedule = new Schedule({ movie, theater, startTime, endTime, availableSeats, price });
    await schedule.save();
    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all schedules
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('movie theater');
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a schedule by ID
const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate('movie theater');
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSchedule, getAllSchedules, getScheduleById };