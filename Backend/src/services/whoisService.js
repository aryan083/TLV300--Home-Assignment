/**
 * Service for handling WHOIS API requests
 * @module services/whoisService
 */

const axios = require('axios');
const logger = require('../utils/logger');

/**
 * Format hostnames string to be truncated if longer than 25 characters
 * @param {string[]} hostnames - Array of hostnames
 * @returns {string} Formatted hostnames string
 */
const formatHostnames = (hostnames) => {
  if (!Array.isArray(hostnames) || hostnames.length === 0) {
    return 'N/A';
  }
  
  const hostnamesStr = hostnames.join(', ');
  return hostnamesStr.length > 25 ? `${hostnamesStr.substring(0, 25)}...` : hostnamesStr;
};

/**
 * Get domain information from WHOIS API
 * @param {string} domain - Domain name to lookup
 * @param {string} type - Type of information to retrieve (domain/contact)
 * @returns {Promise<Object>} Formatted WHOIS data
 * @throws {Error} If API request fails
 */
const getWhoisData = async (domain, type) => {
  try {
    const apiKey = process.env.WHOIS_API_KEY;
    if (!apiKey) {
      throw new Error('WHOIS API key not configured');
    }

    const response = await axios.get('https://www.whoisxmlapi.com/whoisserver/WhoisService', {
      params: {
        apiKey,
        domainName: domain,
        outputFormat: 'JSON'
      }
    });

    const whoisData = response.data;
    
    // Check if we have WhoisRecord data
    if (!whoisData.WhoisRecord) {
      throw new Error('No WHOIS data found for this domain');
    }

    const whoisRecord = whoisData.WhoisRecord;

    if (type === 'domain') {
      return {
        status: 'success',
        data: {
          domainName: whoisRecord.domainName || domain,
          registrarName: whoisRecord.registrarName || 'N/A',
          registrationDate: whoisRecord.createdDate || whoisRecord.createdDateNormalized || 'N/A',
          expirationDate: whoisRecord.expiresDate || whoisRecord.expiresDateNormalized || 'N/A',
          estimatedDomainAge: calculateDomainAge(whoisRecord.createdDate || whoisRecord.createdDateNormalized),
          hostnames: formatHostnames(whoisRecord.nameServers?.hostNames || [])
        }
      };
    } else {
      // Extract contact information from the correct structure
      const registrant = whoisRecord.registrant || {};
      const technicalContact = whoisRecord.technicalContact || {};
      const administrativeContact = whoisRecord.administrativeContact || {};
      
      return {
        status: 'success',
        data: {
          domainName: whoisRecord.domainName || domain,
          registrantName: registrant.name || 'N/A',
          technicalContactName: technicalContact.name || 'N/A',
          administrativeContactName: administrativeContact.name || 'N/A',
          contactEmail: registrant.email || whoisRecord.contactEmail || 'N/A'
        }
      };
    }
  } catch (error) {
    logger.error('WHOIS API Error:', {
      error: error.message,
      domain,
      type
    });
    
    // Handle specific API errors
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        throw new Error('Domain not found');
      } else if (status === 401) {
        throw new Error('Invalid API key');
      } else if (status === 429) {
        throw new Error('API rate limit exceeded');
      }
    }
    
    throw error;
  }
};

/**
 * Calculate domain age from registration date
 * @param {string} registrationDate - Domain registration date
 * @returns {string} Formatted domain age
 */
const calculateDomainAge = (registrationDate) => {
  if (!registrationDate) {
    return 'Unknown';
  }

  try {
    const regDate = new Date(registrationDate);
    const now = new Date();
    const ageInYears = Math.floor((now - regDate) / (1000 * 60 * 60 * 24 * 365));
    
    return `${ageInYears} years`;
  } catch (error) {
    return 'Unknown';
  }
};

module.exports = {
  getWhoisData
};