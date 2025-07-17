import enTranslation from '@/locales/translations/en.json'
import thTranslation from '@/locales/translations/th.json'

export const i18nConfig = {
  defaultLocale: 'th',
  defaultNS: 'translation',
  locales: ['th', 'en'],
  langDirection: {
    th: 'ltr',
    en: 'ltr'
  },
  cookieName: 'lang',
  resources: {
    en: enTranslation,
    th: thTranslation
  }
} as const

export type Locale = (typeof i18nConfig)['locales'][number]
