# envelope-landing

Landing page, setup guide, Terms of Use, and Privacy Policy for **Envelope Companion** (`envelope.milliways.si`).

## Development

```bash
npm install
npm run dev
npm run build
```

## Regenerating App Store Screenshots

Screenshots are captured from the Release iOS Simulator build in Demo Mode (`-demoPreset large100`) using `goldie` and `.argent/flows/*.yaml`. The landing site converts the **unframed raw captures** (`out/raw/iphone-6.9/*.png`) to `.webp` for `public/screenshots/` so `IPhoneFrame` renders the full-bleed app UI inside a single device frame:

```bash
# 1. Build the Release simulator app from the iOS repo
xcodegen generate
xcodebuild -project ActualCompanion.xcodeproj \
  -scheme ActualCompanion \
  -configuration Release \
  -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath /tmp/bc-derived-data \
  CODE_SIGNING_ALLOWED=NO CODE_SIGNING_REQUIRED=NO build

# 2. Verify toolchain & simulators, then capture raw screenshots, frame App Store posters, and verify
goldie doctor
goldie capture
goldie frame
goldie verify

# 3. Convert unframed raw iPhone 6.9" PNGs to WebP in public/screenshots/
cwebp -quiet -q 85 out/raw/iphone-6.9/01-budget.png -o public/screenshots/01-budget.webp
cwebp -quiet -q 85 out/raw/iphone-6.9/05-quick-log.png -o public/screenshots/02-quick-entry.webp
cwebp -quiet -q 85 out/raw/iphone-6.9/03-transactions.png -o public/screenshots/03-receipt-ocr.webp
cwebp -quiet -q 85 out/raw/iphone-6.9/02-accounts.png -o public/screenshots/04-accounts.webp
cwebp -quiet -q 85 out/raw/iphone-6.9/04-reports.png -o public/screenshots/05-reports.webp
cwebp -quiet -q 85 out/raw/iphone-6.9/03-transactions.png -o public/screenshots/06-search.webp
cwebp -quiet -q 85 out/raw/iphone-6.9/07-settings.png -o public/screenshots/07-settings.webp
```

## Deploy to Cloudflare

Use the Cloudflare Account ID and Zone ID from the captain's records:

```bash
npm run build
CLOUDFLARE_ACCOUNT_ID=YOUR_ACCOUNT_ID CLOUDFLARE_ZONE_ID=YOUR_ZONE_ID cf deploy dist
```
