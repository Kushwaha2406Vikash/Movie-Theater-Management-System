const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const redis = require('redis');

// Create Redis client
const client = redis.createClient();

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

// Register a new user
const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        user = new User({ name, email, password, role });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({
            message: 'Account created successfully.',
            success: true,
            token,
        });
    } catch (err) {
        res.status(500).json({ error: err.message, message: 'Unsuccessful registration' });
    }
};

// Login user
const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the user's role matches the expected role
        if (user.role !== role) {
            return res.status(403).json({ message: 'Access denied. Invalid role.' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            token,
            message: `Welcome back ${user.name}`,
            user,
            success: true,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Logout user
const logout = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        console.log(token);

        // Add the token to the blacklist with an expiration time
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const expirationTime = decoded.exp - Math.floor(Date.now() / 1000); // Time left in seconds

        client.setex(token, expirationTime, 'blacklisted', (err) => {
            if (err) {
                throw new Error('Error adding token to blacklist');
            }

            res.status(200).json({
                message: 'Logged out successfully',
                success: true,
            });
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: 'Logout failed',
        });
    }
};

module.exports = { register, login, logout };