# Dynamic VPN Data Setup Guide

This guide explains how to set up automatic data updates for prices, ratings, and images.

## Architecture Overview

The site uses **build-time data fetching** with **scheduled rebuilds**:
- Data is fetched from APIs when the site builds
- Cloudflare Pages rebuilds automatically (daily/hourly)
- Fresh data is pulled on each build
- Zero runtime overhead - site stays 100% static

---

## 1. Setup Automatic Rebuilds

### Option A: Cloudflare Pages Deploy Hook (Recommended)

1. **Create Deploy Hook:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Select **top10vpnlist** project
   - Go to **Settings** → **Builds & deployments**
   - Scroll to **Deploy hooks**
   - Click **Add deploy hook**
   - Name: `daily-rebuild`
   - Branch: `main`
   - Copy the webhook URL (e.g., `https://api.cloudflare.com/client/v4/...`)

2. **Schedule Rebuilds with Cloudflare Worker:**

Create a Cloudflare Worker to trigger rebuilds:

```javascript
// worker.js - Deploy this to Cloudflare Workers
export default {
  async scheduled(event, env, ctx) {
    // Trigger Cloudflare Pages rebuild
    await fetch(env.DEPLOY_HOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Add a cron trigger in wrangler.toml:
// [triggers]
// crons = ["0 0 * * *"]  # Daily at midnight UTC
//
// Add environment variable:
// DEPLOY_HOOK_URL = "your-webhook-url"
```

3. **Deploy the Worker:**
```bash
wrangler deploy worker.js --name daily-rebuild
wrangler secret put DEPLOY_HOOK_URL
# Paste your deploy hook URL
```

### Option B: GitHub Actions

Create `.github/workflows/daily-rebuild.yml`:

```yaml
name: Daily Rebuild
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  trigger-rebuild:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Cloudflare Pages Deploy
        run: |
          curl -X POST "${{ secrets.DEPLOY_HOOK_URL }}"
```

Add secret in GitHub: Settings → Secrets → Add `DEPLOY_HOOK_URL`

---

## 2. Configure Data Sources

### A. VPN Affiliate Network APIs

Most VPN companies use these affiliate networks:

#### Impact.com (ExpressVPN, NordVPN, etc.)
```javascript
// In src/lib/vpnData.ts
const response = await fetch('https://api.impact.com/Mediapartners/YOUR_ACCOUNT_SID/Ads', {
  headers: {
    'Authorization': `Basic ${btoa(process.env.IMPACT_API_KEY + ':')}`,
    'Accept': 'application/json'
  }
});
```

#### CJ Affiliate (Commission Junction)
```javascript
const response = await fetch('https://product-search.api.cj.com/v2/product-search', {
  params: {
    'website-id': 'YOUR_WEBSITE_ID',
    'advertiser-ids': 'joined',
    'keywords': 'vpn'
  },
  headers: {
    'Authorization': `Bearer ${process.env.CJ_API_KEY}`
  }
});
```

#### PartnerStack
```javascript
const response = await fetch('https://api.partnerstack.com/api/v2/programs/YOUR_PROGRAM_KEY/deals', {
  headers: {
    'Authorization': `Bearer ${process.env.PARTNERSTACK_API_KEY}`
  }
});
```

### B. Pricing Data Sources

**Option 1: Direct VPN APIs** (if provided by affiliate program)

**Option 2: Web Scraping** (use responsibly, respect robots.txt)
```javascript
import * as cheerio from 'cheerio';

async function scrapePricing(vpnId: string) {
  const urls = {
    expressvpn: 'https://www.expressvpn.com/order',
    nordvpn: 'https://nordvpn.com/pricing',
    // ... etc
  };

  const response = await fetch(urls[vpnId]);
  const html = await response.text();
  const $ = cheerio.load(html);

  // Extract pricing based on site structure
  const price = $('.price').first().text();
  return parsePrice(price);
}
```

**Option 3: Database/CMS**
- Store prices in Airtable, Notion, or Contentful
- Update manually or via automation
- Fetch via their APIs

### C. Rating Data Sources

**Trustpilot API:**
```javascript
const response = await fetch(`https://api.trustpilot.com/v1/business-units/${businessId}/reviews`, {
  headers: {
    'apikey': process.env.TRUSTPILOT_API_KEY
  }
});
```

**Your own database:**
- Track user reviews
- Average ratings
- Update via admin panel

### D. Logo/Image Sources

**Option 1: Clearbit Logo API** (free for non-commercial)
```javascript
const logoUrl = `https://logo.clearbit.com/${domain}`;
// Example: https://logo.clearbit.com/expressvpn.com
```

**Option 2: Store in Cloudflare R2** (S3-compatible)
- Upload logos to R2 bucket
- Serve via public URL
- Update images without rebuilding

**Option 3: Direct from CDN**
```javascript
const logos = {
  expressvpn: 'https://cdn.expressvpn.com/brand/logo.svg',
  nordvpn: 'https://nordvpn.com/wp-content/uploads/logo.svg',
  // etc
};
```

---

## 3. Environment Variables

Add these to Cloudflare Pages:

1. Go to **Settings** → **Environment variables**
2. Add variables:

```bash
# Affiliate Network APIs
IMPACT_API_KEY=your_key_here
CJ_API_KEY=your_key_here
PARTNERSTACK_API_KEY=your_key_here

# Review APIs
TRUSTPILOT_API_KEY=your_key_here

# Custom Data API (if you build one)
VPN_DATA_API_URL=https://api.yoursite.com/vpns
VPN_DATA_API_KEY=your_key_here

# Deploy Hook (for Workers)
DEPLOY_HOOK_URL=your_webhook_url
```

---

## 4. Enable Data Fetching

Update `src/lib/vpnData.ts` to use your APIs:

```typescript
async function fetchFromAPI(): Promise<VPNData | null> {
  // Enable this when you have an API
  if (!process.env.VPN_DATA_API_URL) {
    return null; // Use static data
  }

  const response = await fetch(process.env.VPN_DATA_API_URL, {
    headers: {
      'Authorization': `Bearer ${process.env.VPN_DATA_API_KEY}`
    }
  });

  return await response.json();
}
```

---

## 5. Testing Data Updates

Test locally:

```bash
# Set environment variables
export IMPACT_API_KEY=your_test_key
export VPN_DATA_API_URL=https://api.example.com/vpns

# Run build
npm run build

# Check dist/index.html for updated data
grep -A 5 "price" dist/index.html
```

---

## 6. Monitoring & Logging

Add logging to track data freshness:

```typescript
export async function getVPNData(): Promise<VPNData> {
  const startTime = Date.now();

  try {
    const data = await fetchFromAPI();
    console.log(`✓ VPN data fetched in ${Date.now() - startTime}ms`);
    console.log(`✓ ${data.vpns.length} VPNs loaded`);
    return data;
  } catch (error) {
    console.error('✗ Failed to fetch VPN data:', error);
    return getFallbackData();
  }
}
```

View logs in Cloudflare Pages:
- Go to **Deployments** → Select deployment → **Build logs**

---

## 7. Recommended Update Frequency

- **Prices:** Daily (they don't change often)
- **Ratings:** Weekly (aggregate user reviews)
- **Features/Specs:** Monthly (servers, countries, etc.)
- **Images/Logos:** On demand (upload manually)

---

## Quick Start Checklist

- [ ] Create Cloudflare Pages Deploy Hook
- [ ] Set up daily rebuild (Worker or GitHub Actions)
- [ ] Add affiliate network API keys to environment variables
- [ ] Uncomment API fetching code in `src/lib/vpnData.ts`
- [ ] Test build locally with `npm run build`
- [ ] Verify data updates in production
- [ ] Monitor build logs for errors
- [ ] Set up alerts for failed builds

---

## Pro Tips

1. **Cache API responses** during build to avoid rate limits
2. **Use fallback data** if API fails (graceful degradation)
3. **Version your data** to track changes over time
4. **Add timestamps** to show users when data was last updated
5. **Monitor affiliate link changes** - track clicks in GTM

---

## Example: Complete Integration

Here's a working example for ExpressVPN with Impact.com:

```typescript
// src/lib/integrations/impact.ts
export async function getImpactDeals() {
  const response = await fetch(
    `https://api.impact.com/Mediapartners/${process.env.IMPACT_ACCOUNT_ID}/Ads`,
    {
      headers: {
        'Authorization': `Basic ${btoa(process.env.IMPACT_API_KEY + ':')}`,
        'Accept': 'application/json'
      }
    }
  );

  const data = await response.json();

  return data.Ads.map(ad => ({
    name: ad.AdvertiserName,
    price: extractPrice(ad.TrackingLink),
    affiliateLink: ad.TrackingLink,
    // ... map other fields
  }));
}

function extractPrice(trackingLink: string): number {
  // Parse landing page or use ad metadata
  // Return structured pricing data
}
```

Then use it in `vpnData.ts`:
```typescript
import { getImpactDeals } from './integrations/impact';

export async function getVPNData(): Promise<VPNData> {
  const impactDeals = await getImpactDeals();
  // Merge with static data
  return mergeData(staticData, impactDeals);
}
```

---

## Need Help?

- Check Astro docs: https://docs.astro.build/en/guides/data-fetching/
- Cloudflare Pages Functions: https://developers.cloudflare.com/pages/functions/
- Affiliate network documentation for API access
