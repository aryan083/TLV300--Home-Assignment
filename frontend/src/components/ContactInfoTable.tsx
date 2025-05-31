import React from 'react';

interface ContactInfoData {
  domainName: string;
  registrantName: string;
  technicalContactName: string;
  administrativeContactName: string;
  contactEmail: string;
}

interface ContactInfoTableProps {
  data: ContactInfoData;
}

const ContactInfoTable: React.FC<ContactInfoTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Contact Information</h2>
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
                Registrant Name
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {data.registrantName || 'N/A'}
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                Technical Contact Name
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {data.technicalContactName || 'N/A'}
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                Administrative Contact Name
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {data.administrativeContactName || 'N/A'}
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                Contact Email
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {data.contactEmail || 'N/A'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactInfoTable;