# VPN Logo Images

This directory should contain logo files for all VPNs featured on the site.

## Required Logo Files

You need to add the following logo files (SVG or PNG format):

- `nordvpn.svg` (or .png)
- `mullvad.svg`
- `ivpn.svg`
- `protonvpn.svg`
- `airvpn.svg`
- `windscribe.svg`
- `ovpn.svg`
- `azirevpn.svg`
- `torguard.svg`

## How to Get Logo Files

### Option 1: Manual Download (Recommended)
1. Visit each VPN's website press kit or media page:
   - NordVPN: https://nordvpn.com/press/
   - Mullvad: https://mullvad.net/en/press
   - ProtonVPN: https://protonvpn.com/press
   - IVPN: https://www.ivpn.net/presskit/
   - Windscribe: https://windscribe.com/
   - Others: Google "[VPN name] press kit" or "[VPN name] logo"

2. Download the logo (preferably SVG for scalability)
3. Rename to match the exact filename above (e.g., `nordvpn.svg`)
4. Place in this directory

### Option 2: Use Logo API Services

You can dynamically fetch logos using services like:

**Clearbit Logo API** (Free):
```
https://logo.clearbit.com/nordvpn.com
```

**Logo.dev** (Free tier):
```
https://img.logo.dev/nordvpn.com?token=YOUR_TOKEN
```

To use an API, update `src/data/vpns.json` logo paths:
```json
"logo": "https://logo.clearbit.com/nordvpn.com"
```

### Option 3: Create Simple Placeholder Images

If you don't have logos yet, the site will automatically show gradient badges with the first letter of the VPN name. This looks clean and professional until you get real logos.

## Image Specifications

- **Format**: SVG preferred (scalable), PNG acceptable
- **Size**: 200x200px minimum for PNG
- **Background**: Transparent
- **Colors**: Full color (not monochrome)

## Fallback Behavior

The `VPNCard` component has built-in fallback:
- If logo file exists → Shows logo
- If logo file missing → Shows gradient badge with first letter
- On error loading → Falls back to gradient badge

So the site works fine even without logo files!
