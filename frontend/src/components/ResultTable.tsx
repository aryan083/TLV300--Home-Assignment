
import React from 'react';
import { Calendar, Server, User, Mail, Building, Clock } from 'lucide-react';

interface ResultTableProps {
  data: {
    domainName?: string;
    registrarName?: string;
    registrationDate?: string;
    expirationDate?: string;
    estimatedDomainAge?: string;
    hostnames?: string;
    registrantName?: string;
    technicalContactName?: string;
    administrativeContactName?: string;
    contactEmail?: string;
  };
  type: string;
}

const ResultTable: React.FC<ResultTableProps> = ({ data, type }) => {
  const formatDate = (dateString: string) => {
    if (dateString === 'N/A' || !dateString) return 'N/A';
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

  const domainFields = [
    {
      label: 'Domain Name',
      value: data.domainName,
      icon: <Server className="h-4 w-4" />,
      color: 'text-blue-600'
    },
    {
      label: 'Registrar Name',
      value: data.registrarName,
      icon: <Building className="h-4 w-4" />,
      color: 'text-green-600'
    },
    {
      label: 'Registration Date',
      value: formatDate(data.registrationDate || ''),
      icon: <Calendar className="h-4 w-4" />,
      color: 'text-purple-600'
    },
    {
      label: 'Expiration Date',
      value: formatDate(data.expirationDate || ''),
      icon: <Calendar className="h-4 w-4" />,
      color: 'text-red-600'
    },
    {
      label: 'Estimated Domain Age',
      value: data.estimatedDomainAge,
      icon: <Clock className="h-4 w-4" />,
      color: 'text-indigo-600'
    },
    {
      label: 'Hostnames',
      value: data.hostnames,
      icon: <Server className="h-4 w-4" />,
      color: 'text-gray-600'
    }
  ];

  const contactFields = [
    {
      label: 'Domain Name',
      value: data.domainName,
      icon: <Server className="h-4 w-4" />,
      color: 'text-blue-600'
    },
    {
      label: 'Registrant Name',
      value: data.registrantName,
      icon: <User className="h-4 w-4" />,
      color: 'text-green-600'
    },
    {
      label: 'Technical Contact Name',
      value: data.technicalContactName,
      icon: <User className="h-4 w-4" />,
      color: 'text-purple-600'
    },
    {
      label: 'Administrative Contact Name',
      value: data.administrativeContactName,
      icon: <User className="h-4 w-4" />,
      color: 'text-indigo-600'
    },
    {
      label: 'Contact Email',
      value: data.contactEmail,
      icon: <Mail className="h-4 w-4" />,
      color: 'text-red-600'
    }
  ];

  const fields = type === 'domain' ? domainFields : contactFields;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">
          {type === 'domain' ? 'Domain Information' : 'Contact Information'}
        </h2>
        <p className="text-blue-100 text-sm">
          WHOIS data for {data.domainName}
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">
                Field
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {fields.map((field, index) => (
              <tr 
                key={index}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                  <div className="flex items-center">
                    <span className={`${field.color} mr-2`}>
                      {field.icon}
                    </span>
                    {field.label}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="font-mono bg-gray-50 px-3 py-2 rounded-lg inline-block max-w-full">
                    {field.value || 'N/A'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
