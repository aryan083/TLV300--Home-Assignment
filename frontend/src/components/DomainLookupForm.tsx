  import React, { useState, useEffect } from 'react';
  import { Search, Globe, User, Loader } from 'lucide-react';
  import { whoisApi } from '../services/api';

  interface DomainLookupFormProps {
    domain: string;
    infoType: string;
    onDomainChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInfoTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    loading: boolean;
    error: string | null;
  }

  const DomainLookupForm: React.FC<DomainLookupFormProps> = ({
    domain,
    infoType,
    onDomainChange,
    onInfoTypeChange,
    onSubmit,
    loading,
    error
  }) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        onSubmit();
      }
    };

    const [isBackendHealthy, setIsBackendHealthy] = useState<boolean | null>(null);

    useEffect(() => {
      // Check backend health on component mount
      const checkBackendHealth = async () => {
        const healthy = await whoisApi.healthCheck();
        setIsBackendHealthy(healthy);
      };

      checkBackendHealth();
    }, []);

    // Show backend status in development
    const showBackendStatus = process.env.NODE_ENV === 'development';

    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
        {showBackendStatus && (
          <div className={`mb-4 p-2 rounded text-sm ${
            isBackendHealthy === null 
              ? 'bg-yellow-100 text-yellow-800' 
              : isBackendHealthy 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            Backend Status: {
              isBackendHealthy === null 
                ? 'Checking...' 
                : isBackendHealthy 
                  ? 'Connected' 
                  : 'Disconnected'
            }
          </div>
        )}

        {/* Domain Input Section */}
        <div className="mb-8">
          <label htmlFor="domainName" className="block text-lg font-semibold text-gray-800 mb-3">
            Domain Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="domainName"
              type="text"
              value={domain}
              onChange={onDomainChange}
              onKeyPress={handleKeyPress}
              placeholder="e.g., example.com"
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 outline-none"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Enter a valid domain name (e.g., amazon.com, google.com)
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {error}
            </p>
          )}
        </div>

        {/* Information Type Selection */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            Information Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                infoType === 'domain'
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="infoType"
                value="domain"
                checked={infoType === 'domain'}
                onChange={onInfoTypeChange}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className={`w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center ${
                  infoType === 'domain' ? 'border-blue-500' : 'border-gray-300'
                }`}>
                  {infoType === 'domain' && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <Globe className={`h-5 w-5 mr-2 ${
                  infoType === 'domain' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <div>
                  <div className={`font-medium ${
                    infoType === 'domain' ? 'text-blue-900' : 'text-gray-700'
                  }`}>
                    Domain Information
                  </div>
                  <div className="text-sm text-gray-500">
                    Registrar, dates, age, servers
                  </div>
                </div>
              </div>
            </label>

            <label
              className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                infoType === 'contact'
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="infoType"
                value="contact"
                checked={infoType === 'contact'}
                onChange={onInfoTypeChange}
                className="sr-only"
              />
              <div className="flex items-center">
                <div className={`w-5 h-5 border-2 rounded-full mr-3 flex items-center justify-center ${
                  infoType === 'contact' ? 'border-blue-500' : 'border-gray-300'
                }`}>
                  {infoType === 'contact' && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <User className={`h-5 w-5 mr-2 ${
                  infoType === 'contact' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <div>
                  <div className={`font-medium ${
                    infoType === 'contact' ? 'text-blue-900' : 'text-gray-700'
                  }`}>
                    Contact Information
                  </div>
                  <div className="text-sm text-gray-500">
                    Names, emails, contacts
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={loading}
          className={`w-full py-4 px-6 text-lg font-semibold rounded-xl transition-all duration-200 flex items-center justify-center ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
          } text-white`}
        >
          {loading ? (
            <>
              <Loader className="animate-spin h-5 w-5 mr-2" />
              <span>Looking up domain...</span>
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              <span>Lookup Domain</span>
            </>
          )}
        </button>
      </div>
    );
  };

  export default DomainLookupForm;
