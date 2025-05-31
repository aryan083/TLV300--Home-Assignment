/**
 * Main application file for the WHOIS API backend service
 * @module app
 */

const express = require('express');
const cors = require('cors');
const { query } = require('express-validator');
const { getWhoisInfo } = require('./controllers/whoisController');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();
const logger = require('./utils/logger');
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for both local and production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',           // Local development
      'http://127.0.0.1:3000',          // Alternative local
      'https://your-app-name.vercel.app', // Replace with your Vercel URL
      'https://*.vercel.app',            // All Vercel preview deployments
    ];

    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        const pattern = allowedOrigin.replace('*', '.*');
        return new RegExp(pattern).test(origin);
      }
      return allowedOrigin === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Validation middleware
const validateWhoisRequest = [
  query('domain')
    .notEmpty()
    .withMessage('Domain is required')
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/)
    .withMessage('Invalid domain format'),
  query('type')
    .isIn(['domain', 'contact'])
    .withMessage('Type must be either "domain" or "contact"')
];

// Routes
app.get('/api/whois', validateWhoisRequest, getWhoisInfo);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

module.exports = app;