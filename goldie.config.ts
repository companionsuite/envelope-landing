import type { GoldieConfig } from 'goldie';

const config: GoldieConfig = {
  appRoot: process.cwd(),
  flowsDir: '.argent/flows',
  appPath:
    process.env.GOLDIE_APP_PATH ??
    '/tmp/bc-derived-data/Build/Products/Release-iphonesimulator/ActualCompanion.app',
  bundleId: 'com.actualcompanion.app',

  devices: ['iphone-6.9', 'ipad-13'],
  locales: ['en-US'],
  appearance: 'light',

  frame: {
    variant: {
      'iphone-6.9': '17-pro-silver',
      'ipad-13': 'ipad-pro-13-silver',
    },
  },

  theme: {
    background: 'linear-gradient(160deg, #D9F7EC 0%, #F4FBF8 55%, #FFFFFF 100%)',
    headlineColor: '#0B1F1A',
    subheadColor: '#3E5B52',
    fontFamily: '-apple-system, "SF Pro Display", system-ui, sans-serif',
    copyHeightRatio: 0.24,
    deviceWidthRatio: 0.84,
    layout: 'classic',
  },

  store: {
    name: 'Envelope Companion',
    subtitle: { 'en-US': 'Private client for Actual Budget' },
    developer: 'Companion Suite',
    category: 'Finance',
    rating: 4.9,
    ratingCount: 'New',
    ageRating: '4+',
    price: 'Free',
    description: {
      'en-US':
        'A fast, native iOS & iPadOS companion for your self-hosted Actual Budget server. Manage envelopes offline, log expenses in two seconds, scan receipts with on-device OCR, and sync via CRDTs.',
    },
  },

  scenes: [
    {
      kind: 'screenshot',
      id: '01-budget',
      flow: 'store-01-budget',
      headline: { 'en-US': 'Every dollar in its envelope' },
      subhead: { 'en-US': 'Track monthly budgets, upcoming bills, and balances offline.' },
    },
    {
      kind: 'screenshot',
      id: '02-accounts',
      flow: 'store-02-accounts',
      headline: { 'en-US': 'All accounts at a glance' },
      subhead: { 'en-US': 'On-budget, off-budget, and reconciled balances in one view.' },
    },
    {
      kind: 'screenshot',
      id: '03-transactions',
      flow: 'store-03-transactions',
      headline: { 'en-US': 'Full ledger & instant search' },
      subhead: { 'en-US': 'Filter by account, category, #tag, or payee offline anytime.' },
    },
    {
      kind: 'screenshot',
      id: '04-reports',
      flow: 'store-04-reports',
      headline: { 'en-US': 'Clear spending insights' },
      subhead: { 'en-US': 'Net worth, cash flow, and category pace charts built natively.' },
    },
    {
      kind: 'screenshot',
      id: '05-quick-log',
      flow: 'store-05-quick-log',
      headline: { 'en-US': 'Log expenses in 2 seconds' },
      subhead: { 'en-US': 'Custom haptic keypad with smart payee and category chips.' },
    },
    {
      kind: 'screenshot',
      id: '06-paywall',
      flow: 'store-06-paywall',
      headline: { 'en-US': 'Unlock Envelope Pro' },
      subhead: { 'en-US': 'Direct CRDT sync, Receipt OCR, and widgets with a 7-day trial.' },
    },
    {
      kind: 'screenshot',
      id: '07-settings',
      flow: 'store-07-settings',
      headline: { 'en-US': 'Private, encrypted & yours' },
      subhead: { 'en-US': 'Direct server sync, Face ID lock, and zero tracking.' },
    },
  ],
};

export default config;
