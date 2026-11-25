import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const PRERENDER_ROUTES = [
  {
    route: 'connect',
    title: 'Connect Your Server — Envelope Companion Setup Guide',
    description:
      'Step-by-step guide to connect Envelope Companion to your self-hosted Actual Budget server over HTTPS, PikaPods, Tailscale, or Home Wi-Fi.',
    canonical: 'https://envelope.milliways.si/connect',
  },
  {
    route: 'privacy',
    title: 'Privacy Policy — Envelope Companion for Actual Budget',
    description:
      'Zero analytics, zero tracking, and no developer servers. Learn how Envelope Companion connects directly to your own Actual Budget server.',
    canonical: 'https://envelope.milliways.si/privacy',
  },
  {
    route: 'terms',
    title: 'Terms of Use — Envelope Companion for Actual Budget',
    description:
      'Read the Terms of Use for Envelope Companion, an independent offline-first iPhone and iPad client for your self-hosted Actual Budget server.',
    canonical: 'https://envelope.milliways.si/terms',
  },
  {
    route: 'support',
    title: 'Support & Contact — Envelope Companion for Actual Budget',
    description:
      'Get help connecting your self-hosted Actual Budget server, configuring E2EE, or contacting Envelope Companion support.',
    canonical: 'https://envelope.milliways.si/support',
  },
] as const;

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function prerenderRouteHtmlPlugin(): Plugin {
  return {
    name: 'prerender-route-html',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;

      const template = fs.readFileSync(indexHtmlPath, 'utf8');
      for (const item of PRERENDER_ROUTES) {
        const html = template
          .replace(/<title>[^<]*<\/title>/, `<title>${item.title}</title>`)
          .replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
            `<meta name="description" content="${escapeAttr(item.description)}" />`
          )
          .replace(
            /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
            `<link rel="canonical" href="${item.canonical}" />`
          )
          .replace(
            /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
            `<meta property="og:url" content="${item.canonical}" />`
          )
          .replace(
            /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
            `<meta property="og:title" content="${escapeAttr(item.title)}" />`
          )
          .replace(
            /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
            `<meta property="og:description" content="${escapeAttr(item.description)}" />`
          )
          .replace(
            /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
            `<meta name="twitter:title" content="${escapeAttr(item.title)}" />`
          )
          .replace(
            /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
            `<meta name="twitter:description" content="${escapeAttr(item.description)}" />`
          );

        const outDir = path.join(distDir, item.route);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderRouteHtmlPlugin()],
});
