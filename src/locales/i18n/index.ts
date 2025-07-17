import { setDefaultOptions } from 'date-fns'
import { th, enUS } from 'date-fns/locale' // Import necessary locales
import i18n from 'i18next'
import { initReactI18next, useTranslation as useTranslate } from 'react-i18next'
import * as Localization from 'expo-localization'
import { setItem, storage } from '@/lib/storage'
import { i18nConfig, Locale } from '@/locales/i18n/default'
import { getLabel } from '@/services/api/label'
import { Label } from '@/common/interface/label'
import { useMMKVString } from 'react-native-mmkv'
import { useCallback } from 'react'

// Map i18n languages to date-fns locales
const dateFnsLocales: Record<Locale, any> = {
  th: th,
  en: enUS
}

type TranslationResources = Record<string, string>

export const getLanguage = () => storage.getString(i18nConfig.cookieName)

const fetchTranslations = async (lang: Locale): Promise<TranslationResources> => {
  try {
    // 1. Try to load from local storage (MMKV)
    // const storedTranslations = storage.getString(`i18n_resources_${lang}`)
    // if (storedTranslations) {
    //   console.log(`Loaded translations for ${lang} from local storage`)
    //   return JSON.parse(storedTranslations) as TranslationResources
    // }

    // 2. Use resources from i18nConfig if available (bundled JSON)
    const bundledResources = i18nConfig.resources[lang]
    if (bundledResources && Object.keys(bundledResources).length > 0) {
      console.log(`Loaded translations for ${lang} from bundled resources`)
      // Optionally store to MMKV so it's quicker next time
      console.log(bundledResources)
      await setItem(`i18n_resources_${lang}`, bundledResources)
      return bundledResources as TranslationResources
    }

    // 3. Fallback to API call if not found in local storage or bundled resources
    console.log(`Fetching translations for ${lang} from API`)
    const response = await getLabel(lang)
    const resources = convertResource(response.data)

    await setItem(`i18n_resources_${lang}`, resources)
    return resources
  } catch (error) {
    console.error('Error fetching translations:', error)
    return {}
  }
}

const setDateFnsLocale = (lang: Locale) => {
  const locale: any = dateFnsLocales[lang] || th // Default to th if locale is not mapped
  setDefaultOptions({ locale })
}

const loadInitialResources = async (): Promise<void> => {
  try {
    const lang: Locale = (getLanguage() || i18nConfig.defaultLocale) as Locale
    setDateFnsLocale(lang) // Set date-fns locale dynamically

    const resources = await fetchTranslations(lang)

    await i18n.use(initReactI18next).init({
      fallbackLng: lang,
      resources: {
        [lang]: { translation: resources }
      },
      interpolation: {
        escapeValue: false,
        prefix: '{{',
        suffix: '}}'
      },
      nsSeparator: ';;',
      keySeparator: ';;'
    })

    await setItem(`i18n_resources_${lang}`, resources)
  } catch (error) {
    console.error('Error loading initial resources:', error)
  }
}

const changeLanguage = async (newLang: Locale): Promise<void> => {
  try {
    const resources = await fetchTranslations(newLang)
    i18n.addResources(newLang, 'translation', resources)
    i18n.changeLanguage(newLang)
    setDateFnsLocale(newLang) // Update date-fns locale on language change

    await setItem(`i18n_resources_${newLang}`, resources)
  } catch (error) {
    console.error('Error changing language:', error)
  }
}

export const useSelectedLanguage = () => {
  const [language, setLang] = useMMKVString(i18nConfig.cookieName)

  const setLanguage = useCallback(
    (lang: Locale) => {
      if (lang && lang !== language) {
        changeLanguage(lang as Locale)
        setLang(lang)
      }
    },
    [language, setLang]
  )

  return { language: language as Locale, setLanguage }
}

export const t = (key: string, options?: Record<string, unknown>): string => {
  return i18n.t(key, options)
}

export const useTranslation = () => {
  const { t } = useTranslate()
  return {
    t
  }
}

// Initialize resources
loadInitialResources()

const convertResource = (data: Label[]) => {
  try {
    const labelsMap: { [key: string]: string } = {}
    const prefix = ''
    data.forEach(label => {
      labelsMap[label.key] = (prefix ? prefix : '') + label.value
    })
    return labelsMap
  } catch (err) {
    return {}
  }
}

export default i18n
