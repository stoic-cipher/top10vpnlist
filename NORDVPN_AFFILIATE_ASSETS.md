# NordVPN Affiliate Assets Guide

## Affiliate Program Details

- **Affiliate ID:** 134282
- **Offer Link:** https://affiliates.nordvpn.com/publisher/#!/offer/488
- **Current Link:** `https://nordvpn.com/?aff=134282`

## Assets You Have Access To

Based on NordVPN's affiliate program, you should have access to:

### 1. Logo Variations
✅ **Already Using:** Official NordVPN logo (nordvpn.svg)

**Other variations available:**
- Horizontal lockup
- Vertical lockup
- Icon-only version
- Light/dark versions
- Different file formats (SVG, PNG, EPS)

**Where to use:**
- Current logo is perfect for VPN cards
- Consider icon-only for smaller spaces
- White version for dark backgrounds (if you add dark mode)

### 2. Banners & Display Ads

Common sizes in affiliate kits:
- 728x90 (Leaderboard)
- 300x250 (Medium Rectangle)
- 160x600 (Wide Skyscraper)
- 320x50 (Mobile Banner)

**Where to use:**
- Sidebar widgets (if you add sidebars)
- In-content promotions
- Footer promotional area
- Blog post headers

### 3. Product Screenshots

Screenshots usually include:
- App interfaces (Windows, Mac, iOS, Android)
- Server selection screens
- Connection dashboards
- Feature demonstrations

**Where to use:**
- NordVPN review page (add gallery)
- "How to use NordVPN" tutorial
- Feature comparison sections
- Visual proof of functionality

### 4. Promotional Copy & Claims

Affiliate kits typically provide:
- Pre-approved marketing claims
- Feature bullet points
- Updated pricing (important!)
- Current promotions/discounts
- Coupon codes

**Where to use:**
- Review page descriptions
- Homepage hero section
- Comparison tables
- CTA buttons ("Get NordVPN 65% Off")

### 5. Video Assets

May include:
- Product demos
- Explainer videos
- Testimonial clips
- YouTube embed codes

**Where to use:**
- Embed on NordVPN review page
- Homepage video section
- Educational content pages

## Recommended Updates

### Priority 1: Update Affiliate Link with Current Offer

Check if there's a specific offer ID you should be using:

Current link:
```
https://nordvpn.com/?aff=134282
```

Possible improved links (check your affiliate dashboard):
```
https://nordvpn.com/?aff=134282&offer=488
https://go.nordvpn.net/aff_c?offer_id=488&aff_id=134282
```

**Where to update:** `src/data/vpns.json` → `nordvpn.affiliateLink`

### Priority 2: Add Current Pricing & Promotions

Check your affiliate dashboard for:
- Current discount percentage (often 65-70% off)
- Exact pricing (usually $3.39/mo for 2-year plan)
- Promo code (if any)
- Expiration date

**Where to update:**
- `src/data/vpns.json` → `price` object
- Homepage hero: "NordVPN: Get 65% Off + 3 Months Free"
- Review page: Add promo banner at top

### Priority 3: Add Official Product Screenshots

**Recommended additions to NordVPN review page:**

1. **App Interface Gallery**
   - Windows app screenshot
   - macOS app screenshot
   - Mobile app screenshot
   - Server selection screen

2. **Feature Demonstrations**
   - Threat Protection in action
   - Double VPN setup
   - Kill switch settings
   - Speed test results

**Implementation:**
```astro
<!-- In /reviews/nordvpn page -->
<section class="my-12">
  <h2>NordVPN Interface</h2>
  <div class="grid md:grid-cols-2 gap-4">
    <img src="/images/nordvpn/app-windows.png" alt="NordVPN Windows App" />
    <img src="/images/nordvpn/app-mobile.png" alt="NordVPN Mobile App" />
  </div>
</section>
```

### Priority 4: Add Promotional Banners

**Homepage Hero Enhancement:**
```astro
<div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
  <div class="flex items-center gap-4">
    <img src="/images/vpn-logos/nordvpn.svg" class="h-16 w-16" />
    <div>
      <p class="text-sm uppercase tracking-wide opacity-90">Limited Time Offer</p>
      <h3 class="text-3xl font-bold">NordVPN: 65% Off + 3 Months Free</h3>
      <p class="mt-2 opacity-90">Get the #1 VPN for just $3.39/month</p>
    </div>
  </div>
  <a href="https://nordvpn.com/?aff=134282"
     class="mt-4 inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-bold">
    Claim Deal Now →
  </a>
</div>
```

### Priority 5: Create Dedicated NordVPN Review Page

The review page should be comprehensive:

**Sections to add:**
1. ✅ Pros & Cons (already have)
2. ✅ Features table (already have)
3. ⏸️ **Speed test results** (add real data)
4. ⏸️ **Screenshot gallery** (use official images)
5. ⏸️ **Video review** (if Nord provides one)
6. ⏸️ **How to set up** (step-by-step tutorial)
7. ⏸️ **Comparison with alternatives** (Nord vs Mullvad, Nord vs ProtonVPN)
8. ⏸️ **FAQ section** (specific to NordVPN)
9. ⏸️ **Pricing breakdown** (monthly vs annual savings calculator)
10. ⏸️ **Current promotions** (highlighted banner)

## Asset Organization

Create directory structure for Nord's assets:

```
public/images/nordvpn/
├── logo-horizontal.svg (if different from current)
├── logo-icon.svg
├── logo-white.svg
├── app-windows.png
├── app-macos.png
├── app-ios.png
├── app-android.png
├── feature-threat-protection.png
├── feature-double-vpn.png
├── feature-meshnet.png
├── server-map.png
├── speed-test.png
└── banners/
    ├── 728x90.png
    ├── 300x250.png
    └── 320x50.png
```

## Compliance & Legal

**Important from Nord's affiliate terms:**

1. ✅ **DO:**
   - Use official logos and assets
   - Disclose affiliate relationship (you already do this!)
   - Keep pricing and features accurate
   - Link to official NordVPN site
   - Highlight genuine pros and cons

2. ❌ **DON'T:**
   - Modify logos or brand colors
   - Make false claims about features
   - Promise specific speeds
   - Use trademarked terms improperly
   - Create fake reviews or testimonials

3. **Disclosure Examples:**

Current (good):
> "We earn commissions when you purchase VPNs through our links."

Enhanced version:
> "This site contains affiliate links. When you purchase NordVPN through our links, we earn a commission at no extra cost to you. This helps us maintain the site and continue providing honest reviews. We only recommend products we've tested and genuinely believe in."

## Tracking & Optimization

### UTM Parameters

Add tracking to your affiliate links to see which pages convert best:

```
https://nordvpn.com/?aff=134282&utm_source=top10vpnlist&utm_medium=review&utm_campaign=homepage
https://nordvpn.com/?aff=134282&utm_source=top10vpnlist&utm_medium=review&utm_campaign=nordvpn-review
https://nordvpn.com/?aff=134282&utm_source=top10vpnlist&utm_medium=comparison&utm_campaign=compare-page
```

### Conversion Tracking

In GTM, track clicks with:

```javascript
// Track affiliate clicks
dataLayer.push({
  'event': 'affiliate_click',
  'vpn_name': 'NordVPN',
  'click_location': 'homepage_hero',
  'offer_type': '65_percent_off'
});
```

## Quick Wins (Do These Now)

### 1. Update Pricing (2 minutes)
Check current Nord pricing and update `src/data/vpns.json`

### 2. Add Promo Banner to Homepage (5 minutes)
Feature Nord's current deal prominently

### 3. Create `/deals/nordvpn` Page (10 minutes)
Dedicated landing page for Nord promotions:
- Headline: "NordVPN Deal: 65% Off + 3 Months Free"
- Countdown timer (if deal expires)
- Feature highlights
- Multiple CTAs
- FAQ about the deal

### 4. Add Screenshots to Review Page (15 minutes)
Place official Nord screenshots in `/reviews/nordvpn`

### 5. Update Meta Descriptions (5 minutes)
Include current promotion in meta descriptions:
```astro
<meta name="description" content="NordVPN review 2025: Get 65% off the #1 VPN. Speed tests, security analysis, and exclusive discount. Independently tested and verified." />
```

## Assets Checklist

From your Nord affiliate Google Drive, grab:

- [ ] Official logo (all variations)
- [ ] App screenshots (Windows, Mac, iOS, Android)
- [ ] Feature screenshots (Threat Protection, Double VPN, etc.)
- [ ] Display banners (various sizes)
- [ ] Promotional copy (approved claims)
- [ ] Current pricing information
- [ ] Video assets (if available)
- [ ] Press kit (case studies, testimonials)
- [ ] Brand guidelines (colors, fonts, usage rules)

## Next Steps

1. **Download all assets** from Nord's Google Drive
2. **Organize into** `/public/images/nordvpn/` directory
3. **Update pricing** in vpns.json with current offer
4. **Add screenshots** to NordVPN review page
5. **Create promotional banners** for homepage
6. **Set up conversion tracking** in GTM
7. **Build and deploy** updated site

---

**Need help implementing any of these?** Let me know which assets you have and I'll help integrate them!
