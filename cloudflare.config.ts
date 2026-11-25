export default {
  worker: {
    name: 'envelope-landing',
    compatibilityDate: '2026-11-25',
    assets: {
      htmlHandling: 'auto-trailing-slash',
      notFoundHandling: 'single-page-application',
    },
    domains: ['envelope.milliways.si'],
  },
};
