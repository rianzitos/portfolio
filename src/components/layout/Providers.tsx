import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { LanguageProvider } from '../../i18n'
import { ThemeProvider } from '../../lib/theme'

/** Tudo o que as duas páginas compartilham: idioma, tema e respeito a "reduzir movimento". */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ThemeProvider>
    </LanguageProvider>
  )
}
