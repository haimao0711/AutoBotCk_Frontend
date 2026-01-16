// next-i18next.config.js
/** @type {import('next-i18next').UserConfig} */
const nextI18NextConfig = {
	i18n: {
		defaultLocale: 'en-US',
		locales: ['en-US', 'de-DE', 'fr-FR', 'tr-TR'],
		localeDetection: false, // phải false
	},
	reloadOnPrerender: process.env.NODE_ENV === 'development',
	nonExplicitSupportedLngs: true,
};

module.exports = nextI18NextConfig;
