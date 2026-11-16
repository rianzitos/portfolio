import { RotateCw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ui } from '../content/ui'
import { useT } from '../i18n'
import { cn } from '../lib/cn'
import { gsap } from '../lib/smoothScroll'
import { useTheme } from '../lib/theme'
import type { HeroCardScene } from './heroCardScene'
import { hasWebGL, prefersReducedMotion } from './support'
import { useCardContent } from './useCardContent'

/**
 * Cartão de acesso 3D ao lado do nome. É um enfeite interativo: tudo o que está escrito nele
 * (nome, cargo, contatos) também está no HTML da página, por isso o canvas fica fora da leitura de tela.
 * Sem WebGL, simplesmente não aparece.
 */
export function HeroCard({ className }: { className?: string }) {
  const t = useT()
  const { mode } = useTheme()
  const content = useCardContent()
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<HeroCardScene | null>(null)
  const contentRef = useRef(content)
  contentRef.current = content
  const [supported] = useState(hasWebGL)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    const section = stage?.closest('section')
    if (!supported || !stage || !canvas || !section) return
    let cancelled = false
    let onScreen = true
    const reduced = prefersReducedMotion()
    const scroll = { value: 0 }

    // Giro ligado à rolagem: de 0 (topo) a 1 (a seção saiu da tela).
    const context = gsap.context(() => {
      if (reduced) return
      gsap.to(scroll, {
        value: 1,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.3 },
      })
    })

    // O Three.js é baixado depois da primeira pintura, para não atrasar o texto.
    const timer = window.setTimeout(async () => {
      try {
        const { createHeroCard } = await import('./heroCardScene')
        if (cancelled) return
        sceneRef.current = createHeroCard({ canvas, stage, section, content: contentRef.current, reduced, scroll })
        sceneRef.current.setActive(onScreen)
        setReady(true)
      } catch (error) {
        console.error('Cartão 3D indisponível.', error)
      }
    }, 200)

    // Fora da tela o cartão para de ser desenhado.
    const visible = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      sceneRef.current?.setActive(onScreen)
    })
    visible.observe(stage)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      visible.disconnect()
      context.revert()
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [supported])

  // Tema e idioma: redesenha as faces (as variáveis CSS mudam no quadro seguinte).
  useEffect(() => {
    const id = requestAnimationFrame(() => sceneRef.current?.refresh(content))
    return () => cancelAnimationFrame(id)
  }, [mode, content])

  if (!supported) return null

  return (
    <div ref={stageRef} className={cn('touch-pan-y select-none', className)}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn('absolute inset-0 size-full transition-opacity duration-700', ready ? 'opacity-100' : 'opacity-0')}
      />
      <button
        type="button"
        onClick={() => sceneRef.current?.flip()}
        aria-label={t(ui.card.hintAria)}
        className={cn(
          'eyebrow absolute right-0 bottom-0 hidden min-h-11 items-center gap-2 text-[0.68rem] text-muted transition-[opacity,color] duration-500 hover:text-ink lg:inline-flex',
          ready ? 'opacity-100' : 'opacity-0',
        )}
      >
        <RotateCw aria-hidden size={13} />
        {t(ui.card.hint)}
      </button>
    </div>
  )
}
