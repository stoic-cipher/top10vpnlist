# Project Structure

```
top10vpnlist/
├── src/
│   ├── components/          # React components
│   │   ├── VPNCard.tsx     # Main VPN card with affiliate tracking
│   │   └── ComparisonTable.tsx  # Interactive comparison table
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro # Global layout with nav/footer
│   │
│   ├── pages/              # Routes (auto-generated from files)
│   │   ├── index.astro     # Homepage - Top 5 VPNs
│   │   ├── compare.astro   # Comparison page
│   │   ├── reviews/
│   │   │   └── [slug].astro  # Dynamic: /reviews/expressvpn, /reviews/nordvpn, etc.
│   │   └── best/
│   │       └── [category].astro  # Dynamic: /best/netflix, /best/gaming, etc.
│   │
│   └── data/
│       └── vpns.json       # ⭐ SINGLE SOURCE OF TRUTH - Edit this!
│
├── public/
│   ├── robots.txt          # SEO
│   └── images/             # Add VPN logos here
│
├── package.json            # Dependencies
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # Tailwind CSS config
├── tsconfig.json           # TypeScript config
├── README.md               # Full documentation
├── QUICKSTART.md           # 10-minute setup guide
└── deploy.sh               # One-command deploy script

```

## Key Files to Edit:

### 1. `src/data/vpns.json` (MOST IMPORTANT)
Contains all VPN data:
- Affiliate links (EDIT THESE!)
- Pricing
- Features
- Pros/cons
- Commission rates

**Add more VPNs here and pages auto-generate!**

### 2. `src/layouts/BaseLayout.astro`
Global template for all pages:
- Navigation
- Footer
- Analytics code (add yours here)
- SEO meta tags

### 3. `src/components/VPNCard.tsx`
The money-maker component:
- Displays VPN features
- Affiliate click tracking
- Mobile responsive
- Conversion optimized

## How Pages Work:

### Static Pages:
- `src/pages/index.astro` → `/`
- `src/pages/compare.astro` → `/compare`

### Dynamic Pages (Auto-Generated):
- `src/pages/reviews/[slug].astro` generates:
  - `/reviews/expressvpn`
  - `/reviews/nordvpn`
  - `/reviews/surfshark`
  - etc. (one for each VPN in vpns.json)

- `src/pages/best/[category].astro` generates:
  - `/best/netflix`
  - `/best/torrenting`
  - `/best/gaming`
  - etc. (one for each category in vpns.json)

## Total Pages Generated:
- 1 homepage
- 5 review pages
- 8 category pages
- 1 comparison page
- **= 15+ pages from 5 components!**

## Content Strategy:

### Core Pages (Done ✅):
1. Homepage with top picks
2. Individual reviews
3. Category pages
4. Comparison tool

### Easy Expansions (Just edit JSON):
- Add VPN → auto-generates review page
- Add category → auto-generates category page

### Future Additions (Requires new files):
- Blog: Create `src/pages/blog/[slug].mdx`
- Guides: Create `src/pages/guides/[slug].astro`
- About/Contact: Create `src/pages/about.astro`

## Data Flow:

```
vpns.json
    ↓
[slug].astro reads JSON
    ↓
Passes data to components
    ↓
Components render with data
    ↓
Astro builds static HTML
    ↓
Deploy to Cloudflare Pages
    ↓
💰 Profit
```

## Tech Benefits:

1. **Static HTML** = blazing fast
2. **Component-based** = easy to maintain
3. **Type-safe** = fewer bugs
4. **SEO optimized** = better rankings
5. **Free hosting** = more profit

## Workflow:

### Adding Content:
1. Edit `src/data/vpns.json`
2. Run `npm run dev` to preview
3. Run `npm run build` to build
4. Deploy to Cloudflare

### Customizing Design:
1. Edit Tailwind classes in components
2. Modify colors in `tailwind.config.mjs`
3. Update layout in `BaseLayout.astro`

---

**The entire site is controlled by one JSON file!**

This architecture scales to 100+ VPNs and 50+ categories without adding complexity.
