/**
 * Dynamic VPN Data Fetcher
 *
 * This module fetches VPN data from external sources at build time.
 * Data is automatically updated when the site rebuilds.
 *
 * To enable automatic updates:
 * 1. Set up a Cloudflare Pages Deploy Hook
 * 2. Create a Cloudflare Worker or external cron job to trigger it daily
 * 3. Or use GitHub Actions to trigger rebuilds
 */

import vpnsData from '../data/vpns.json';

// Type definitions
export interface VPN {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  logo: string;
  affiliateLink: string;
  price: {
    monthly: number;
    annual: number;
    display: string;
  };
  pros: string[];
  cons: string[];
  features: {
    servers: string;
    countries: number;
    devices: string;
    protocols: string[];
    encryption: string;
    killSwitch: boolean;
    splitTunneling: boolean;
    tor: boolean;
  };
  bestFor: string[];
  commission: number;
  description: string;
}

interface VPNData {
  vpns: VPN[];
  lastUpdated?: string;
}

/**
 * Fetch VPN data from external API
 * Replace this with your actual API endpoint
 */
async function fetchFromAPI(): Promise<VPNData | null> {
  try {
    // Example: Fetch from your custom API
    // const response = await fetch('https://api.yoursite.com/vpns');
    // const data = await response.json();
    // return data;

    // For now, return null to use static data
    return null;
  } catch (error) {
    console.error('Error fetching VPN data from API:', error);
    return null;
  }
}

/**
 * Fetch pricing data from affiliate networks
 * Many VPN affiliate programs provide API access
 */
async function fetchPricingUpdates(): Promise<Record<string, any>> {
  try {
    // Example: ExpressVPN affiliate API
    // const response = await fetch('https://affiliate-api.expressvpn.com/pricing', {
    //   headers: { 'Authorization': `Bearer ${process.env.EXPRESSVPN_API_KEY}` }
    // });

    // Example: Impact.com API (many VPNs use this network)
    // const response = await fetch('https://api.impact.com/...');

    return {};
  } catch (error) {
    console.error('Error fetching pricing updates:', error);
    return {};
  }
}

/**
 * Fetch latest ratings from review aggregators
 */
async function fetchRatings(): Promise<Record<string, number>> {
  try {
    // You could scrape or use APIs from:
    // - Trustpilot API
    // - Your own database
    // - Review aggregation services

    return {};
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return {};
  }
}

/**
 * Main function to get VPN data with dynamic updates
 */
export async function getVPNData(): Promise<VPNData> {
  // Try to fetch from external API first
  const apiData = await fetchFromAPI();
  if (apiData) {
    return {
      ...apiData,
      lastUpdated: new Date().toISOString(),
    };
  }

  // Fallback to static data with potential updates
  const pricingUpdates = await fetchPricingUpdates();
  const ratingUpdates = await fetchRatings();

  // Merge updates into static data
  const vpns = vpnsData.vpns.map((vpn) => ({
    ...vpn,
    // Apply pricing updates if available
    ...(pricingUpdates[vpn.id] && {
      price: {
        ...vpn.price,
        ...pricingUpdates[vpn.id],
      },
    }),
    // Apply rating updates if available
    ...(ratingUpdates[vpn.id] && {
      rating: ratingUpdates[vpn.id],
    }),
  }));

  return {
    vpns,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Get VPNs filtered by category
 */
export async function getVPNsByCategory(category: string): Promise<VPN[]> {
  const data = await getVPNData();
  return data.vpns.filter((vpn) => vpn.bestFor.includes(category));
}

/**
 * Get single VPN by ID
 */
export async function getVPNById(id: string): Promise<VPN | undefined> {
  const data = await getVPNData();
  return data.vpns.find((vpn) => vpn.id === id);
}

/**
 * Get top N VPNs by rating
 */
export async function getTopVPNs(limit: number = 5): Promise<VPN[]> {
  const data = await getVPNData();
  return data.vpns
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Export static data as fallback
export { vpnsData };
