import { CanvasTexture, Color, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, Vector2 } from 'three'
import { gsap } from '../lib/smoothScroll'
import { CARD_WIDTH, createCard } from './card'
import { CARD_RATIO, drawCardBack, drawCardFront, loadCardFonts, type CardContent } from './cardTexture'
import { createRenderer } from './kit'

/**
 * Cartão de acesso 3D do topo da página.
 * - O cartão se inclina na direção do ponteiro.
 * - Arrastar gira; soltar encaixa na frente ou no verso; um clique vira.
 * - Ao rolar a página ele gira e se afasta (valor vindo do ScrollTrigger).
 * Com "reduzir movimento", ele fica parado e só responde a arrastar e clicar.
 */

export interface HeroCardOptions {
  canvas: HTMLCanvasElement
  /** Área do canvas. Recebe os eventos de arrastar e clicar. */
  stage: HTMLElement
  /** Seção em volta: o cartão acompanha o ponteiro em toda ela. */
  section: HTMLElement
  content: CardContent
  reduced: boolean
  /** 0 com a seção no topo, 1 quando ela saiu da tela. */
  scroll: { value: number }
}

export interface HeroCardScene {
  setActive: (active: boolean) => void
  refresh: (content?: CardContent) => void
  flip: () => void
  dispose: () => void
}

const FOV = 26
const BASE_ROLL = -0.09

function shadowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!
  ctx.filter = 'blur(22px)'
  ctx.fillStyle = '#000'
  ctx.beginPath()
  ctx.roundRect(48, 48 + (160 - 160 / CARD_RATIO) / 2, 160, 160 / CARD_RATIO, 14)
  ctx.fill()
  return new CanvasTexture(canvas)
}

export function createHeroCard({ canvas, stage, section, content, reduced, scroll }: HeroCardOptions): HeroCardScene {
  const renderer = createRenderer(canvas)
  const scene = new Scene()
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 60)
  const card = createCard(renderer)
  let cardContent = content
  let cardPixels = 300

  // rig: flutuação e rolagem · tilt: inclinação pelo ponteiro · turn: giro frente/verso
  const rig = new Group()
  const tilt = new Group()
  const turn = new Group()
  turn.add(card.group)
  tilt.add(turn)
  rig.add(tilt)
  scene.add(rig)

  const shadowMap = shadowTexture()
  const shadowMaterial = new MeshBasicMaterial({ map: shadowMap, transparent: true, depthWrite: false, opacity: 0 })
  const shadowGeometry = new PlaneGeometry(CARD_WIDTH * 1.6, CARD_WIDTH * 1.6)
  const shadow = new Mesh(shadowGeometry, shadowMaterial)
  shadow.position.z = -0.4
  shadow.renderOrder = -1
  scene.add(shadow)

  let sheenStrength = 0.14
  let shadowStrength = 0.2

  const paint = () => {
    const style = getComputedStyle(section)
    const read = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback
    const body = read('--color-ink', '#11110f')
    const text = read('--color-paper', '#eeebe3')
    const dark = document.documentElement.dataset.mode === 'dark'
    const colors = { body, text, signal: read('--color-signal', '#ff4f1f'), carbon: read('--color-carbon', '#11110f') }
    drawCardFront(card.front, cardContent, colors)
    drawCardBack(card.back, cardContent, colors)
    card.setRimColor(new Color(body).lerp(new Color(text), 0.22))
    card.refresh()
    // No tema escuro o cartão é claro e o fundo é escuro: o reflexo quase não aparece e a
    // sombra só escureceria as letras do nome que ficam por baixo, então ela é desligada.
    sheenStrength = dark ? 0.05 : 0.14
    shadowStrength = dark ? 0 : 0.2
  }
  paint()
  loadCardFonts().then(paint)

  /* Tamanho: a câmera se afasta até o cartão ter a largura desejada em pixels. */
  const resize = () => {
    const width = Math.max(1, stage.clientWidth)
    const height = Math.max(1, stage.clientHeight)
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    cardPixels = Math.min(width * 0.8, height * 0.7 * CARD_RATIO)
    const visibleHeight = (CARD_WIDTH * height) / cardPixels
    camera.position.set(0, 0, visibleHeight / (2 * Math.tan((FOV * Math.PI) / 360)))
    camera.updateProjectionMatrix()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(stage)
  resize()

  /* Estado */
  const motion = { turn: 0, intro: reduced ? 1 : 0 }
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  let active = true
  let dragging = false
  let moved = 0
  let startX = 0
  let startTurn = 0
  let lastX = 0
  let lastTime = 0
  let velocity = 0

  if (!reduced) gsap.to(motion, { intro: 1, duration: 1.5, delay: 0.45, ease: 'power3.out' })

  const raycaster = new Raycaster()
  const ndc = new Vector2()
  const hits = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    ndc.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -(((event.clientY - rect.top) / rect.height) * 2 - 1))
    raycaster.setFromCamera(ndc, camera)
    return raycaster.intersectObject(card.group, true).length > 0
  }

  const settle = (target: number, overshoot = 1.5) => {
    gsap.killTweensOf(motion, 'turn')
    gsap.to(motion, { turn: target, duration: 0.95, ease: `back.out(${overshoot})` })
  }

  const onSectionMove = (event: PointerEvent) => {
    if (reduced || event.pointerType === 'touch') return
    const rect = stage.getBoundingClientRect()
    const reach = Math.max(rect.width, 360)
    pointer.tx = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / reach))
    pointer.ty = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / reach))
  }
  const onSectionLeave = () => {
    pointer.tx = 0
    pointer.ty = 0
  }

  const onDown = (event: PointerEvent) => {
    // O botão "virar" fica por cima do canvas: cliques nele não iniciam um arraste.
    if (event.button !== 0 || (event.target as Element | null)?.closest('button') || !hits(event)) return
    dragging = true
    moved = 0
    startX = lastX = event.clientX
    lastTime = performance.now()
    velocity = 0
    startTurn = motion.turn
    gsap.killTweensOf(motion, 'turn')
    stage.setPointerCapture(event.pointerId)
    stage.style.cursor = 'grabbing'
    event.preventDefault()
  }
  const onMove = (event: PointerEvent) => {
    if (!dragging) {
      if (event.pointerType !== 'touch') stage.style.cursor = hits(event) ? 'grab' : ''
      return
    }
    const now = performance.now()
    const dx = event.clientX - startX
    moved = Math.max(moved, Math.abs(dx))
    motion.turn = startTurn + (dx / (cardPixels * 1.15)) * Math.PI
    velocity = (event.clientX - lastX) / Math.max(1, now - lastTime)
    lastX = event.clientX
    lastTime = now
  }
  const release = (event: PointerEvent, cancelled: boolean) => {
    if (!dragging) return
    dragging = false
    stage.style.cursor = ''
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId)
    if (!cancelled && moved < 5) {
      // Clique sem arrastar: vira para o outro lado.
      settle((Math.round(startTurn / Math.PI) + 1) * Math.PI)
      return
    }
    // Soltou depois de arrastar: continua no embalo e encaixa na face mais próxima.
    const coast = motion.turn + (velocity * 160 * Math.PI) / (cardPixels * 1.15)
    settle(Math.round(coast / Math.PI) * Math.PI, 1.2)
  }
  const onUp = (event: PointerEvent) => release(event, false)
  const onCancel = (event: PointerEvent) => release(event, true)

  section.addEventListener('pointermove', onSectionMove)
  section.addEventListener('pointerleave', onSectionLeave)
  stage.addEventListener('pointerdown', onDown)
  stage.addEventListener('pointermove', onMove)
  stage.addEventListener('pointerup', onUp)
  stage.addEventListener('pointercancel', onCancel)

  const frame = (time: number) => {
    if (!active) return
    pointer.x += (pointer.tx - pointer.x) * 0.08
    pointer.y += (pointer.ty - pointer.y) * 0.08

    const idle = reduced ? 0 : 1
    const away = reduced ? 0 : scroll.value
    const enter = 1 - motion.intro

    rig.position.set(0, Math.sin(time * 0.9) * 0.03 * idle - away * 0.22 - enter * 0.75, 0)
    rig.scale.setScalar(1 - away * 0.22)
    tilt.rotation.set(
      pointer.y * 0.28 + Math.sin(time * 0.7) * 0.03 * idle + away * 0.35,
      pointer.x * 0.42 + Math.sin(time * 0.55) * 0.06 * idle,
      BASE_ROLL + Math.sin(time * 0.8) * 0.012 * idle,
    )
    turn.rotation.y = motion.turn + away * 2.4 - enter * 2.6

    // Reflexo e sombra acompanham a inclinação.
    const facing = Math.cos(turn.rotation.y + tilt.rotation.y)
    card.setSheen(Math.sin(turn.rotation.y + tilt.rotation.y) * 1.6 + pointer.y * 0.4, sheenStrength * Math.min(1, Math.abs(facing) * 1.4))
    shadow.position.set(0.07 - tilt.rotation.y * 0.22, rig.position.y - 0.1 + tilt.rotation.x * 0.18, -0.4)
    shadow.scale.set(Math.max(0.12, Math.abs(facing)) * rig.scale.x, rig.scale.x, 1)
    shadow.rotation.z = BASE_ROLL
    shadowMaterial.opacity = shadowStrength * motion.intro * (1 - away)

    renderer.render(scene, camera)
  }
  gsap.ticker.add(frame)

  return {
    setActive: (next) => {
      active = next
    },
    refresh: (next) => {
      if (next) cardContent = next
      paint()
    },
    flip: () => settle((Math.round(motion.turn / Math.PI) + 1) * Math.PI),
    dispose: () => {
      gsap.ticker.remove(frame)
      gsap.killTweensOf(motion)
      observer.disconnect()
      section.removeEventListener('pointermove', onSectionMove)
      section.removeEventListener('pointerleave', onSectionLeave)
      stage.removeEventListener('pointerdown', onDown)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerup', onUp)
      stage.removeEventListener('pointercancel', onCancel)
      card.dispose()
      shadowMap.dispose()
      shadowMaterial.dispose()
      shadowGeometry.dispose()
      renderer.dispose()
    },
  }
}

