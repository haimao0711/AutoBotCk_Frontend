module.exports = {
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', 'de-DE', 'fr-FR', 'tr-TR'],
    localeDetection: false,
  },
  nonExplicitSupportedLngs: true,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
