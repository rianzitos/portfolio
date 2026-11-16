import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { BrowserFrame } from '../components/ui/Frames'
import { Lightbox } from '../components/ui/Dialog'
import type { Screen } from '../content/sicapda'
import { cn } from '../lib/cn'
import { pad2 } from '../lib/format'
import { ui } from '../content/ui'
import { useT } from '../i18n'

/** Galeria de telas com abas (setas do teclado navegam) e ampliação em tela cheia. */
export function ScreenGallery({ screens, className }: { screens: readonly Screen[]; className?: string }) {
  const t = useT()
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)
  const baseId = useId()
  const screen = screens[index]
  const screenName = `${t(ui.gallery.screenOf)} "${t(screen.label)}" ${t(ui.gallery.ofSicapda)}`

  const go = (next: number, focus = false) => {
    const i = (next + screens.length) % screens.length
    setIndex(i)
    const tab = tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[i]
    tab?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    if (focus) tab?.focus()
  }

  return (
    <div className={cn('text-paper', className)}>
      <div className="flex items-end justify-between gap-4 border-b border-paper/15">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label={t(ui.gallery.aria)}
          className="-mb-px flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(index + 1, true)
            if (e.key === 'ArrowLeft') go(index - 1, true)
            if (e.key === 'Home') go(0, true)
            if (e.key === 'End') go(screens.length - 1, true)
          }}
        >
          {screens.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              id={`${baseId}-tab-${s.id}`}
              aria-selected={i === index}
              aria-controls={`${baseId}-panel`}
              tabIndex={i === index ? 0 : -1}
              onClick={() => go(i)}
              className={cn(
                'eyebrow flex min-h-12 shrink-0 items-center gap-2 border-b-2 px-3 whitespace-nowrap transition-colors',
                i === index ? 'border-sica text-paper' : 'border-transparent text-muted-dark hover:text-paper',
              )}
            >
              <span className="tabular text-[0.62rem] opacity-60">{pad2(i + 1)}</span>
              {t(s.label)}
            </button>
          ))}
        </div>
        <div className="hidden shrink-0 gap-1 pb-1.5 sm:flex">
          <IconButton label={t(ui.gallery.previous)} onClick={() => go(index - 1)}>
            <ArrowLeft aria-hidden size={16} />
          </IconButton>
          <IconButton label={t(ui.gallery.next)} onClick={() => go(index + 1)}>
            <ArrowRight aria-hidden size={16} />
          </IconButton>
        </div>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${screen.id}`}
        className="mt-5"
      >
        <BrowserFrame path={screen.path}>
          <button
            type="button"
            onClick={() => setZoom(true)}
            className="group/zoom relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden bg-ink-3"
          >
            <span className="sr-only">
              {t(ui.gallery.enlargeScreen)} {t(screen.label)}
            </span>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img
                key={screen.id}
                src={screen.src}
                alt={`${screenName}. ${t(screen.caption)}`}
                width={2400}
                height={1500}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover object-top"
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
            <span className="eyebrow absolute right-3 bottom-3 inline-flex items-center gap-2 bg-ink/80 px-3 py-2 text-paper opacity-0 transition-opacity group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100">
              <Maximize2 aria-hidden size={13} /> {t(ui.common.enlarge)}
            </span>
          </button>
        </BrowserFrame>
        <div className="mt-4 flex items-start justify-between gap-6">
          <p className="max-w-2xl text-[0.98rem] text-paper/85 text-pretty" aria-live="polite">
            <span className="font-semibold text-paper">{t(screen.label)}.</span> {t(screen.caption)}
          </p>
          <p className="eyebrow shrink-0 tabular text-muted-dark">
            {pad2(index + 1)} / {pad2(screens.length)}
          </p>
        </div>
      </div>

      <Lightbox
        image={zoom ? { src: screen.src, alt: screenName, caption: `${t(screen.label)} — ${t(screen.caption)}` } : null}
        onClose={() => setZoom(false)}
      />
    </div>
  )
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center border border-paper/20 transition-colors hover:bg-paper hover:text-ink"
    >
      {children}
    </button>
  )
}
