import React from 'react';

interface VPNCardProps {
  vpn: {
    id: string;
    name: string;
    tagline: string;
    rating: number;
    logo: string;
    affiliateLink: string;
    price: {
      display: string;
    };
    pros: string[];
    features: {
      servers: string;
      countries: number;
      devices: string;
    };
  };
  rank?: number;
  featured?: boolean;
}

export default function VPNCard({ vpn, rank, featured = false }: VPNCardProps) {
  const handleClick = () => {
    // Track affiliate click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        vpn_name: vpn.name,
        vpn_id: vpn.id,
      });
    }
  };

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 hover:shadow-2xl ${
        featured
          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-white shadow-xl scale-105'
          : 'border-gray-200 bg-white hover:border-blue-300'
      }`}
    >
      {rank && rank === 1 && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
          🏆 EDITOR'S CHOICE
        </div>
      )}
      
      {rank && (
        <div className="absolute -left-3 -top-3 bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
          #{rank}
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{vpn.name}</h3>
            <p className="text-blue-600 font-medium">{vpn.tagline}</p>
          </div>
          <div className="ml-4">
            <img src={vpn.logo} alt={`${vpn.name} logo`} className="h-12 w-auto" />
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(vpn.rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-700 font-semibold">{vpn.rating}/5.0</span>
        </div>

        {/* Price */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="text-3xl font-bold text-gray-900">{vpn.price.display}</div>
          <div className="text-sm text-gray-600">with long-term plan</div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{vpn.features.servers}</div>
            <div className="text-xs text-gray-600">Servers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{vpn.features.countries}</div>
            <div className="text-xs text-gray-600">Countries</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{vpn.features.devices}</div>
            <div className="text-xs text-gray-600">Devices</div>
          </div>
        </div>

        {/* Pros */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
          <ul className="space-y-2">
            {vpn.pros.slice(0, 4).map((pro, i) => (
              <li key={i} className="flex items-start text-sm text-gray-700">
                <svg
                  className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {pro}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <a
            href={vpn.affiliateLink}
            onClick={handleClick}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`block w-full text-center py-4 px-6 rounded-xl font-bold transition-all duration-200 ${
              featured
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Get {vpn.name} →
          </a>
          <a
            href={`/reviews/${vpn.id}`}
            className="block w-full text-center py-3 px-6 rounded-xl font-medium border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 transition-colors"
          >
            Read Full Review
          </a>
        </div>
      </div>
    </div>
  );
}
