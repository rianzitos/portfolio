import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Mode = 'light' | 'dark'

const STORAGE_KEY = 'rr-theme'
const THEME_COLOR: Record<Mode, string> = { light: '#eeebe3', dark: '#151513' }

/**
 * O tema inicial é aplicado por um script curto no <head> (index.html), antes de a página
 * aparecer, para não piscar. Aqui só lemos o que ele já definiu.
 */
const initialMode = (): Mode => (document.documentElement.dataset.mode === 'dark' ? 'dark' : 'light')

interface ThemeContextValue {
  mode: Mode
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(initialMode)

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'dark') root.dataset.mode = 'dark'
    else delete root.dataset.mode
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[mode])
  }, [mode])

  const toggle = useCallback(() => {
    setMode((current) => {
      const next: Mode = current === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* sem armazenamento: a escolha vale só para esta visita */
      }
      return next
    })
  }, [])

  const value = useMemo(() => ({ mode, toggle }), [mode, toggle])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme precisa estar dentro de <ThemeProvider>')
  return ctx
}
