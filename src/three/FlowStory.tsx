import { ArrowDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import monitorScreen from '../assets/sicapda/three/monitor.webp'
import phoneScreen from '../assets/sicapda/three/phone.webp'
import { sicapda } from '../content/sicapda'
import { ui } from '../content/ui'
import { useLang } from '../i18n'
import { cn } from '../lib/cn'
import { pad2 } from '../lib/format'
import { gsap, scrollToTarget } from '../lib/smoothScroll'
import { useTheme } from '../lib/theme'
import { FlowDiagram } from '../sicapda/FlowDiagram'
import type { FlowScene, FlowState } from './flowScene'
import type { Tone } from './kit'
import { hasWebGL, prefersReducedMotion } from './support'
import { useCardContent } from './useCardContent'

const steps = sicapda.flow
const COUNT = steps.length

const tones = {
  dark: {
    text: 'text-paper',
    soft: 'text-paper/80',
    muted: 'text-muted-dark',
    accent: 'text-sica',
    rule: 'border-paper/80',
    hair: 'border-paper/15',
    track: 'bg-paper/15',
    fill: 'bg-sica',
    code: 'border-sica',
  },
  light: {
    text: 'text-ink',
    soft: 'text-ink/80',
    muted: 'text-muted',
    accent: 'text-signal-ink',
    rule: 'border-ink',
    hair: 'border-ink/15',
    track: 'bg-ink/15',
    fill: 'bg-ink',
    code: 'border-signal',
  },
} as const

/** A versão animada precisa de WebGL, de uma tela com altura mínima e de "reduzir movimento" desligado. */
const canAnimate = () => !prefersReducedMotion() && hasWebGL() && window.innerHeight >= 480

/**
 * "Do cartão ao painel": a seção fica presa na tela enquanto a rolagem conduz uma cena 3D
 * pelas seis etapas do SICAPDA. Sem WebGL ou com "reduzir movimento", mostra o diagrama estático.
 */
export function FlowStory({ tone }: { tone: Tone }) {
  const [animated] = useState(canAnimate)
  if (!animated) {
    return (
      <div className="shell">
        <FlowDiagram tone={tone} />
      </div>
    )
  }
  return <PinnedStory tone={tone} />
}

function PinnedStory({ tone }: { tone: Tone }) {
  const { t } = useLang()
  const { mode } = useTheme()
  const card = useCardContent()
  const c = tones[tone]

  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<FlowState>({ cam: 0, packet: 0, s0: 0, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 })
  const sceneRef = useRef<FlowScene | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const cardRef = useRef(card)
  cardRef.current = card

  const [active, setActive] = useState(0)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  // Linha do tempo presa à rolagem: cada etapa é uma viagem da câmera + a animação da estação.
  useEffect(() => {
    const wrap = wrapRef.current
    const stage = stageRef.current
    if (!wrap || !stage || failed) return
    const state = stateRef.current

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: wrap, start: 'top top', end: 'bottom bottom', scrub: 0.35 },
        onUpdate: () => {
          stage.style.setProperty('--flow', String(timeline.progress()))
          setActive(Math.min(COUNT - 1, Math.max(0, Math.round(state.cam))))
        },
      })
      timeline.to(state, { s0: 1, duration: 1 })
      for (let i = 1; i < COUNT; i += 1) {
        timeline.to(state, { cam: i, packet: i, duration: 0.42, ease: 'power2.inOut' })
        timeline.to(state, { [`s${i}`]: 1, duration: 0.58 })
      }
      timelineRef.current = timeline
    })
    return () => {
      timelineRef.current = null
      context.revert()
    }
  }, [failed])

  // O Three.js só é baixado quando a seção está chegando perto da tela.
  useEffect(() => {
    const wrap = wrapRef.current
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!wrap || !host || !canvas || failed) return
    let cancelled = false
    let onScreen = false

    const load = async () => {
      try {
        const { createFlowScene } = await import('./flowScene')
        if (cancelled) return
        sceneRef.current = createFlowScene({
          canvas,
          host,
          tone,
          state: stateRef.current,
          card: cardRef.current,
          screens: { monitor: monitorScreen, phone: phoneScreen },
        })
        sceneRef.current.setActive(onScreen)
        setReady(true)
      } catch (error) {
        console.error('Cena 3D indisponível, usando o diagrama estático.', error)
        if (!cancelled) setFailed(true)
      }
    }

    const nearby = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        nearby.disconnect()
        void load()
      },
      { rootMargin: '120% 0px' },
    )
    nearby.observe(wrap)

    // Fora da tela a cena para de desenhar.
    const visible = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        sceneRef.current?.setActive(onScreen)
      },
      { rootMargin: '10% 0px' },
    )
    visible.observe(wrap)

    const onLost = (event: Event) => {
      event.preventDefault()
      setFailed(true)
    }
    canvas.addEventListener('webglcontextlost', onLost)

    return () => {
      cancelled = true
      nearby.disconnect()
      visible.disconnect()
      canvas.removeEventListener('webglcontextlost', onLost)
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [tone, failed])

  // Tema: as variáveis CSS mudam no próximo quadro, então a cena relê as cores depois dele.
  useEffect(() => {
    const id = requestAnimationFrame(() => sceneRef.current?.refreshTheme())
    return () => cancelAnimationFrame(id)
  }, [mode])

  useEffect(() => {
    sceneRef.current?.setCard(card)
  }, [card])

  if (failed) {
    return (
      <div className="shell">
        <FlowDiagram tone={tone} />
      </div>
    )
  }

  const goTo = (index: number) => {
    const trigger = timelineRef.current?.scrollTrigger
    if (!trigger) return
    const at = index === 0 ? 0.5 : index + 0.8
    scrollToTarget(trigger.start + ((trigger.end - trigger.start) * at) / COUNT)
  }

  return (
    <div ref={wrapRef} className="relative h-[calc(100svh+330vh)] lg:h-[calc(100svh+400vh)]">
      <div
        ref={stageRef}
        className={cn('sticky top-0 flex h-[100svh] min-h-[30rem] flex-col overflow-hidden pt-16', c.text)}
        style={{ ['--flow' as string]: 0 }}
      >
        <div className="shell flex min-h-0 flex-1 flex-col">
          <div className={cn('eyebrow flex items-center justify-between gap-4 border-t pt-4', c.rule)}>
            <span className="min-w-0 truncate">{t(ui.flow.title)}</span>
            <span className="shrink-0 tabular whitespace-nowrap" aria-hidden>
              {pad2(active + 1)} / {pad2(COUNT)}
            </span>
          </div>

          <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-12 lg:gap-x-6">
            {/* Cena 3D */}
            <div
              ref={hostRef}
              className="relative -mx-[clamp(1rem,4vw,3rem)] min-h-0 flex-1 [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)] lg:order-2 lg:col-span-7 lg:mx-0 lg:-mr-[clamp(1rem,4vw,3rem)]"
            >
              <canvas
                ref={canvasRef}
                role="img"
                aria-label={t(ui.flow.canvasAria)}
                className={cn('absolute inset-0 size-full transition-opacity duration-700', ready ? 'opacity-100' : 'opacity-0')}
              />
            </div>

            {/* Texto de cada etapa: todas ficam no HTML; só a ativa aparece. */}
            <ol aria-label={t(ui.flow.stepsAria)} className="relative h-[13.5rem] shrink-0 sm:h-[12.5rem] lg:order-1 lg:col-span-5 lg:h-auto">
              {steps.map((step, i) => {
                const current = i === active
                return (
                  <li
                    key={step.id}
                    className={cn(
                      'absolute inset-0 flex flex-col justify-start transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] lg:justify-center',
                      current ? 'opacity-100' : 'pointer-events-none opacity-0',
                      !current && (i < active ? '-translate-y-4' : 'translate-y-4'),
                    )}
                  >
                    <p className={cn('eyebrow tabular', c.accent)}>
                      {t(ui.flow.step)} {pad2(i + 1)}
                    </p>
                    <h3 className="display mt-2 text-[clamp(1.75rem,4.4vw,3.75rem)] leading-[0.92] lg:mt-3">{t(step.title)}</h3>
                    <p className={cn('mt-2 max-w-md text-[0.98rem] leading-snug text-pretty lg:mt-5 lg:text-[1.1rem] lg:leading-relaxed', c.soft)}>
                      {t(step.text)}
                    </p>
                    <div className={cn('mt-3 border-l-2 pl-3 lg:mt-7 lg:pl-4', c.code)}>
                      <code className="font-mono text-[0.82rem] break-words lg:text-[0.95rem]">{step.code}</code>
                      <p className={cn('mt-0.5 text-[0.8rem] leading-snug lg:mt-1 lg:text-[0.88rem]', c.muted)}>{t(step.note)}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* Trilho de progresso: também serve para pular direto para uma etapa. */}
          <div className="relative pb-5 lg:pb-7">
            <p
              aria-hidden
              className={cn(
                'eyebrow absolute right-0 -top-7 hidden items-center gap-2 transition-opacity duration-500 lg:flex',
                c.muted,
                active === 0 ? 'opacity-100' : 'opacity-0',
              )}
            >
              {t(ui.flow.hint)} <ArrowDown size={13} className="motion-safe:animate-bounce" />
            </p>
            <ol className="grid grid-cols-6 gap-1.5">
              {steps.map((step, i) => (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`${t(ui.flow.goTo)} ${i + 1}: ${t(step.title)}`}
                    aria-current={i === active ? 'step' : undefined}
                    className="group block w-full pt-2 text-left"
                  >
                    <span className={cn('relative block h-[3px] overflow-hidden', c.track)}>
                      <span
                        className={cn('absolute inset-0 origin-left', c.fill)}
                        style={{ transform: `scaleX(clamp(0, calc(var(--flow) * ${COUNT} - ${i}), 1))` }}
                      />
                    </span>
                    <span
                      className={cn(
                        'eyebrow mt-2 flex min-h-7 items-baseline gap-1.5 text-[0.66rem] transition-colors',
                        i === active ? c.text : cn(c.muted, 'group-hover:text-current'),
                      )}
                    >
                      <span className="tabular">{pad2(i + 1)}</span>
                      <span className="hidden truncate normal-case tracking-normal md:inline">{t(step.title)}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
