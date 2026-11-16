import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'pt' | 'en'

/** Um valor com versão em português e em inglês. */
export interface Localized<T = string> {
  pt: T
  en: T
}

/** Texto que pode ser igual nos dois idiomas (string) ou traduzido. */
export type Text = string | Localized<string>

/** Atalho para escrever um texto nos dois idiomas: L('Olá', 'Hello'). */
export const L = <T,>(pt: T, en: T): Localized<T> => ({ pt, en })

export interface Translate {
  (value: Text): string
  <T>(value: Localized<T>): T
}

const STORAGE_KEY = 'rr-lang'
const isLang = (v: unknown): v is Lang => v === 'pt' || v === 'en'

const isLocalized = (v: unknown): v is Localized<unknown> =>
  typeof v === 'object' && v !== null && 'pt' in v && 'en' in v

/**
 * Idioma inicial, nesta ordem:
 *   1. ?lang=en ou ?lang=pt no endereço (bom para compartilhar um link já em inglês);
 *   2. a última escolha da pessoa neste navegador;
 *   3. o idioma do navegador: português se "pt" estiver entre os idiomas, inglês caso contrário.
 */
function detectLang(): Lang {
  try {
    const param = new URLSearchParams(window.location.search).get('lang')
    if (isLang(param)) return param
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (isLang(saved)) return saved
  } catch {
    /* armazenamento bloqueado: segue para o idioma do navegador */
  }
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language]
  return langs.some((l) => l?.toLowerCase().startsWith('pt')) ? 'pt' : 'en'
}

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translate
}

const LangContext = createContext<LangContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* sem armazenamento: a escolha vale só para esta visita */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const value = useMemo<LangContextValue>(() => {
    const t = ((v: unknown) => (isLocalized(v) ? v[lang] : v)) as Translate
    return { lang, setLang, t }
  }, [lang, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang precisa estar dentro de <LanguageProvider>')
  return ctx
}

/** Função de tradução: t(L('Olá', 'Hello')) devolve o texto no idioma atual. */
export const useT = () => useLang().t

/** Atualiza o título da aba e a descrição da página conforme o idioma. */
export function useDocumentMeta(title: Localized, description: Localized) {
  const { t } = useLang()
  const currentTitle = t(title)
  const currentDescription = t(description)
  useEffect(() => {
    document.title = currentTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', currentDescription)
  }, [currentTitle, currentDescription])
}
