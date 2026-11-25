# envelope-landing

Landing page, setup guide, Terms of Use, and Privacy Policy for **Envelope Companion** (`envelope.milliways.si`).

## Development

```bash
npm install
npm run dev
npm run build
```

## Regenerating App Store Screenshots

Screenshots are captured from the Release iOS Simulator build in Demo Mode (`-demoPreset large100`) using `goldie` and `.argent/flows/*.yaml`, then converted to `.webp` for `public/screenshots/`:

```bash
# 1. Build the Release simulator app from the iOS repo
xcodegen generate
xcodebuild -project ActualCompanion.xcodeproj \
  -scheme ActualCompanion \
  -configuration Release \
  -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath /tmp/bc-derived-data \
  CODE_SIGNING_ALLOWED=NO CODE_SIGNING_REQUIRED=NO build

# 2. Verify toolchain & simulators, then capture, frame, and verify
goldie doctor
goldie capture
goldie frame
goldie verify

# 3. Convert framed iPhone 6.9" PNGs to WebP in public/screenshots/
cwebp -quiet -q 85 out/screenshots/iphone-6.9/en-US/01-01-budget.png -o public/screenshots/01-budget.webp
cwebp -quiet -q 85 out/screenshots/iphone-6.9/en-US/05-05-quick-log.png -o public/screenshots/02-quick-entry.webp
cwebp -quiet -q 85 out/screenshots/iphone-6.9/en-US/03-03-transactions.png -o public/screenshots/03-receipt-ocr.webp
cwebp -quiet -q 85 out/screenshots/iphone-6.9/en-US/02-02-accounts.png -o public/screenshots/04-accounts.webp
cwebp -quiet -q 85 out/screenshots/iphone-6.9/en-US/04-04-reports.png -o public/screenshots/05-reports.webp
cwebp -quiet -q 85 out/screenshots/iphone-6.9/en-US/03-03-transactions.png -o public/screenshots/06-search.webp
cwebp -quiet -q 85 out/screenshots/iphone-6.9/en-US/07-07-settings.png -o public/screenshots/07-settings.webp
```

## Deploy to Cloudflare

```bash
npm run build
CLOUDFLARE_ACCOUNT_ID=653f507ee5697b23ccd9afb9a000b267 CLOUDFLARE_ZONE_ID=8a6055ebc3ceefad42961a9de2683a75 cf deploy dist
```
