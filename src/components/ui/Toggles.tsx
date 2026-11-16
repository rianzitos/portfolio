import { Moon, Sun } from 'lucide-react'
import { ui } from '../../content/ui'
import { useLang } from '../../i18n'
import { cn } from '../../lib/cn'
import { useTheme } from '../../lib/theme'

/** Alterna entre português e inglês. Mostra os dois códigos, com o idioma atual em destaque. */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang()
  const next = lang === 'pt' ? 'en' : 'pt'
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={t(ui.header.switchLanguage)}
      lang={next === 'en' ? 'en' : 'pt-BR'}
      className={cn(
        'eyebrow inline-flex h-11 items-center gap-1 px-2 transition-opacity hover:opacity-100',
        className,
      )}
    >
      <span aria-hidden className={lang === 'pt' ? 'border-b border-current pb-0.5 font-medium' : 'opacity-50'}>
        PT
      </span>
      <span aria-hidden className="opacity-40">
        /
      </span>
      <span aria-hidden className={lang === 'en' ? 'border-b border-current pb-0.5 font-medium' : 'opacity-50'}>
        EN
      </span>
    </button>
  )
}

/** Alterna entre tema claro e escuro. */
export function ThemeToggle({ className }: { className?: string }) {
  const { mode, toggle } = useTheme()
  const { t } = useLang()
  const dark = mode === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(dark ? ui.header.lightTheme : ui.header.darkTheme)}
      aria-pressed={dark}
      className={cn('group inline-flex size-11 items-center justify-center', className)}
    >
      <span className="relative block size-[18px] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45">
        {dark ? <Sun aria-hidden size={18} strokeWidth={1.75} /> : <Moon aria-hidden size={18} strokeWidth={1.75} />}
      </span>
    </button>
  )
}
