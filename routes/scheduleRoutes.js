const express = require('express');
const {
  createSchedule,
  getAllSchedules,
  getScheduleById,
} = require('../controllers/scheduleController');

const router = express.Router();

// Create a schedule
router.post('/', createSchedule);

// Get all schedules
router.get('/', getAllSchedules);

// Get a schedule by ID
router.get('/:id', getScheduleById);

module.exports = router;