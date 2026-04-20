import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { locales, type Locale, type Translations } from './locales'

type LangPref = Locale | 'auto'

function detectLocale(): Locale {
  const lang = navigator.language || 'en'
  if (lang.startsWith('zh')) return 'zh-TW'
  return 'en'
}

function resolve(pref: LangPref): Locale {
  return pref === 'auto' ? detectLocale() : pref
}

const STORAGE_KEY = 'energy-buddy-lang'

interface I18nContextValue {
  t: Translations
  locale: Locale
  langPref: LangPref
  setLangPref: (pref: LangPref) => void
}

const I18nContext = createContext<I18nContextValue>(null!)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [langPref, setLangPrefState] = useState<LangPref>(() => {
    return (localStorage.getItem(STORAGE_KEY) as LangPref) || 'auto'
  })

  const locale = resolve(langPref)
  const t = locales[locale]

  const setLangPref = (pref: LangPref) => {
    localStorage.setItem(STORAGE_KEY, pref)
    setLangPrefState(pref)
  }

  useEffect(() => {
    document.documentElement.lang = locale === 'zh-TW' ? 'zh-TW' : 'en'
  }, [locale])

  return (
    <I18nContext.Provider value={{ t, locale, langPref, setLangPref }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
