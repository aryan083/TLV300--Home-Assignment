/**
 * Tests for WHOIS service
 * @module tests/whoisService
 */

const axios = require('axios');
const { getWhoisData } = require('../services/whoisService');

// Mock axios
jest.mock('axios');

describe('WHOIS Service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Reset environment variables
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore environment variables
    process.env = originalEnv;
  });

  describe('getWhoisData', () => {
    const mockApiResponse = {
      data: {
        domainName: 'example.com',
        registrarName: 'Example Registrar',
        creationDate: '2020-01-01T00:00:00Z',
        expiryDate: '2025-01-01T00:00:00Z',
        registrant: {
          name: 'John Doe',
          email: 'john@example.com'
        },
        technicalContact: {
          name: 'Tech Support'
        },
        administrativeContact: {
          name: 'Admin'
        },
        nameServers: {
          hostNames: ['ns1.example.com', 'ns2.example.com']
        }
      }
    };

    test('should return domain information when type is domain', async () => {
      axios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await getWhoisData('example.com', 'domain');

      expect(result.status).toBe('success');
      expect(result.data).toEqual({
        domainName: 'example.com',
        registrarName: 'Example Registrar',
        registrationDate: '2020-01-01T00:00:00Z',
        expirationDate: '2025-01-01T00:00:00Z',
        estimatedDomainAge: '5 years',
        hostnames: 'ns1.example.com, ns2.exam...'
      });

      expect(axios.get).toHaveBeenCalledWith(
        'https://www.whoisxmlapi.com/whoisserver/WhoisService',
        {
          params: {
            apiKey: 'test_api_key',
            domainName: 'example.com',
            outputFormat: 'JSON'
          }
        }
      );
    });

    test('should return contact information when type is contact', async () => {
      axios.get.mockResolvedValueOnce(mockApiResponse);

      const result = await getWhoisData('example.com', 'contact');

      expect(result.status).toBe('success');
      expect(result.data).toEqual({
        domainName: 'example.com',
        registrantName: 'John Doe',
        technicalContactName: 'Tech Support',
        administrativeContactName: 'Admin',
        contactEmail: 'john@example.com'
      });
    });

    test('should handle missing API key', async () => {
      delete process.env.WHOIS_API_KEY;

      await expect(getWhoisData('example.com', 'domain')).rejects.toThrow(
        'WHOIS API key not configured'
      );
    });

    test('should handle API error', async () => {
      const errorMessage = 'API request failed';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getWhoisData('example.com', 'domain')).rejects.toThrow(
        errorMessage
      );
    });

    test('should handle missing nameServers', async () => {
      const responseWithoutNameServers = {
        data: {
          ...mockApiResponse.data,
          nameServers: undefined
        }
      };
      axios.get.mockResolvedValueOnce(responseWithoutNameServers);

      const result = await getWhoisData('example.com', 'domain');

      expect(result.status).toBe('success');
      expect(result.data.hostnames).toBe('');
    });

    test('should truncate long hostnames', async () => {
      const responseWithLongHostnames = {
        data: {
          ...mockApiResponse.data,
          nameServers: {
            hostNames: [
              'very-long-hostname-1.example.com',
              'very-long-hostname-2.example.com',
              'very-long-hostname-3.example.com'
            ]
          }
        }
      };
      axios.get.mockResolvedValueOnce(responseWithLongHostnames);

      const result = await getWhoisData('example.com', 'domain');

      expect(result.status).toBe('success');
      expect(result.data.hostnames.length).toBeLessThanOrEqual(28); // 25 chars + '...'
      expect(result.data.hostnames).toMatch(/\.\.\.$/);
    });
  });
});
