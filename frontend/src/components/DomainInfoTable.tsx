import React from 'react';

interface DomainInfoData {
  domainName: string;
  registrarName: string;
  registrationDate: string;
  expirationDate: string;
  estimatedDomainAge: string;
  hostnames: string;
}

interface DomainInfoTableProps {
  data: DomainInfoData;
}

const DomainInfoTable: React.FC<DomainInfoTableProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Domain Information</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                Domain Name
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {data.domainName || 'N/A'}
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                Registrar
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {data.registrarName || 'N/A'}
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                Registration Date
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatDate(data.registrationDate)}
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                Expiration Date
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatDate(data.expirationDate)}
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                Estimated Domain Age
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {data.estimatedDomainAge || 'N/A'}
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50">
                Hostnames
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 break-words">
                {data.hostnames || 'N/A'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DomainInfoTable;