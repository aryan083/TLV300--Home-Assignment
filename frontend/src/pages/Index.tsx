
import React, { useState } from 'react';
import DomainLookupForm from '../components/DomainLookupForm';
import ResultTable from '../components/ResultTable';
import ErrorAlert from '../components/ErrorAlert';
import { getWhoisData } from '../services/api';

const Index = () => {
  const [domain, setDomain] = useState('');
  const [infoType, setInfoType] = useState('domain');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultData, setResultData] = useState(null);

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
    if (error) setError(null); // Clear error when user starts typing
  };

  const handleInfoTypeChange = (e) => {
    setInfoType(e.target.value);
  };

  const handleSubmit = async () => {
    // Frontend validation - domain regex
    const domainRegex = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    if (!domain || !domainRegex.test(domain)) {
      setError("Please enter a valid domain name.");
      return;
    }

    setLoading(true);
    setError(null);
    setResultData(null);

    try {
      const response = await getWhoisData(domain, infoType);
      
      if (response.status === 'success') {
        setResultData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Unable to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            WHOIS Lookup Tool
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover comprehensive domain information and contact details for any website. 
            Get registration dates, expiration info, registrar details, and more.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <DomainLookupForm
            domain={domain}
            infoType={infoType}
            onDomainChange={handleDomainChange}
            onInfoTypeChange={handleInfoTypeChange}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />

          {/* Error Display */}
          {error && !loading && (
            <div className="mt-8">
              <ErrorAlert message={error} />
            </div>
          )}

          {/* Results Display */}
          {resultData && !loading && (
            <div className="mt-8">
              <ResultTable data={resultData} type={infoType} />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500">
          <p>Powered by WhoisXMLAPI • Built with React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
