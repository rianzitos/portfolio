import { MotionConfig } from 'motion/react'
import { useEffect, type ReactNode } from 'react'
import { LanguageProvider } from '../../i18n'
import { initSmoothScroll } from '../../lib/smoothScroll'
import { ThemeProvider } from '../../lib/theme'

/** Tudo o que as duas páginas compartilham: idioma, tema, rolagem suave e respeito a "reduzir movimento". */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => initSmoothScroll(), [])

  return (
    <LanguageProvider>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ThemeProvider>
    </LanguageProvider>
  )
}
