import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }

/**
 * Rolagem suave (Lenis) sincronizada com o GSAP.
 *
 * - O Lenis roda no mesmo relógio do GSAP, então as animações ligadas à rolagem
 *   (ScrollTrigger) e as cenas 3D ficam sempre no mesmo quadro.
 * - Com "reduzir movimento" ativado no sistema, o próprio Lenis desliga a suavização.
 * - No toque (celular) a rolagem continua nativa.
 */
let lenis: Lenis | null = null
let locks = 0

type Target = string | number | HTMLElement

interface ScrollOptions {
  immediate?: boolean
  onComplete?: () => void
}

/** Aceleração e freada suaves para os saltos programados (links de âncora, trilho da cena 3D). */
const easeInOut = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2)

export function scrollToTarget(target: Target, { immediate = false, onComplete }: ScrollOptions = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, force: true, duration: 1.5, easing: easeInOut, onComplete })
    return
  }
  if (typeof target === 'number') window.scrollTo({ top: target })
  else (typeof target === 'string' ? document.querySelector(target) : target)?.scrollIntoView({ block: 'start' })
  onComplete?.()
}

/** Trava a rolagem da página (menu mobile e diálogos). Cada lockScroll() precisa de um unlockScroll(). */
export function lockScroll() {
  locks += 1
  if (locks === 1) {
    document.documentElement.style.overflow = 'hidden'
    lenis?.stop()
  }
}

export function unlockScroll() {
  if (locks === 0) return
  locks -= 1
  if (locks === 0) {
    document.documentElement.style.overflow = ''
    lenis?.start()
  }
}

/**
 * Links para âncoras da mesma página (#sobre, #contato…): rolagem suave até o destino,
 * endereço atualizado e foco movido para a seção, como o navegador faria sozinho.
 */
function onAnchorClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
  if (!link || link.target === '_blank' || link.hasAttribute('download')) return

  const url = new URL(link.href, window.location.href)
  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return

  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
  if (!target) return

  event.preventDefault()
  if (url.hash !== window.location.hash) window.history.pushState(null, '', url.hash)
  scrollToTarget(target, {
    onComplete: () => {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    },
  })
}

export function initSmoothScroll() {
  if (lenis) return () => undefined

  const instance = new Lenis({ lerp: 0.11, smoothWheel: true, autoRaf: false })
  lenis = instance
  if (locks > 0) instance.stop()

  instance.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => instance.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  document.addEventListener('click', onAnchorClick)

  // A altura da página muda quando fontes e imagens carregam, ou quando o idioma muda:
  // o ScrollTrigger precisa recalcular onde cada animação começa e termina.
  let refreshTimer = 0
  const scheduleRefresh = () => {
    window.clearTimeout(refreshTimer)
    refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200)
  }
  const observer = new ResizeObserver(scheduleRefresh)
  observer.observe(document.body)

  return () => {
    window.clearTimeout(refreshTimer)
    observer.disconnect()
    document.removeEventListener('click', onAnchorClick)
    gsap.ticker.remove(tick)
    instance.destroy()
    if (lenis === instance) lenis = null
  }
}
