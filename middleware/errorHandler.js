const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Default error response
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';
  
    // Customize error response for specific error types
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: err.errors });
    }
  
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // Generic error response
    res.status(statusCode).json({ message });
  };
  
  module.exports = errorHandler;