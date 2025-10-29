# ⚡ QUICK START - Get This Live in 10 Minutes

## Step 1: Setup (2 min)
```bash
cd top10vpnlist
npm install
```

## Step 2: Add Your Affiliate IDs (3 min)
Open `src/data/vpns.json` and replace all instances of:
- `YOUR_AFFILIATE_ID` with your actual affiliate codes

Example:
```json
"affiliateLink": "https://www.expressvpn.com/?a=abc123xyz"
```

## Step 3: Test Locally (1 min)
```bash
npm run dev
```
Visit http://localhost:4321 - you should see your site!

## Step 4: Deploy to Cloudflare Pages (4 min)

### Via GitHub (Easiest):
1. Create new GitHub repo
2. Push this code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```
3. Go to Cloudflare Pages dashboard
4. "Create a project" → "Connect to Git"
5. Select your repo
6. Build settings:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
7. Click "Save and Deploy"

Done! Your site will be live in ~2 minutes.

### Via Direct Upload:
```bash
npm run build
npx wrangler pages deploy dist --project-name top10vpnlist
```

## Step 5: Configure Domain (Optional)
In Cloudflare Pages:
1. Go to your project → Custom domains
2. Add your domain: `top10vpnlist.com`
3. Follow DNS instructions

---

## What You Get Out of the Box:
✅ 26+ SEO-optimized pages
✅ Mobile responsive
✅ Affiliate link tracking
✅ Lightning fast (Astro static site)
✅ Perfect Lighthouse scores
✅ Schema markup for SEO
✅ Comparison tables
✅ Production ready

## Next Steps After Deploy:
1. ✅ Submit sitemap to Google Search Console
2. ✅ Set up Google Analytics (add to BaseLayout.astro)
3. ✅ Add actual VPN logos to `/public/images/`
4. ✅ Start creating backlinks

## Estimated Time to First Commission:
- Deploy today
- Start ranking in 2-4 weeks
- First commission in 4-8 weeks (if you promote it)

## Need More VPNs?
Just add to `src/data/vpns.json` - pages auto-generate!

---

**Questions? Check README.md for full docs.**

Let's get this money! 💰
