const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check user role (e.g., admin)
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
/*
const checkBlacklist = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  client.get(token, (err, reply) => {
      if (err) throw err;

      if (reply === 'blacklisted') {
          return res.status(401).json({
              message: 'Token is invalidated. Please log in again.',
          });
      }

      next();
  });
};
*/
function checkBlacklist(req, res, next) {
  console.log('Request Headers:', req.headers); // Log all headers
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid or missing token' });
  }

  const token = authHeader.replace('Bearer ', '');

  if (blacklist.includes(token)) {
      return res.status(401).json({ message: 'Token is blacklisted' });
  }

  next();
}

module.exports = { authenticate, authorize,checkBlacklist };