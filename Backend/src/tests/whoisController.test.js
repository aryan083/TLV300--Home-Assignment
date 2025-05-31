const request = require('supertest');
const app = require('../app');
const { getWhoisData } = require('../services/whoisService');

// Mock the whoisService
jest.mock('../services/whoisService');

describe('WHOIS Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/whois', () => {
    test('should return domain information for valid request', async () => {
      const mockResponse = {
        status: 'success',
        data: {
          domainName: 'example.com',
          registrarName: 'Example Registrar',
          registrationDate: '2020-01-01',
          expirationDate: '2025-01-01',
          estimatedDomainAge: '3 years',
          hostnames: 'ns1.example.com, ns2.example.com'
        }
      };

      getWhoisData.mockResolvedValueOnce(mockResponse);

      const response = await request(app)
        .get('/api/whois')
        .query({
          domain: 'example.com',
          type: 'domain'
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(getWhoisData).toHaveBeenCalledWith('example.com', 'domain');
    });

    test('should return 400 for invalid domain format', async () => {
      const response = await request(app)
        .get('/api/whois')
        .query({
          domain: 'invalid-domain',
          type: 'domain'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Invalid request parameters');
    });

    test('should return 400 for invalid type', async () => {
      const response = await request(app)
        .get('/api/whois')
        .query({
          domain: 'example.com',
          type: 'invalid'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Invalid type parameter. Must be either "domain" or "contact"');
    });

    test('should handle service errors', async () => {
      const errorMessage = 'Service error';
      getWhoisData.mockRejectedValueOnce(new Error(errorMessage));

      const response = await request(app)
        .get('/api/whois')
        .query({
          domain: 'example.com',
          type: 'domain'
        });

      expect(response.status).toBe(500);
      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Internal server error');
    });
  });
});
