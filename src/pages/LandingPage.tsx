import React from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Clock,
  Github,
  Mail,
  Receipt,
  Shield,
  Sparkles,
  Wallet,
  WifiOff,
  Zap,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

interface PhoneShot {
  expectedFile: string;
  screenTitle: string;
  screenSubtitle: string;
  previewRows: readonly string[];
  alt: string;
  label?: string;
}

interface IPhoneFrameProps extends PhoneShot {
  className?: string;
}

const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  screenTitle,
  screenSubtitle,
  previewRows,
  alt,
  label,
  className = '',
}) => (
  <figure className={`flex flex-col items-center ${className}`}>
    <div
      role="img"
      aria-label={alt}
      className="w-full rounded-[2.25rem] bg-[#161a24] p-2 shadow-xl ring-1 ring-black/15 dark:bg-[#080d0b] dark:ring-white/15 sm:rounded-[2.5rem] sm:p-2.5"
    >
      <div className="relative flex aspect-[9/19.5] flex-col justify-between overflow-hidden rounded-[1.8rem] bg-gradient-to-b from-[var(--bg-surface-2)] to-[var(--bg-surface-1)] p-3.5 text-left sm:rounded-[2rem] sm:p-5">
        <div
          aria-hidden="true"
          className="pointer-events-none mx-auto mb-2 h-3.5 w-16 rounded-full bg-black/90 ring-1 ring-white/10 sm:h-4 sm:w-20"
        />

        <div className="space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center rounded-full bg-[var(--accent-50)] px-2.5 py-0.5 text-[10px] font-semibold tracking-wide whitespace-nowrap text-[var(--accent-700)] uppercase dark:text-[var(--accent-400)]">
            <span>App Preview</span>
          </div>

          <div>
            <p className="font-display text-sm font-bold text-[var(--ink-primary)] sm:text-base">
              {screenTitle}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-[var(--ink-secondary)]">
              {screenSubtitle}
            </p>
          </div>

          <div className="space-y-2 pt-1">
            {previewRows.map((row) => (
              <div
                key={row}
                className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] px-2.5 py-2 text-[11px] font-medium text-[var(--ink-secondary)] shadow-2xs sm:px-3"
              >
                <span className="truncate">{row}</span>
                <span className="ml-2 h-2 w-7 shrink-0 rounded-full bg-[var(--accent-500)]/45 sm:w-8" />
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="h-2" />
      </div>
    </div>
    {label && (
      <figcaption className="mt-3 text-center text-xs font-medium tracking-wide text-[var(--ink-muted)] sm:text-sm">
        {label}
      </figcaption>
    )}
  </figure>
);

const HERO_SHOTS: readonly PhoneShot[] = [
  {
    expectedFile: '01-budget.webp',
    screenTitle: 'Envelope Budget',
    screenSubtitle: 'To Budget, category groups, and rollover balances.',
    previewRows: ['To Budget · $420.00', 'Groceries · $315 / $500', 'Rent & Utilities · Funded'],
    alt: 'Placeholder frame for Envelope Companion Budget tab showing To-Budget balance and category envelopes',
  },
  {
    expectedFile: '02-quick-entry.webp',
    screenTitle: 'Quick Entry',
    screenSubtitle: 'Sub-2-second haptic cents keypad with smart chips.',
    previewRows: ['-$42.50 · Trader Joe’s', 'Envelope · Groceries', 'Account · Checking'],
    alt: 'Placeholder frame for Envelope Companion Quick Entry sheet with haptic cents keypad and smart payee chips',
  },
];

const CHAPTERS = [
  {
    id: 'envelope-budgeting',
    eyebrow: 'Envelope Budgeting',
    icon: Wallet,
    title: 'Every dollar in its place.',
    description:
      'Track To-Budget balances, Hold for Next Month, category group focus, Envelope vs. Tracking budget modes, upcoming scheduled bills, and instant budget filtering.',
    chips: [
      'To-Budget & Rollover',
      'Hold for Next Month',
      'Category Group Focus',
      'Upcoming Bills',
      'Envelope & Tracking Modes',
      'Filter & Hide Inactive',
    ],
    shots: [
      {
        expectedFile: '01-budget.webp',
        screenTitle: 'Monthly Envelopes',
        screenSubtitle: 'Rollover balances & upcoming scheduled bills.',
        previewRows: ['To Budget · $420.00', 'Hold for Next Month', 'Hide Inactive Envelopes'],
        alt: 'Placeholder frame for Envelope Companion monthly budget overview',
        label: 'Monthly Budget',
      },
      {
        expectedFile: '06-search.webp',
        screenTitle: 'Global Search',
        screenSubtitle: 'Instant search across payees, #tags, and amounts.',
        previewRows: ['Query · #grocery', 'Whole Foods · -$64.20', 'Trader Joe’s · -$42.50'],
        alt: 'Placeholder frame for Envelope Companion global search (Cmd+K)',
        label: 'Global Search',
      },
    ],
    layout: 'split-right' as const,
  },
  {
    id: 'quick-entry',
    eyebrow: 'Quick Entry',
    icon: Zap,
    title: 'Log an expense before you leave the register.',
    description:
      'Tap the floating + button (Cmd+N on iPad) for a custom haptic cents keypad with smart payee and category chips, optional nearby merchant suggestions, and Siri Shortcuts or Control Center integration.',
    chips: [
      'Haptic Cents Keypad',
      'Smart Payee & Category Chips',
      'Opt-In Location Payees',
      'Splits & Transfers',
      'Siri Shortcuts',
      'Control Center Widget',
    ],
    shots: [
      {
        expectedFile: '02-quick-entry.webp',
        screenTitle: '2-Second Entry',
        screenSubtitle: 'Haptic cents keypad + nearby payee chips.',
        previewRows: ['Amount · $42.50', 'Payee · Smart Suggestions', 'Split · 2 Envelopes'],
        alt: 'Placeholder frame for Envelope Companion Quick Entry haptic keypad',
        label: 'Quick Entry Keypad',
      },
    ],
    layout: 'split-left' as const,
  },
  {
    id: 'receipt-scanner',
    eyebrow: 'Receipt Scanner',
    icon: Receipt,
    title: 'Scan receipts. Split across envelopes.',
    description:
      'Capture receipts with the camera, Photo Library, or iOS Share Extension. On-device Apple Vision OCR extracts items, totals, and proportional tax—with optional Bring-Your-Own-Key (BYOK) AI categorization via OpenAI, Anthropic, Gemini, or self-hosted Ollama.',
    chips: [
      'On-Device Vision OCR',
      'Proportional Tax Split',
      'iOS Share Extension',
      'Optional BYOK AI',
      'OpenAI / Anthropic / Gemini',
      'Self-Hosted Ollama',
    ],
    shots: [
      {
        expectedFile: '03-receipt-ocr.webp',
        screenTitle: 'Receipt OCR Split',
        screenSubtitle: 'Apple Vision item extraction & proportional tax.',
        previewRows: ['Produce · $28.40', 'Household · $14.10', 'Tax Split · Proportional'],
        alt: 'Placeholder frame for Envelope Companion Receipt OCR split review',
        label: 'Receipt OCR',
      },
      {
        expectedFile: '04-accounts.webp',
        screenTitle: 'Accounts & Ledger',
        screenSubtitle: 'On-budget and off-budget account reconciliation.',
        previewRows: ['Checking · $3,480.00', 'Savings · $12,100.00', 'Reconciled · Today'],
        alt: 'Placeholder frame for Envelope Companion Accounts list and reconciliation',
        label: 'Accounts',
      },
      {
        expectedFile: '05-reports.webp',
        screenTitle: 'Live Reports',
        screenSubtitle: 'Net Worth, Cash Flow, and Spending Pace charts.',
        previewRows: ['Net Worth · +4.2%', 'Cash Flow · +$680', 'CSV Export Ready'],
        alt: 'Placeholder frame for Envelope Companion Reports and Spending Pace charts',
        label: 'Reports & Pace',
      },
    ],
    layout: 'spotlight-three' as const,
  },
  {
    id: 'ledger-insights',
    eyebrow: 'Ledger & Insights',
    icon: BarChart3,
    title: 'Full ledger control and live reports.',
    description:
      'Manage on-budget and off-budget accounts, reconcile balances, search payees, #tags, and amounts globally (Cmd+K), and inspect Net Worth, Cash Flow, Category Spending, and Spending Pace charts with CSV export.',
    chips: [
      'Account Reconciliation',
      'Global Search (Cmd+K)',
      'Net Worth & Cash Flow',
      'Spending Pace',
      'CSV Export',
      'iPad Split View',
    ],
    shots: [
      {
        expectedFile: '04-accounts.webp',
        screenTitle: 'Account Ledger',
        screenSubtitle: 'Reconcile balances and edit offline anytime.',
        previewRows: ['On-Budget Accounts', 'Off-Budget Tracking', 'Cleared & Reconciled'],
        alt: 'Placeholder frame for Envelope Companion account reconciliation',
        label: 'Ledger & Reconcile',
      },
      {
        expectedFile: '05-reports.webp',
        screenTitle: 'Spending Charts',
        screenSubtitle: 'Native iOS charts with CSV export.',
        previewRows: ['Net Worth Trend', 'Monthly Cash Flow', 'Category Spending Pace'],
        alt: 'Placeholder frame for Envelope Companion native spending reports',
        label: 'Spending Insights',
      },
    ],
    layout: 'split-right' as const,
  },
  {
    id: 'private-self-hosted',
    eyebrow: 'Private & Self-Hosted',
    icon: WifiOff,
    title: 'Your budget stays between you and your server.',
    description:
      'Full offline SQLite + CRDT sync queue, end-to-end encrypted (E2EE) budget unlock, Face ID / Touch ID lock, Home Screen & Lock Screen Widgets, and a free built-in Demo Mode (Standard & 100-item Large presets) with no server required to try.',
    chips: [
      'CRDT Offline Sync',
      'E2EE Budget Support',
      'Face ID / Touch ID Lock',
      'Home & Lock Widgets',
      'Free Demo Mode',
      'Zero Telemetry',
    ],
    shots: [
      {
        expectedFile: '07-settings.webp',
        screenTitle: 'Privacy & Sync',
        screenSubtitle: 'CRDT sync, E2EE unlock, Face ID, and Demo Mode.',
        previewRows: ['Sync · CRDT Direct', 'E2EE · Unlocked', 'Demo · Standard & Large'],
        alt: 'Placeholder frame for Envelope Companion Settings showing CRDT sync, E2EE, and Face ID lock',
        label: 'Settings & E2EE (Light & Dark)',
      },
    ],
    layout: 'split-left' as const,
  },
];

const PRICING_TIERS = [
  {
    name: 'Demo Mode',
    price: 'Free',
    cadence: 'Built-in · No server required',
    description: 'Explore Standard and 100-item Large demo budgets locally on your device.',
    features: ['Full offline UI & quick entry', 'Sample reports & search', 'Switch to your server anytime'],
    highlighted: false,
  },
  {
    name: 'Monthly',
    price: '$2.99',
    cadence: 'per month',
    description: 'Flexible monthly access to Envelope Companion Pro.',
    features: ['Unlimited self-hosted sync', 'On-device Vision receipt OCR', 'Widgets, Shortcuts & E2EE'],
    highlighted: false,
  },
  {
    name: 'Yearly',
    price: '$19.99',
    cadence: 'per year · 7-day free trial',
    description: 'Best ongoing value with a 7-day free trial for eligible users.',
    features: ['7-day free trial included', 'All Pro features unlocked', 'Cancel anytime in Apple ID'],
    highlighted: true,
  },
  {
    name: 'Lifetime',
    price: '$49.99',
    cadence: 'one-time · Family Sharing',
    description: 'Pay once and share Envelope Companion Pro with your Apple Family.',
    features: ['One-time non-consumable purchase', 'Apple Family Sharing enabled', 'All future Pro updates'],
    highlighted: false,
  },
] as const;

const FAQ_ITEMS = [
  {
    question: 'How does Envelope Companion connect to my Actual Budget server?',
    answer:
      'It connects directly from your iPhone or iPad to your self-hosted Actual Budget server over HTTPS (including PikaPods), Tailscale, or your Home Wi-Fi LAN (port 5006)—with zero middleman servers.',
    hasConnectLink: true,
  },
  {
    question: 'How much does it cost, and can I try it without a server?',
    answer:
      'Yes! Built-in Demo Mode (Standard and 100-item Large presets) is free with no server required. Envelope Companion Pro is $2.99/month, $19.99/year (with a 7-day free trial), or $49.99 Lifetime with Family Sharing.',
  },
  {
    question: 'Does Envelope Companion support end-to-end encrypted (E2EE) budgets?',
    answer:
      'Yes. You can unlock E2EE budgets directly on your device; your encryption key and server credentials are stored securely in the iOS Keychain.',
  },
  {
    question: 'How does receipt scanning and optional BYOK AI work privately?',
    answer:
      'Receipt OCR runs 100% on-device using Apple Vision. Optional Bring-Your-Own-Key (BYOK) AI categorization is disabled by default; when you explicitly trigger it, only extracted OCR text and active category names are sent directly from your device to your chosen provider (OpenAI, Anthropic, Gemini, or self-hosted Ollama).',
  },
  {
    question: 'Which devices and iOS versions are supported?',
    answer:
      'Envelope Companion is built natively for iPhone and iPad on iOS 17+ and iOS 26 Liquid Glass, including Home Screen and Lock Screen Widgets, Control Center actions, Siri Shortcuts, and Share Sheet receipt import.',
  },
] as const;

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-6 sm:space-y-10 sm:px-6 sm:py-10">
      {/* Hero Sheet */}
      <section className="rounded-3xl bg-[var(--bg-surface-1)] px-5 py-10 shadow-sm ring-1 ring-[var(--border-subtle)] sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-50)] px-3.5 py-1.5 text-xs font-semibold text-[var(--accent-700)] dark:text-[var(--accent-400)]">
              <Shield className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Native iPhone &amp; iPad Client for Actual Budget</span>
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Zero-based envelope budgeting, always offline.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-[var(--ink-secondary)] sm:text-lg">
              A fast, native companion for your self-hosted Actual Budget server. Log expenses in
              two seconds, scan and split receipts on-device, and sync via CRDTs with zero
              middleman.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {SITE_CONFIG.appStoreLive ? (
                <a
                  href={SITE_CONFIG.appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-600)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-700)]"
                >
                  <span>Download on App Store</span>
                </a>
              ) : (
                <a
                  href="/#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/#pricing');
                  }}
                  title={`App Store release coming soon (ID ${SITE_CONFIG.appStoreId})`}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-600)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-700)]"
                >
                  <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>App Store &middot; Coming Soon</span>
                </a>
              )}
              <a
                href="/connect"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/connect');
                }}
                className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-[var(--ink-secondary)] transition hover:text-[var(--accent-600)] dark:hover:text-[var(--accent-400)]"
              >
                <span>How to Connect</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-6 text-xs font-medium tracking-wide text-[var(--ink-muted)] sm:text-sm">
              iPhone &amp; iPad &middot; Offline-first SQLite + CRDT &middot; Direct to your server
              &middot; Zero tracking
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="mx-auto grid max-w-md grid-cols-2 items-start gap-4 sm:max-w-lg sm:gap-6">
              <IPhoneFrame {...HERO_SHOTS[0]} />
              <IPhoneFrame {...HERO_SHOTS[1]} className="mt-6 sm:mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Chapters */}
      <div id="features" className="scroll-mt-20 space-y-6 sm:space-y-10">
        {CHAPTERS.map((chapter) => {
          const Icon = chapter.icon;

          if (chapter.layout === 'spotlight-three') {
            return (
              <section
                key={chapter.id}
                id={chapter.id}
                className="scroll-mt-20 rounded-3xl bg-[var(--bg-surface-1)] px-5 py-10 shadow-sm ring-1 ring-[var(--border-subtle)] sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-14"
              >
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-50)] px-3 py-1 text-xs font-semibold text-[var(--accent-700)] dark:text-[var(--accent-400)]">
                    <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{chapter.eyebrow}</span>
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
                    {chapter.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[var(--ink-secondary)]">
                    {chapter.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {chapter.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full bg-[var(--bg-surface-2)] px-3.5 py-1.5 text-xs font-medium text-[var(--ink-secondary)]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
                  {chapter.shots.map((shot) => (
                    <IPhoneFrame
                      key={shot.expectedFile}
                      {...shot}
                      className="mx-auto w-full max-w-[260px] sm:max-w-none"
                    />
                  ))}
                </div>
              </section>
            );
          }

          const isSingleShot = chapter.shots.length === 1;
          const textFirst = chapter.layout === 'split-right';

          return (
            <section
              key={chapter.id}
              id={chapter.id}
              className="rounded-3xl bg-[var(--bg-surface-1)] px-5 py-10 shadow-sm ring-1 ring-[var(--border-subtle)] sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-14"
            >
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                <div className={`lg:col-span-5 ${textFirst ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-50)] px-3 py-1 text-xs font-semibold text-[var(--accent-700)] dark:text-[var(--accent-400)]">
                    <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{chapter.eyebrow}</span>
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
                    {chapter.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[var(--ink-secondary)]">
                    {chapter.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {chapter.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full bg-[var(--bg-surface-2)] px-3.5 py-1.5 text-xs font-medium text-[var(--ink-secondary)]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`lg:col-span-7 ${textFirst ? 'lg:order-2' : 'lg:order-1'}`}>
                  {isSingleShot ? (
                    <IPhoneFrame
                      {...chapter.shots[0]}
                      className="mx-auto w-full max-w-[280px] sm:max-w-[300px]"
                    />
                  ) : (
                    <div className="mx-auto grid max-w-lg grid-cols-2 items-start gap-4 sm:max-w-xl sm:gap-6">
                      {chapter.shots.map((shot, idx) => (
                        <IPhoneFrame
                          key={shot.expectedFile}
                          {...shot}
                          className={idx === 1 ? 'mt-6 sm:mt-8' : ''}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Pricing */}
      <section
        id="pricing"
        className="scroll-mt-20 rounded-3xl bg-[var(--bg-surface-1)] px-5 py-10 shadow-sm ring-1 ring-[var(--border-subtle)] sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-14"
      >
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-50)] px-3 py-1 text-xs font-semibold text-[var(--accent-700)] dark:text-[var(--accent-400)]">
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
            Try Demo Mode free. Upgrade when you&apos;re ready.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--ink-secondary)]">
            Explore the full app locally with built-in Demo Mode (no server required), or unlock{' '}
            <strong>Envelope Companion Pro</strong> with monthly, yearly (7-day free trial), or
            Lifetime Family Sharing.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between rounded-2xl p-5 ring-1 ${
                tier.highlighted
                  ? 'bg-[var(--accent-50)] ring-[var(--accent-500)]/50'
                  : 'bg-[var(--bg-surface-2)] ring-[var(--border-subtle)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-[var(--ink-primary)]">
                    {tier.name}
                  </h3>
                  {tier.highlighted && (
                    <span className="rounded-full bg-[var(--accent-600)] px-2.5 py-0.5 text-[11px] font-semibold text-white">
                      7-Day Trial
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)]">
                    {tier.price}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-[var(--accent-700)] dark:text-[var(--accent-400)]">
                  {tier.cadence}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-secondary)]">
                  {tier.description}
                </p>
              </div>

              <ul className="mt-5 space-y-2 border-t border-[var(--border-subtle)] pt-4 text-xs text-[var(--ink-secondary)]">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-600)] dark:text-[var(--accent-400)]"
                      aria-hidden="true"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="scroll-mt-20 rounded-3xl bg-[var(--bg-surface-1)] px-5 py-10 shadow-sm ring-1 ring-[var(--border-subtle)] sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-14"
      >
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-wider text-[var(--accent-600)] uppercase dark:text-[var(--accent-400)]">
              FAQ
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)]">
              Common questions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-secondary)]">
              Everything self-hosters ask about connecting, E2EE, receipt OCR, and pricing.
            </p>
          </div>

          <div className="space-y-3 lg:col-span-8">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl bg-[var(--bg-surface-2)] px-5 py-4 transition"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-[var(--ink-primary)] [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-[var(--ink-muted)] transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-secondary)]">
                  {item.answer}
                  {'hasConnectLink' in item && item.hasConnectLink && (
                    <>
                      {' '}
                      <a
                        href="/connect"
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate('/connect');
                        }}
                        className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
                      >
                        Read the connection guide
                      </a>
                      .
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Repeat App Store CTA */}
      <section className="rounded-3xl bg-[var(--bg-surface-1)] px-5 py-12 text-center shadow-sm ring-1 ring-[var(--border-subtle)] sm:rounded-[2rem] sm:px-10 sm:py-16">
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
            Your budget, always in your pocket.
          </h2>
          <p className="mt-4 text-base text-[var(--ink-secondary)]">
            Native iPhone &amp; iPad client for Actual Budget. Direct to your server, with CRDT
            offline sync, on-device receipt OCR, and zero tracking.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/connect"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/connect');
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-600)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-700)]"
            >
              <span>Read Connection Guide</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
            {SITE_CONFIG.appStoreLive ? (
              <a
                href={SITE_CONFIG.appStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-2)] px-5 py-3.5 text-sm font-semibold text-[var(--ink-primary)] transition hover:bg-[var(--bg-surface-3)]"
              >
                <span>Download on App Store</span>
              </a>
            ) : (
              <a
                href={`mailto:${SITE_CONFIG.supportEmail}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-2)] px-5 py-3.5 text-sm font-semibold text-[var(--ink-primary)] transition hover:bg-[var(--bg-surface-3)]"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>App Store Coming Soon &middot; Contact Us</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Support & Contact */}
      <section
        id="support"
        className="scroll-mt-20 rounded-3xl bg-[var(--bg-surface-1)] px-5 py-10 shadow-sm ring-1 ring-[var(--border-subtle)] sm:rounded-[2rem] sm:px-10 sm:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--ink-primary)]">
              Support &amp; Contact
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--ink-secondary)]">
              Need help connecting your Actual Budget server, unlocking an E2EE budget, or
              reporting a bug? Reach out via email or open an issue on GitHub.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <a
                href="/connect"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/connect');
                }}
                className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
              >
                How to Connect
              </a>
              <span aria-hidden="true" className="text-[var(--ink-muted)]">
                &middot;
              </span>
              <a
                href="/privacy"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/privacy');
                }}
                className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
              >
                Privacy Policy
              </a>
              <span aria-hidden="true" className="text-[var(--ink-muted)]">
                &middot;
              </span>
              <a
                href="/terms"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/terms');
                }}
                className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
              >
                Terms of Use
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-4">
            <a
              href={`mailto:${SITE_CONFIG.supportEmail}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-600)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-700)]"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{SITE_CONFIG.supportEmail}</span>
            </a>
            <a
              href={`${SITE_CONFIG.issuesRepoUrl}/issues`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-2)] px-5 py-3 text-sm font-semibold text-[var(--ink-primary)] transition hover:bg-[var(--bg-surface-3)]"
            >
              <Github className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>GitHub Issues</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
