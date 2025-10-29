#!/bin/bash

# Deploy script for Cloudflare Pages
# Run this after: npm install -g wrangler && wrangler login

echo "🚀 Building site..."
npm run build

echo "📦 Deploying to Cloudflare Pages..."
wrangler pages deploy dist --project-name top10vpnlist

echo "✅ Deployed! Check your Cloudflare dashboard for the URL."
