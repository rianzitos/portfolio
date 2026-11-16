import { useEffect, type RefObject } from 'react'
import { gsap } from './smoothScroll'

interface ScrubOptions {
  /** Valores no início e no fim do trecho de rolagem (propriedades do GSAP: yPercent, scale, opacity…). */
  from: gsap.TweenVars
  to: gsap.TweenVars
  /** Elemento que define o trecho de rolagem. Por padrão, o próprio elemento animado. */
  trigger?: RefObject<Element | null>
  start?: string
  end?: string
}

/**
 * Liga uma animação simples à rolagem (GSAP ScrollTrigger com scrub): o elemento vai de `from`
 * a `to` conforme o trecho passa pela tela. Com "reduzir movimento", não faz nada.
 */
export function useScrub(ref: RefObject<Element | null>, { from, to, trigger, start = 'top bottom', end = 'bottom top' }: ScrubOptions) {
  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const context = gsap.context(() => {
      gsap.fromTo(element, from, {
        ...to,
        ease: 'none',
        scrollTrigger: { trigger: trigger?.current ?? element, start, end, scrub: 0.4 },
      })
    })
    return () => context.revert()
    // Os valores são fixos por componente: a animação é criada uma vez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
