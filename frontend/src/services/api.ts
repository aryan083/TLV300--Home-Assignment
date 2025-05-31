  // Frontend API service for communicating with the backend
  // This would normally connect to your Express backend at localhost:5000

  interface WhoisResponse {
    status: 'success' | 'error';
    data?: any;
    message?: string;
  }

  export async function getWhoisData(domain: string, type: string): Promise<WhoisResponse> {
    try {
      const API_URL = import.meta.env.VITE_APP_API_URL ||'http://localhost:5000/api/whois';
    
      const response = await fetch(`${API_URL}?domain=${encodeURIComponent(domain)}&type=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch WHOIS data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Network error occurred'
      };
    }
  }

  /* 
  Real implementation would look like this:

  export async function getWhoisData(domain: string, type: string): Promise<WhoisResponse> {
    try {
      const response = await fetch(`/api/whois?domain=${domain}&type=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { 
          status: 'error', 
          message: errorData.message || 'Server error occurred' 
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Network error:', error);
      return { 
        status: 'error', 
        message: 'Network error. Please try again later.' 
      };
    }
  }
  */
