# Affiliate Program IDs & APIs

## Current Affiliate IDs

### NordVPN
- **Affiliate ID:** 134282
- **API Available:** Yes
- **Network:** Nord Security affiliate program
- **Commission:** ~$30/sale
- **API Docs:** https://affiliates.nordvpn.com/api-docs

### ProtonVPN
- **Network:** Impact.com or Direct
- **Commission:** $10-20/sale
- **Note:** Check Impact.com marketplace for ProtonVPN program

### Windscribe
- **Network:** Impact.com
- **Program ID:** TBD
- **Commission:** $15-25/sale

### TorGuard
- **Network:** Direct affiliate program
- **Website:** https://torguard.net/aff.php
- **Commission:** ~$20/sale

### Mullvad / IVPN / AirVPN
- **Note:** These pay lower commissions (~€3-5/sale) but have highest trust
- **No API:** Manual link updates only

## API Integration Plan

### Priority 1: NordVPN API
- Use affiliate ID 134282
- Fetch live pricing, features, special offers
- Update automatically via build-time data fetching

### Priority 2: Impact.com
- Single API for multiple VPNs (Windscribe, potentially ProtonVPN)
- Consolidated tracking and reporting

## Updating Links

To update affiliate links in bulk:

```bash
# Update NordVPN links
sed -i 's|nordvpn.com/?aff=YOUR_AFFILIATE_ID|nordvpn.com/?aff=134282|g' src/data/vpns.json

# Or use the dynamic data API (see src/lib/vpnData.ts)
```

## Testing Affiliate Links

Before going live:
1. Click each affiliate link
2. Verify affiliate tracking cookie is set
3. Test conversion tracking in GTM
4. Check affiliate dashboard for tracked clicks

## Revenue Tracking

Monitor in:
- Google Tag Manager (affiliate_click events)
- Individual affiliate dashboards
- Consolidate in spreadsheet for monthly reporting
