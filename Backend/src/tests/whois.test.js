/**
 * Tests for WHOIS API endpoints
 * @module tests/whois
 */

const request = require('supertest');
const app = require('../app');

describe('WHOIS API Endpoints', () => {
  describe('GET /api/whois', () => {
    it('should return domain information for valid domain request', async () => {
      const response = await request(app)
        .get('/api/whois')
        .query({
          domain: 'example.com',
          type: 'domain'
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('domainName');
      expect(response.body.data).toHaveProperty('registrarName');
      expect(response.body.data).toHaveProperty('registrationDate');
      expect(response.body.data).toHaveProperty('expirationDate');
      expect(response.body.data).toHaveProperty('estimatedDomainAge');
      expect(response.body.data).toHaveProperty('hostnames');
    });

    it('should return contact information for valid contact request', async () => {
      const response = await request(app)
        .get('/api/whois')
        .query({
          domain: 'example.com',
          type: 'contact'
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('domainName');
      expect(response.body.data).toHaveProperty('registrantName');
      expect(response.body.data).toHaveProperty('technicalContactName');
      expect(response.body.data).toHaveProperty('administrativeContactName');
      expect(response.body.data).toHaveProperty('contactEmail');
    });

    it('should return 400 for invalid domain name', async () => {
      const response = await request(app)
        .get('/api/whois')
        .query({
          domain: 'invalid-domain',
          type: 'domain'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });

    it('should return 400 for invalid type', async () => {
      const response = await request(app)
        .get('/api/whois')
        .query({
          domain: 'example.com',
          type: 'invalid'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });
  });
});
