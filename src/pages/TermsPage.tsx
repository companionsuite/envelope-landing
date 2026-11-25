import React from 'react';
import { FileText } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-50)] px-3 py-1 text-xs font-medium text-[var(--accent-700)] dark:text-[var(--accent-400)]">
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          Terms of Use
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          Effective date: November 25, 2026 &middot; App: {SITE_CONFIG.appName} ({SITE_CONFIG.bundleId})
        </p>
      </div>

      <div className="space-y-6 text-[15px] leading-relaxed text-[var(--ink-secondary)]">
        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            1. Acceptance of Terms
          </h2>
          <p className="mt-2">
            By downloading or using {SITE_CONFIG.appName}, you agree to these Terms of Use. If you
            do not agree, do not use the application.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            2. Independent Companion &amp; Self-Hosted Server
          </h2>
          <p className="mt-2">
            {SITE_CONFIG.appName} is an independent client for Actual Budget and is not affiliated
            with or endorsed by the Actual Budget project. You are responsible for operating,
            securing, and backing up your own <code className="font-mono">actual-server</code>{' '}
            instance and End-to-End Encryption (E2EE) passwords.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            3. Envelope Companion Pro Subscription &amp; Lifetime Purchase
          </h2>
          <p className="mt-2">
            {SITE_CONFIG.appName} offers an auto-renewable{' '}
            <strong>Yearly ($9.99/year, with a 7-day free trial for eligible users)</strong>{' '}
            subscription billed through your Apple ID via the App Store, as well as a{' '}
            <strong>Lifetime ($19.99)</strong> non-consumable purchase with Apple Family Sharing
            enabled. The Yearly subscription renews automatically unless canceled at least 24 hours
            before the end of the current period; manage or cancel anytime in your Apple Account
            Settings. Built-in <strong>Demo Mode</strong> remains free without purchase.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            4. Optional Third-Party AI Providers (BYOK)
          </h2>
          <p className="mt-2">
            Use of OpenAI, Anthropic, Gemini, or custom OpenAI-compatible/Ollama endpoints for
            receipt categorization is entirely optional and governed by your own agreement and
            billing with that provider.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            5. Disclaimer of Warranties &amp; Limitation of Liability
          </h2>
          <p className="mt-2">
            {SITE_CONFIG.appName} is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
            without warranties of any kind, express or implied. To the fullest extent permitted by
            applicable law, the maintainers shall not be liable for any indirect, incidental, or
            consequential damages, including loss of data or server unavailability.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
          <h2 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            6. Privacy &amp; Contact
          </h2>
          <p className="mt-2">
            Your use of the app is also governed by our{' '}
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
            . Questions may be directed to{' '}
            <a
              href={`mailto:${SITE_CONFIG.supportEmail}`}
              className="font-medium text-[var(--accent-600)] underline underline-offset-2 dark:text-[var(--accent-400)]"
            >
              {SITE_CONFIG.supportEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
};
