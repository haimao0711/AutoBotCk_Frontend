// next-i18next.config.ts
import type { UserConfig } from 'next-i18next';

const nextI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', 'de-DE', 'fr-FR', 'tr-TR'],
    localeDetection: false, // đúng type
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  // @ts-ignore: nonExplicitSupportedLngs is allowed in config but not in type
  nonExplicitSupportedLngs: true,
};
