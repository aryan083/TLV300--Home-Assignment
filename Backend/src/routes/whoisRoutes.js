/**
 * Routes for WHOIS API endpoints
 * @module routes/whoisRoutes
 */

const express = require('express');
const { query } = require('express-validator');
const { getWhoisInfo } = require('../controllers/whoisController');

const router = express.Router();

/**
 * @route GET /api/whois
 * @description Get WHOIS information for a domain
 * @param {string} domain - Domain name to lookup
 * @param {string} type - Type of information to retrieve (domain/contact)
 * @returns {Object} WHOIS information
 */
router.get('/whois', [
  query('domain')
    .trim()
    .notEmpty()
    .withMessage('Domain name is required')
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)
    .withMessage('Invalid domain name format'),
  query('type')
    .trim()
    .notEmpty()
    .withMessage('Type is required')
    .isIn(['domain', 'contact'])
    .withMessage('Type must be either "domain" or "contact"')
], getWhoisInfo);

module.exports = router;
