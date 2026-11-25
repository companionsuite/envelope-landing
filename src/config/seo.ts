import { SITE_CONFIG } from './site';

export interface RouteSeo {
  path: '/' | '/connect' | '/privacy' | '/terms' | '/support';
  title: string;
  description: string;
  canonical: string;
}

export const ROUTE_SEO: Record<RouteSeo['path'], RouteSeo> = {
  '/': {
    path: '/',
    title: 'Envelope Companion — Native iOS Client for Actual Budget',
    description:
      'Zero-based envelope budgeting, always offline. A fast, native iPhone & iPad companion for your self-hosted Actual Budget server with receipt OCR and CRDT sync.',
    canonical: `${SITE_CONFIG.siteUrl}/`,
  },
  '/connect': {
    path: '/connect',
    title: 'Connect Your Server — Envelope Companion Setup Guide',
    description:
      'Step-by-step guide to connect Envelope Companion to your self-hosted Actual Budget server over HTTPS, PikaPods, Tailscale, or Home Wi-Fi.',
    canonical: `${SITE_CONFIG.siteUrl}/connect`,
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy — Envelope Companion for Actual Budget',
    description:
      'Zero analytics, zero tracking, and no developer servers. Learn how Envelope Companion connects directly to your own Actual Budget server.',
    canonical: `${SITE_CONFIG.siteUrl}/privacy`,
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Use — Envelope Companion for Actual Budget',
    description:
      'Read the Terms of Use for Envelope Companion, an independent offline-first iPhone and iPad client for your self-hosted Actual Budget server.',
    canonical: `${SITE_CONFIG.siteUrl}/terms`,
  },
  '/support': {
    path: '/support',
    title: 'Support & Contact — Envelope Companion for Actual Budget',
    description:
      'Get help connecting your self-hosted Actual Budget server, configuring E2EE, or contacting Envelope Companion support.',
    canonical: `${SITE_CONFIG.siteUrl}/support`,
  },
};

export function getRouteSeo(pathname: string): RouteSeo {
  if (pathname === '/connect' || pathname === '/setup') {
    return ROUTE_SEO['/connect'];
  }
  if (pathname === '/privacy') {
    return ROUTE_SEO['/privacy'];
  }
  if (pathname === '/terms') {
    return ROUTE_SEO['/terms'];
  }
  if (pathname === '/support') {
    return ROUTE_SEO['/support'];
  }
  return ROUTE_SEO['/'];
}

export function applyRouteSeo(pathname: string): void {
  const seo = getRouteSeo(pathname);
  document.title = seo.title;

  const setMeta = (selector: string, content: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMeta('meta[name="description"]', seo.description);
  setMeta('meta[property="og:url"]', seo.canonical);
  setMeta('meta[property="og:title"]', seo.title);
  setMeta('meta[property="og:description"]', seo.description);
  setMeta('meta[name="twitter:title"]', seo.title);
  setMeta('meta[name="twitter:description"]', seo.description);

  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) {
    canonicalEl.setAttribute('href', seo.canonical);
  }
}
