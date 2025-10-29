import React, { useState } from 'react';

interface VPN {
  id: string;
  name: string;
  rating: number;
  price: { display: string };
  features: {
    servers: string;
    countries: number;
    devices: string;
    killSwitch: boolean;
    splitTunneling: boolean;
    tor: boolean;
  };
  affiliateLink: string;
}

interface ComparisonTableProps {
  vpns: VPN[];
}

export default function ComparisonTable({ vpns }: ComparisonTableProps) {
  const [selectedVPNs, setSelectedVPNs] = useState(vpns.slice(0, 3));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
            <th className="px-6 py-4 text-left text-white font-bold">Feature</th>
            {selectedVPNs.map((vpn) => (
              <th key={vpn.id} className="px-6 py-4 text-center text-white font-bold">
                {vpn.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="px-6 py-4 font-medium text-gray-900">Rating</td>
            {selectedVPNs.map((vpn) => (
              <td key={vpn.id} className="px-6 py-4 text-center">
                <div className="flex justify-center items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(vpn.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">{vpn.rating}/5</span>
              </td>
            ))}
          </tr>
          
          <tr className="border-b border-gray-200 bg-gray-50">
            <td className="px-6 py-4 font-medium text-gray-900">Price</td>
            {selectedVPNs.map((vpn) => (
              <td key={vpn.id} className="px-6 py-4 text-center">
                <span className="text-xl font-bold text-blue-600">{vpn.price.display}</span>
              </td>
            ))}
          </tr>

          <tr className="border-b border-gray-200">
            <td className="px-6 py-4 font-medium text-gray-900">Servers</td>
            {selectedVPNs.map((vpn) => (
              <td key={vpn.id} className="px-6 py-4 text-center text-gray-700">
                {vpn.features.servers}
              </td>
            ))}
          </tr>

          <tr className="border-b border-gray-200 bg-gray-50">
            <td className="px-6 py-4 font-medium text-gray-900">Countries</td>
            {selectedVPNs.map((vpn) => (
              <td key={vpn.id} className="px-6 py-4 text-center text-gray-700">
                {vpn.features.countries}
              </td>
            ))}
          </tr>

          <tr className="border-b border-gray-200">
            <td className="px-6 py-4 font-medium text-gray-900">Devices</td>
            {selectedVPNs.map((vpn) => (
              <td key={vpn.id} className="px-6 py-4 text-center text-gray-700">
                {vpn.features.devices}
              </td>
            ))}
          </tr>

          <tr className="border-b border-gray-200 bg-gray-50">
            <td className="px-6 py-4 font-medium text-gray-900">Kill Switch</td>
            {selectedVPNs.map((vpn) => (
              <td key={vpn.id} className="px-6 py-4 text-center">
                {vpn.features.killSwitch ? (
                  <span className="text-green-600 font-bold">✓</span>
                ) : (
                  <span className="text-red-600 font-bold">✗</span>
                )}
              </td>
            ))}
          </tr>

          <tr className="border-b border-gray-200">
            <td className="px-6 py-4 font-medium text-gray-900">Split Tunneling</td>
            {selectedVPNs.map((vpn) => (
              <td key={vpn.id} className="px-6 py-4 text-center">
                {vpn.features.splitTunneling ? (
                  <span className="text-green-600 font-bold">✓</span>
                ) : (
                  <span className="text-red-600 font-bold">✗</span>
                )}
              </td>
            ))}
          </tr>

          <tr className="bg-gray-50">
            <td className="px-6 py-4 font-medium text-gray-900">Tor Support</td>
            {selectedVPNs.map((vpn) => (
              <td key={vpn.id} className="px-6 py-4 text-center">
                {vpn.features.tor ? (
                  <span className="text-green-600 font-bold">✓</span>
                ) : (
                  <span className="text-red-600 font-bold">✗</span>
                )}
              </td>
            ))}
          </tr>

          <tr className="bg-blue-50">
            <td className="px-6 py-4"></td>
            {selectedVPNs.map((vpn) => (
              <td key={vpn.id} className="px-6 py-4 text-center">
                <a
                  href={vpn.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Get {vpn.name}
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
