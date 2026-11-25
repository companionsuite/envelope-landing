import React from 'react';
import {
  Camera,
  CreditCard,
  Fingerprint,
  HardDrive,
  Lock,
  MapPin,
  Server,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-50)] px-3 py-1 text-xs font-medium text-[var(--accent-700)] dark:text-[var(--accent-400)]">
          <ShieldCheck className="h-3.5 w-3.5" />
          Privacy Policy
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          Effective date: November 25, 2026 &middot; App: {SITE_CONFIG.appName} ({SITE_CONFIG.bundleId})
        </p>
      </div>

      <div className="space-y-6 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
            <Lock className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
            1. Zero Developer Collection &amp; No Analytics
          </h2>
          <p className="mt-3">
            {SITE_CONFIG.appName} is built for private, self-hosted budgeting. We do not operate any
            developer backend that collects, stores, or inspects your financial data, credentials,
            or usage activity. The app contains{' '}
            <strong>
              no third-party analytics, no advertising SDKs, and no crash-tracking trackers
            </strong>
            .
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
            <Server className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
            2. Direct Connection to Your Self-Hosted Actual Server
          </h2>
          <p className="mt-3">
            Network requests go <strong>only</strong> to the <code className="font-mono">actual-server</code>{' '}
            URL you explicitly configure. Your server URL, authentication tokens, and End-to-End
            Encryption (E2EE) keys are stored securely in the iOS Keychain on your device.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
            <HardDrive className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
            3. On-Device Storage &amp; App Group
          </h2>
          <p className="mt-3">
            Budget data and CRDT sync state are cached locally in SQLite inside the iOS App Group (
            <code className="font-mono">group.com.actualcompanion.shared</code>) so the main app,
            widgets, share extension, and Siri Shortcuts share state seamlessly. Demo Mode runs 100%
            locally with no network requests.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
            <Camera className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
            4. Camera, Photo Library &amp; On-Device Vision OCR
          </h2>
          <p className="mt-3">
            {SITE_CONFIG.appName} requests Camera and Photo Library access only when you choose to
            scan or import a receipt. Optical Character Recognition (OCR) runs{' '}
            <strong>100% on-device</strong> using Apple Vision.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
            <MapPin className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
            5. Opt-In Location for Nearby Payees
          </h2>
          <p className="mt-3">
            Nearby merchant suggestions are <strong>disabled by default</strong>—the app never
            initializes location services unless you explicitly opt in. When enabled, it performs a
            single-shot When-In-Use lookup (150m radius) to suggest nearby payees; coordinates stay
            on your device and your own Actual server.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
            <Fingerprint className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
            6. Biometric Lock
          </h2>
          <p className="mt-3">
            Optional Face ID or Touch ID app lock is handled locally by iOS{' '}
            <code className="font-mono">LocalAuthentication</code>. Biometric data never leaves your
            device.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
            <Sparkles className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
            7. Optional BYOK Receipt AI
          </h2>
          <p className="mt-3">
            Bring-Your-Own-Key (BYOK) AI receipt splitting is <strong>disabled by default</strong>{' '}
            and disabled in Demo Mode. Any API key you provide is stored exclusively in the iOS
            Keychain. When you explicitly trigger AI splitting, only extracted OCR text and active
            category names are sent directly from your device to your chosen provider (OpenAI,
            Anthropic, Gemini, or a self-hosted Ollama / OpenAI-compatible endpoint).
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
            <CreditCard className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
            8. In-App Purchases
          </h2>
          <p className="mt-3">
            Envelope Companion Pro subscriptions and Lifetime purchases are processed by Apple
            StoreKit 2 through the App Store. The developer never sees your payment details.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            9. Contact &amp; Support
          </h2>
          <p className="mt-3">
            For privacy questions or support, email{' '}
            <a
              href={`mailto:${SITE_CONFIG.supportEmail}`}
              className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
            >
              {SITE_CONFIG.supportEmail}
            </a>{' '}
            or open an issue on{' '}
            <a
              href={`${SITE_CONFIG.issuesRepoUrl}/issues`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
            >
              GitHub
            </a>
            . You can also return to the{' '}
            <button
              type="button"
              onClick={() => onNavigate('/#support')}
              className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
            >
              Support section
            </button>
            .
          </p>
        </section>
      </div>
    </article>
  );
};
