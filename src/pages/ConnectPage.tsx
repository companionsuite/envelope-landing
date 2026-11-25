import React from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Globe,
  KeyRound,
  Lock,
  Network,
  Server,
  Shield,
  Sparkles,
  Wifi,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface ConnectPageProps {
  onNavigate: (path: string) => void;
}

interface ConnectionMethod {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  whenToUse: string;
  prerequisites: string[];
  steps: Array<{ title: string; detail: React.ReactNode }>;
  exampleUrls: string[];
  troubleshooting: string[];
}

const METHODS: ConnectionMethod[] = [
  {
    id: 'remote-url',
    badge: 'Option 1 · Anywhere',
    title: 'Remote HTTPS / PikaPods',
    subtitle:
      'Connect from anywhere over cellular or Wi-Fi using your own domain with TLS or PikaPods.',
    icon: Globe,
    whenToUse:
      'Best when you host Actual Budget on PikaPods or behind an HTTPS reverse proxy (Caddy, Traefik, nginx) and want seamless access away from home.',
    prerequisites: [
      'A PikaPods Actual Budget instance or a domain (for example, budget.yourdomain.com) with HTTPS.',
      'Your Actual Budget server password.',
      'Your E2EE encryption password, if end-to-end encryption is enabled on your budget file.',
    ],
    steps: [
      {
        title: 'Expose Actual Budget over HTTPS (port 443)',
        detail: (
          <>
            If self-hosting, configure <strong>Caddy</strong>, <strong>Traefik</strong>, or{' '}
            <strong>nginx</strong> to terminate HTTPS in front of{' '}
            <code className="font-mono">actual-server</code> (default internal port{' '}
            <code className="font-mono">5006</code>). PikaPods instances include HTTPS out of the
            box.
          </>
        ),
      },
      {
        title: 'Enter your Server URL in Envelope Companion',
        detail: (
          <>
            Open {SITE_CONFIG.appName} &rarr; tap <strong>Connect Server</strong> (or{' '}
            <strong>Settings &rarr; Server</strong>), enter your{' '}
            <code className="font-mono">https://</code> URL (omit <code className="font-mono">:5006</code>),
            and sign in with your Actual server password.
          </>
        ),
      },
      {
        title: 'Select your budget & unlock E2EE (if enabled)',
        detail: (
          <>
            Choose your budget file from the list. If your budget uses end-to-end encryption, enter
            your E2EE password when prompted—your key is stored securely in the iOS Keychain.
          </>
        ),
      },
    ],
    exampleUrls: ['https://budget.yourdomain.com', 'https://actual-name.pikapods.net'],
    troubleshooting: [
      'Certificate errors: iOS requires a trusted HTTPS certificate (such as Let’s Encrypt). Self-signed certificates fail unless their root CA is installed and trusted in iOS Settings.',
      '401 / Password rejected: verify your Actual server password (not your E2EE budget password) on the initial login step.',
    ],
  },
  {
    id: 'tailscale',
    badge: 'Option 2 · Private Mesh VPN',
    title: 'Tailscale (Zero Public Exposure)',
    subtitle:
      'Reach your Actual Budget server from anywhere over an encrypted WireGuard tailnet—no open router ports required.',
    icon: Network,
    whenToUse:
      'Best when you want remote access from anywhere without exposing your Actual Budget server to the public internet.',
    prerequisites: [
      'A Tailscale account (free personal plan works).',
      'Tailscale installed on your Actual Budget server host.',
      'The Tailscale iOS app installed on your iPhone or iPad and signed in to the same tailnet.',
    ],
    steps: [
      {
        title: 'Install Tailscale on your server and iOS device',
        detail: (
          <>
            Install Tailscale on the machine running <code className="font-mono">actual-server</code>{' '}
            and install <strong>Tailscale</strong> from the App Store on your iPhone or iPad. Sign
            in to the <strong>same tailnet</strong> on both devices.
          </>
        ),
      },
      {
        title: 'Copy your Tailscale IP or MagicDNS hostname',
        detail: (
          <>
            In the Tailscale app or admin console, copy your server&apos;s{' '}
            <code className="font-mono">100.x.y.z</code> IPv4 address or its MagicDNS hostname (such
            as <code className="font-mono">actual.tailnet.ts.net</code>).
          </>
        ),
      },
      {
        title: 'Enter the Tailscale URL in Envelope Companion',
        detail: (
          <>
            Use <code className="font-mono">http://100.x.y.z:5006</code> for direct Tailscale IP
            access, or <code className="font-mono">https://actual.tailnet.ts.net</code> if you use{' '}
            <code className="font-mono">tailscale serve</code> for HTTPS.
          </>
        ),
      },
    ],
    exampleUrls: ['http://100.101.102.103:5006', 'https://actual.tailnet.ts.net'],
    troubleshooting: [
      'Timeout when away from home: check that Tailscale is Active/Connected on both your iOS device and the server host.',
      'Server bound only to localhost: ensure actual-server listens on 0.0.0.0:5006, not 127.0.0.1:5006.',
    ],
  },
  {
    id: 'local-network',
    badge: 'Option 3 · Home Wi-Fi',
    title: 'Home Wi-Fi / LAN',
    subtitle:
      'Sync directly over your home or office Wi-Fi without exposing Actual Budget outside your network.',
    icon: Wifi,
    whenToUse:
      'Best when you budget offline during the day and sync CRDT changes when your iPhone or iPad is back on home Wi-Fi.',
    prerequisites: [
      'Your iPhone or iPad and your Actual Budget server must be on the same Wi-Fi / LAN.',
      'Your server’s local IP address (e.g. 192.168.1.50) and port (default 5006).',
      'Local firewall rules allowing incoming TCP traffic on port 5006.',
    ],
    steps: [
      {
        title: 'Do not enter "localhost" on your iPhone',
        detail: (
          <>
            On iOS, <code className="font-mono">localhost</code> (or{' '}
            <code className="font-mono">127.0.0.1</code>) refers to <strong>the iPhone itself</strong>,
            not your Mac, PC, NAS, or Raspberry Pi. Always use your server&apos;s LAN IP address or{' '}
            <code className="font-mono">.local</code> hostname.
          </>
        ),
      },
      {
        title: 'Enter your LAN IP and port 5006',
        detail: (
          <>
            Enter <code className="font-mono">http://192.168.1.50:5006</code> in{' '}
            {SITE_CONFIG.appName}. Make sure Docker publishes{' '}
            <code className="font-mono">5006:5006</code> (not{' '}
            <code className="font-mono">127.0.0.1:5006:5006</code>).
          </>
        ),
      },
      {
        title: 'Allow iOS Local Network permission',
        detail: (
          <>
            When iOS prompts to find and connect to devices on your local network, tap{' '}
            <strong>Allow</strong>.
          </>
        ),
      },
    ],
    exampleUrls: ['http://192.168.1.50:5006', 'http://actual.local:5006'],
    troubleshooting: [
      'Local Network denied: open iOS Settings → Privacy & Security → Local Network and enable Envelope Companion.',
      'IP changed after reboot: assign a static DHCP reservation for your server in your router.',
    ],
  },
];

const COMMON_ERRORS = [
  {
    title: 'Connection Timeout / Server Unreachable',
    detail:
      'Your iPhone cannot reach that host and port. Verify you are on the same Wi-Fi (for LAN IPs), Tailscale is connected (for 100.x.y.z), actual-server is running, and port 5006 is open.',
  },
  {
    title: 'Wrong Port (:5006 vs 443)',
    detail:
      'Direct LAN and Tailscale IP connections to actual-server use port :5006. HTTPS reverse proxies and PikaPods use standard port 443, so omit :5006 from https:// URLs.',
  },
  {
    title: 'E2EE Unlock Failed',
    detail:
      'Your Actual server login password and your budget’s End-to-End Encryption (E2EE) password are separate. Enter your E2EE key when prompted after selecting your budget file.',
  },
  {
    title: 'SSL / Certificate Error',
    detail:
      'iOS blocks untrusted self-signed HTTPS certificates. Use a valid Let’s Encrypt certificate (via Caddy, Traefik, or nginx) or trust your private root CA in iOS Settings → General → About → Certificate Trust Settings.',
  },
] as const;

export const ConnectPage: React.FC<ConnectPageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-10">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-secondary)] transition hover:text-[var(--ink-primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--accent-50)] px-3.5 py-1 text-xs font-medium text-[var(--accent-700)] dark:text-[var(--accent-400)]">
          <Server className="h-3.5 w-3.5" />
          Connection Guide
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
          How to Connect to Your Actual Budget Server
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--ink-secondary)]">
          {SITE_CONFIG.appName} connects directly from your iPhone or iPad to your own self-hosted{' '}
          <code className="font-mono">actual-server</code> instance. Choose the setup that matches
          how you host your server.
        </p>

        {/* Quick jump links */}
        <div className="mt-6 flex flex-wrap gap-2">
          {METHODS.map((method) => {
            const Icon = method.icon;
            return (
              <a
                key={method.id}
                href={`#${method.id}`}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] px-3.5 py-2 text-sm font-medium text-[var(--ink-primary)] transition hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-2)]"
              >
                <Icon className="h-4 w-4 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
                {method.title.split(' (')[0]}
              </a>
            );
          })}
        </div>
      </div>

      {/* Free Demo Mode note */}
      <section className="mb-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--accent-50)] p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-surface-1)] text-[var(--accent-600)] shadow-xs dark:text-[var(--accent-400)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-base font-semibold text-[var(--ink-primary)]">
              No server ready yet? Try the free built-in Demo Mode
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--ink-secondary)]">
              Tap <strong>Try Demo Mode</strong> on the welcome screen to explore Envelope
              Companion locally with <strong>Standard</strong> or <strong>100-item Large</strong>{' '}
              sample budgets. Connect your real Actual Budget server anytime in{' '}
              <strong>Settings</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Three Connection Methods */}
      <div className="space-y-8">
        {METHODS.map((method) => {
          const Icon = method.icon;
          return (
            <section
              key={method.id}
              id={method.id}
              className="scroll-mt-24 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-50)] px-3 py-1 text-xs font-medium text-[var(--accent-700)] dark:text-[var(--accent-400)]">
                    <Icon className="h-3.5 w-3.5" />
                    {method.badge}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--ink-primary)]">
                    {method.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-secondary)]">
                    {method.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                    When to use
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                    {method.whenToUse}
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                    Example Server URL
                  </h3>
                  <div className="mt-2 space-y-1.5">
                    {method.exampleUrls.map((url) => (
                      <div
                        key={url}
                        className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] px-3 py-1.5 font-mono text-xs text-[var(--ink-primary)] sm:text-sm"
                      >
                        {url}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-[var(--ink-primary)]">Prerequisites</h3>
                <ul className="mt-2.5 space-y-2 text-sm text-[var(--ink-secondary)]">
                  {method.prerequisites.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-[var(--ink-primary)]">
                  Step-by-step setup
                </h3>
                <ol className="mt-3 space-y-3">
                  {method.steps.map((step, index) => (
                    <li
                      key={step.title}
                      className="flex items-start gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-600)] text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <div className="text-sm leading-relaxed">
                        <div className="font-semibold text-[var(--ink-primary)]">{step.title}</div>
                        <p className="mt-1 text-[var(--ink-secondary)]">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--ink-primary)]">
                  <Shield className="h-4 w-4 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
                  Troubleshooting
                </h3>
                <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[var(--ink-secondary)]">
                  {method.troubleshooting.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      {/* E2EE Note */}
      <section className="mt-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[var(--ink-primary)]">
          <Lock className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
          End-to-End Encrypted (E2EE) Budgets
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
          If your Actual Budget file has E2EE enabled, {SITE_CONFIG.appName} prompts for your
          encryption password after you select the budget. Your E2EE key is stored in the iOS
          Keychain and never leaves your device unencrypted.
        </p>
      </section>

      {/* Common Errors */}
      <section
        id="troubleshooting"
        className="mt-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] p-6 sm:p-8"
      >
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="h-5 w-5 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
          <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--ink-primary)]">
            Common Connection Errors
          </h2>
        </div>
        <p className="mt-2 text-sm text-[var(--ink-secondary)]">
          Quick checks if your server test fails during onboarding or in Settings.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {COMMON_ERRORS.map((err) => (
            <div
              key={err.title}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4"
            >
              <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--ink-primary)]">
                <KeyRound className="h-4 w-4 shrink-0 text-[var(--accent-600)] dark:text-[var(--accent-400)]" />
                {err.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                {err.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-6 text-sm">
          <p className="text-[var(--ink-secondary)]">
            Still stuck? Reach out via{' '}
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
            .
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="font-medium text-[var(--accent-600)] hover:underline dark:text-[var(--accent-400)]"
          >
            Return to Home &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
