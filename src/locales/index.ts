import { createI18n } from 'vue-i18n'
import { getCurrentLanguage } from '@/utils/systems/lang'
import { koreanDictionary } from '@/locales/langs/korean'
import { englishDictionary } from '@/locales/langs/english'
import { japaneseDictionary } from '@/locales/langs/japanese'

const messages = {
  /* korean */
  ko: koreanDictionary,
  /* english */
  en: englishDictionary,
  /* japanese */
  ja: japaneseDictionary
}

export const i18n = createI18n({
  // legacy: false,
  locale: getCurrentLanguage(), // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
})

export default i18n
