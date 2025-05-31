import React, { useState } from 'react';
import { Search, Globe } from 'lucide-react';
import { getWhoisData } from './services/api';
import DomainInfoTable from './components/DomainInfoTable';
import ContactInfoTable from './components/ContactInfoTable';
import ErrorAlert from './components/ErrorAlert';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [domain, setDomain] = useState('');
  const [lookupType, setLookupType] = useState<'domain' | 'contact'>('domain');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const validateDomain = (domain: string): boolean => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }

    if (!validateDomain(domain.trim())) {
      setError('Please enter a valid domain name (e.g., amazon.com)');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);
    setHasSearched(true);

    try {
      const result = await getWhoisData(domain.trim().toLowerCase(), lookupType);
      
      if (result.status === 'success') {
        setData(result.data);
      } else {
        setError(result.message || 'Failed to fetch domain information');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
    if (error) setError(null);
  };

  const handleTypeChange = (type: 'domain' | 'contact') => {
    setLookupType(type);
    if (data) {
      // Clear data when switching types to force new lookup
      setData(null);
      setHasSearched(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Globe className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">WHOIS Lookup</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get comprehensive domain information and contact details for any domain name
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Domain Input */}
              <div>
                <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                  Domain Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="domain"
                    value={domain}
                    onChange={handleDomainChange}
                    placeholder="Enter domain name (e.g., amazon.com)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Lookup Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Information Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('domain')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      lookupType === 'domain'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">Domain Information</div>
                    <div className="text-sm opacity-75 mt-1">
                      Registrar, dates, age, name servers
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('contact')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      lookupType === 'contact'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">Contact Information</div>
                    <div className="text-sm opacity-75 mt-1">
                      Registrant, technical, administrative contacts
                    </div>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Looking up...' : 'Lookup Domain'}
              </button>
            </form>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-4xl mx-auto">
          {error && (
            <ErrorAlert 
              message={error} 
              onClose={() => setError(null)} 
            />
          )}

          {loading && <LoadingSpinner />}

          {data && !loading && (
            <div className="animate-fadeIn">
              {lookupType === 'domain' ? (
                <DomainInfoTable data={data} />
              ) : (
                <ContactInfoTable data={data} />
              )}
            </div>
          )}

          {hasSearched && !loading && !data && !error && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                No data found for the specified domain and information type.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>Powered by WhoisXMLAPI • Built with React & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}

export default App;
