const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const { authenticate, authorize } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');


const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

/*
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/schedules', scheduleRoutes);


// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
*/
app.use('/api/auth', authRoutes);
app.use('/api/movies', authenticate, movieRoutes); // Protect movie routes
app.use('/api/payments', authenticate, paymentRoutes); // Protect payment routes
app.use('/api/reservations', authenticate, reservationRoutes); // Protect reservation routes
app.use('/api/schedules', authenticate, scheduleRoutes); // Protect schedule routes

app.post('/api/admin-only', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

// Error handling middleware
app.use(errorHandler);


module.exports = app;