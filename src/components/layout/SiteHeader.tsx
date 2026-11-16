import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { profile } from '../../content/profile'
import { cn } from '../../lib/cn'
import { useActiveSection } from '../../lib/useActiveSection'
import { useHeaderTheme } from '../../lib/useHeaderTheme'
import { useLocalTime } from '../../lib/useLocalTime'
import { pad2 } from '../../lib/format'
import { BrandIcon } from '../ui/BrandIcon'

export interface NavItem {
  id: string
  label: string
  href: string
}

interface SiteHeaderProps {
  items: readonly NavItem[]
  /** Na página do estudo de caso, mostra "← Portfólio" no lugar do nome. */
  backHref?: string
  homeHref?: string
}

export function SiteHeader({ items, backHref, homeHref = '#topo' }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const close = useCallback(() => setOpen(false), [])
  const dark = useHeaderTheme()
  const ids = useMemo(() => items.map((i) => i.id), [items])
  const active = useActiveSection(ids)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tone = dark && !open ? 'dark' : 'light'

  return (
    <>
      <a
        href="#conteudo"
        className="fixed top-2 left-2 z-[60] -translate-y-20 bg-signal px-4 py-3 font-semibold text-ink focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
          scrolled && !open && (tone === 'dark' ? 'bg-ink/85 backdrop-blur-md' : 'bg-paper/85 backdrop-blur-md'),
          tone === 'dark' ? 'text-paper' : 'text-ink',
        )}
      >
        <div className="shell flex h-16 items-center gap-6">
          {backHref ? (
            <a href={backHref} className="group inline-flex min-h-11 items-center gap-2 font-semibold tracking-[-0.01em]">
              <ArrowLeft aria-hidden size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Portfólio</span>
              <span className={cn('hidden font-normal sm:inline', tone === 'dark' ? 'text-muted-dark' : 'text-muted')}>
                / {profile.name}
              </span>
            </a>
          ) : (
            <a href={homeHref} className="inline-flex min-h-11 items-center" aria-label={`${profile.name}, voltar ao topo`}>
              <span className="flex items-baseline gap-3">
              <span className="text-[1.05rem] font-extrabold tracking-[-0.03em] [font-stretch:125%]">
                {profile.name}
                <span className="text-signal">.</span>
              </span>
              <span className={cn('eyebrow hidden md:inline', tone === 'dark' ? 'text-muted-dark' : 'text-muted')}>
                Dev. em formação
              </span>
              </span>
            </a>
          )}

          <nav aria-label="Seções" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item, i) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'eyebrow relative inline-flex min-h-11 items-center gap-1.5 px-2.5 transition-opacity',
                        isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100',
                      )}
                    >
                      <span className="text-[0.62rem] tabular opacity-70">{pad2(i + 1)}</span>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-2.5 bottom-2 h-px bg-current"
                          transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <a
            href={profile.links.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'eyebrow hidden min-h-11 items-center gap-1.5 border px-3 transition-colors lg:inline-flex',
              tone === 'dark' ? 'border-paper/30 hover:bg-paper hover:text-ink' : 'border-ink/25 hover:bg-ink hover:text-paper',
            )}
          >
            <BrandIcon name="github" size={14} />
            GitHub
            <ArrowUpRight aria-hidden size={13} />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="eyebrow ml-auto inline-flex min-h-11 items-center gap-2 px-1 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? 'Fechar' : 'Menu'}</span>
            <span aria-hidden className="relative block h-2.5 w-5">
              <span
                className={cn(
                  'absolute left-0 h-px w-full bg-current transition-transform duration-300',
                  open ? 'top-1/2 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-px w-full bg-current transition-transform duration-300',
                  open ? 'top-1/2 -rotate-45' : 'bottom-0',
                )}
              />
            </span>
          </button>
        </div>
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-signal"
        />
      </header>

      <MobileMenu open={open} onClose={close} items={items} active={active} backHref={backHref} toggleRef={toggleRef} />
    </>
  )
}

function MobileMenu({
  open,
  onClose,
  items,
  active,
  backHref,
  toggleRef,
}: {
  open: boolean
  onClose: () => void
  items: readonly NavItem[]
  active: string | null
  backHref?: string
  toggleRef: RefObject<HTMLButtonElement | null>
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const time = useLocalTime(profile.location.timeZone)

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        // Mantém o foco dentro do menu enquanto ele está aberto.
        const focusables = [
          ...(toggleRef.current ? [toggleRef.current] : []),
          ...panelRef.current.querySelectorAll<HTMLElement>('a, button'),
        ]
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onResize = () => window.innerWidth >= 1024 && onClose()
    window.addEventListener('resize', onResize)
    return () => {
      root.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open, onClose, toggleRef])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-mobile"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col bg-paper pt-16 text-ink lg:hidden"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <nav aria-label="Seções" className="shell flex-1 overflow-y-auto pt-6">
            <ol>
              {backHref && (
                <li className="border-t border-ink/15">
                  <a href={backHref} className="flex min-h-14 items-baseline gap-4 py-3" onClick={onClose}>
                    <span className="eyebrow w-6 text-muted">←</span>
                    <span className="text-3xl font-extrabold tracking-[-0.03em] [font-stretch:125%]">Portfólio</span>
                  </a>
                </li>
              )}
              {items.map((item, i) => (
                <motion.li
                  key={item.id}
                  className="border-t border-ink/15"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={onClose}
                    aria-current={active === item.id ? 'true' : undefined}
                    className="flex min-h-14 items-baseline gap-4 py-3"
                  >
                    <span className="eyebrow w-6 tabular text-muted">{pad2(i + 1)}</span>
                    <span className="text-[clamp(2rem,9vw,3rem)] leading-none font-extrabold tracking-[-0.035em] [font-stretch:125%]">
                      {item.label}
                    </span>
                    {active === item.id && <span aria-hidden className="ml-auto size-2.5 self-center bg-signal" />}
                  </a>
                </motion.li>
              ))}
            </ol>
          </nav>
          <div className="shell eyebrow flex items-center justify-between gap-4 border-t border-ink/15 py-5 text-muted">
            <span>
              {profile.location.city}, {profile.location.state} · {time}
            </span>
            <span className="flex gap-5 text-ink">
              <a href={profile.links.github.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center">
                GitHub
              </a>
              <a href={profile.links.linkedin.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center">
                LinkedIn
              </a>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
