/**
 * Global error handling middleware
 * @module middleware/errorHandler
 */

const logger = require('../utils/logger');

/**
 * Error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Handle Axios errors
  if (err.isAxiosError) {
    return res.status(err.response?.status || 500).json({
      status: 'error',
      message: 'Error fetching WHOIS data'
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.message
    });
  }

  // Handle timeout errors
  if (err.code === 'ECONNABORTED') {
    return res.status(408).json({
      status: 'error',
      message: 'Request timeout'
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;