const { validationResult } = require('express-validator');
const { getWhoisData } = require('../services/whoisService');
const logger = require('../utils/logger');
const axios = require('axios');

const getWhoisInfo = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid request parameters',
        errors: errors.array()
      });
    }

    const { domain, type } = req.query;

    if (!domain) {
      return res.status(400).json({
        status: 'error',
        message: 'Domain parameter is required'
      });
    }

    if (!['domain', 'contact'].includes(type)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid type parameter. Must be either "domain" or "contact"'
      });
    }

    logger.info('Processing WHOIS request', { domain, type });
    const result = await getWhoisData(domain, type);
    
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Debug endpoint to see raw API response
const debugWhoisResponse = async (req, res, next) => {
  try {
    const { domain } = req.query;
    
    if (!domain) {
      return res.status(400).json({
        status: 'error',
        message: 'Domain parameter is required'
      });
    }

    const apiKey = process.env.WHOIS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        status: 'error',
        message: 'WHOIS API key not configured'
      });
    }

    const response = await axios.get('https://www.whoisxmlapi.com/whoisserver/WhoisService', {
      params: {
        apiKey,
        domainName: domain,
        outputFormat: 'JSON'
      },
      timeout: 15000
    });

    res.json({
      status: 'success',
      rawResponse: response.data
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWhoisInfo,
  debugWhoisResponse
};
