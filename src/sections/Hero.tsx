import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { BrandIcon } from '../components/ui/BrandIcon'
import { ButtonLink } from '../components/ui/ButtonLink'
import { sections } from '../content/navigation'
import { profile } from '../content/profile'
import { pad2 } from '../lib/format'
import { useLocalTime } from '../lib/useLocalTime'
import { ui } from '../content/ui'
import { useT } from '../i18n'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const t = useT()
  const time = useLocalTime(profile.location.timeZone)

  return (
    <section id="topo" className="grain relative flex min-h-[100svh] flex-col overflow-hidden pt-16">
      <GridLines />

      <div className="shell relative flex flex-1 flex-col pb-8 [container-type:inline-size] sm:pb-10">
        <motion.div
          className="grid-12 eyebrow gap-y-2 border-b border-ink/15 py-4 text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="col-span-6 md:col-span-4">
            {t(ui.common.portfolio)} — {new Date().getFullYear()}
          </p>
          <p className="col-span-6 text-right md:col-span-4 md:text-left">
            {profile.location.city}, {profile.location.state} · <span className="tabular text-ink">{time}</span>
          </p>
          <p className="col-span-12 flex items-center gap-2 md:col-span-4 md:justify-end">
            <span aria-hidden className="size-2 rounded-full bg-signal motion-safe:animate-[pulse-dot_2.4s_infinite]" />
            <span className="text-ink">{t(profile.availability)}</span>
          </p>
        </motion.div>

        <h1 className="mt-[clamp(2rem,7vh,5.5rem)]">
          <span className="sr-only">
            {profile.name}, {t(profile.role).toLowerCase()}
          </span>
          <VariableName />
        </h1>

        <div className="grid-12 mt-auto gap-y-12 pt-12">
          <motion.div
            className="col-span-12 md:col-span-6 lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.55 }}
          >
            <p className="eyebrow text-signal-ink">{t(profile.role)}</p>
            <p className="mt-4 max-w-[34rem] text-[1.2rem] leading-[1.45] text-pretty sm:text-[1.35rem]">{t(profile.heroBio)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#sicapda" arrow="down">
                {t(ui.hero.viewProjects)}
              </ButtonLink>
              <ButtonLink href="#contato" variant="outline">
                {t(ui.hero.contact)}
              </ButtonLink>
            </div>
            <ul className="eyebrow mt-7 flex gap-6">
              <li>
                <a
                  href={profile.links.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-2"
                >
                  <BrandIcon name="github" size={16} />
                  <span className="link-underline">GitHub</span>
                  <span className="sr-only">{t(ui.common.newTab)}</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-2"
                >
                  <BrandIcon name="linkedin" size={16} />
                  <span className="link-underline">LinkedIn</span>
                  <span className="sr-only">{t(ui.common.newTab)}</span>
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.nav
            aria-label={t(ui.hero.indexAria)}
            className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.7 }}
          >
            <p className="eyebrow mb-3 text-muted">{t(ui.hero.index)}</p>
            <ol className="border-b border-ink/15">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex min-h-11 items-baseline gap-3 border-t border-ink/15 py-2 transition-colors hover:text-signal-ink"
                  >
                    <span className="eyebrow w-6 shrink-0 tabular text-muted">{pad2(i + 1)}</span>
                    <span className="text-[1rem] font-semibold tracking-[-0.01em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5">
                      {t(s.label)}
                    </span>
                    <span aria-hidden className="leader" />
                    <span className="eyebrow text-muted">{t(s.note)}</span>
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>
        </div>
      </div>
    </section>
  )
}

/** Linhas da grade de 12 colunas, bem apagadas, como numa prancheta de diagramação. */
function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="shell grid-12 h-full">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className={`h-full border-l border-ink/[0.06] ${i % 3 !== 0 ? 'hidden md:block' : ''} ${i === 11 ? 'border-r' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * O nome em tipografia variável: com o mouse por perto, as letras ficam mais leves.
 * Só em telas com ponteiro fino e sem "reduzir movimento". As letras são atualizadas
 * direto no DOM (requestAnimationFrame), sem re-renderizar o React.
 */
function VariableName() {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || reduce) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const letters = Array.from(wrap.querySelectorAll<HTMLSpanElement>('[data-letter]'))
    const MAX = 800
    const MIN = 230
    let centers: { x: number; y: number }[] = []
    let target = letters.map(() => MAX)
    const current = letters.map(() => MAX)
    let frame = 0
    let pointer: { x: number; y: number } | null = null

    const measure = () => {
      centers = letters.map((el) => {
        const r = el.getBoundingClientRect()
        return { x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY }
      })
    }

    const tick = () => {
      const radius = Math.max(220, window.innerWidth * 0.2)
      target = centers.map((c) => {
        if (!pointer) return MAX
        const d = Math.hypot(pointer.x - c.x, pointer.y - c.y)
        const t = Math.max(0, 1 - d / radius)
        const eased = t * t * (3 - 2 * t)
        return MAX - (MAX - MIN) * eased
      })
      let moving = false
      letters.forEach((el, i) => {
        const next = current[i] + (target[i] - current[i]) * 0.14
        if (Math.abs(next - current[i]) > 0.5) moving = true
        current[i] = next
        el.style.fontWeight = String(Math.round(next))
      })
      frame = moving ? requestAnimationFrame(tick) : 0
    }

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      pointer = { x: e.pageX, y: e.pageY }
      kick()
    }
    const onLeave = () => {
      pointer = null
      kick()
    }

    measure()
    const section = wrap.closest('section') ?? wrap
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    // As letras ainda estão subindo na animação de entrada: mede de novo quando ela termina.
    const settle = window.setTimeout(measure, 1800)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(settle)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', measure)
      letters.forEach((el) => (el.style.fontWeight = ''))
    }
  }, [reduce])

  const line = (word: string, offset: number) =>
    word.split('').map((ch, i) => (
      <motion.span
        key={i}
        data-letter
        className="inline-block"
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, ease, delay: 0.1 + (offset + i) * 0.045 }}
      >
        {ch}
      </motion.span>
    ))

  return (
    <span
      ref={wrapRef}
      aria-hidden
      className="display block text-[19cqw] leading-[0.84] font-[800] tracking-[-0.045em] md:text-[clamp(3.6rem,15.6cqw,16rem)]"
    >
      <span className="block overflow-hidden pb-[0.04em]">{line(profile.firstName, 0)}</span>
      <span className="block overflow-hidden pb-[0.06em] pl-[22%]">
        {line(profile.lastName, profile.firstName.length)}
        <motion.span
          className="inline-block text-signal"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.9 }}
        >
          .
        </motion.span>
      </span>
    </span>
  )
}
