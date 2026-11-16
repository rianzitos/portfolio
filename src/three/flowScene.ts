import {
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from 'three'
import { gsap } from '../lib/smoothScroll'
import { createCard } from './card'
import { drawCardBack, drawCardFront, loadCardFonts, type CardContent } from './cardTexture'
import { Kit, box, clamp01, createRenderer, cylinder, ease, easeOut, lerp, merge, readPalette, span, type Fill, type Tone } from './kit'

/**
 * "Do cartão ao painel": seis estações em desenho técnico isométrico.
 *
 * A cena não tem linha do tempo própria. Ela só lê o objeto `state` a cada quadro e desenha
 * o que ele descreve. Quem move o `state` é o GSAP, preso à rolagem (ver FlowStory.tsx).
 * Por isso a animação anda para frente e para trás junto com a página.
 */

export interface FlowState {
  /** Estação em que a câmera está (0 a 5, com frações durante a viagem). */
  cam: number
  /** Posição do pacote de dados ao longo do caminho (0 a 5). */
  packet: number
  /** Progresso da animação de cada estação (0 a 1). */
  s0: number
  s1: number
  s2: number
  s3: number
  s4: number
  s5: number
}

export const createFlowState = (): FlowState => ({ cam: 0, packet: 0, s0: 0, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 })

export interface FlowSceneOptions {
  canvas: HTMLCanvasElement
  /** Elemento que define o tamanho do canvas e de onde as cores são lidas. */
  host: HTMLElement
  tone: Tone
  state: FlowState
  card: CardContent
  screens: { monitor: string; phone: string }
}

export interface FlowScene {
  setActive: (active: boolean) => void
  refreshTheme: () => void
  setCard: (card: CardContent) => void
  dispose: () => void
}

const GAP = 4.2
const STATIONS = 6
const AZIMUTH = Math.PI / 4
const ELEVATION = (33 * Math.PI) / 180
const VIEW_DIR = new Vector3(Math.sin(AZIMUTH) * Math.cos(ELEVATION), Math.sin(ELEVATION), Math.cos(AZIMUTH) * Math.cos(ELEVATION))
/** Direção "para a direita" na tela, usada nas silhuetas dos cilindros. */
const SIDE = new Vector3(Math.cos(AZIMUTH), 0, -Math.sin(AZIMUTH))
const UP = new Vector3(0, 1, 0)

/** Altura para onde a câmera olha em cada estação e o ponto onde o pacote entra e sai. */
const FOCUS_Y = [0.82, 0.48, 0.6, 0.74, 0.5, 0.74]
const PORTS = [
  new Vector3(0.2, 1.22, -0.5),
  new Vector3(-0.1, 0.62, 0),
  new Vector3(0, 0.6, 0),
  new Vector3(0, 1.92, 0),
  new Vector3(-0.95, 0.32, 0),
  new Vector3(-0.12, 0.86, 0.02),
]

interface Station {
  group: Group
  update: (s: number, time: number, state: FlowState) => void
}

function circle(radius: number, y: number, from = 0, to = Math.PI * 2, steps = 64) {
  const points: number[] = []
  for (let i = 0; i <= steps; i += 1) {
    const a = lerp(from, to, i / steps)
    points.push(Math.cos(a) * radius, y, Math.sin(a) * radius)
  }
  return points
}

/** Cilindro com as duas linhas de contorno que a geometria de arestas não gera. */
function drum(kit: Kit, radius: number, height: number, y: number, fillMix?: number) {
  const geometry = cylinder(radius, height, 0, y, 0)
  const group = new Group()
  let fill: Fill | undefined
  if (fillMix === undefined) group.add(kit.solid(geometry, kit.line, 30))
  else {
    const part = kit.fillable(geometry, fillMix, kit.line, 30)
    fill = part.fill
    group.add(part.group)
  }
  for (const sign of [1, -1]) {
    const x = SIDE.x * radius * sign
    const z = SIDE.z * radius * sign
    group.add(kit.polyline([x, y - height / 2, z, x, y + height / 2, z]))
  }
  return { group, fill }
}

/* ─── 01 · Catraca com leitor RFID ───────────────────────────────────────── */
function turnstile(kit: Kit, cardGroup: Group): Station {
  const group = new Group()
  group.add(kit.solid(box(0.95, 1.0, 0.42, 0, 0.5, -0.5)))
  group.add(kit.solid(box(0.3, 0.07, 0.2, -0.25, 1.035, -0.5))) // visor LCD
  // Guia do outro lado da passagem: dois postes e um corrimão.
  group.add(kit.solid(merge([box(0.06, 0.8, 0.06, -0.42, 0.4, 0.55), box(0.06, 0.8, 0.06, 0.42, 0.4, 0.55), box(0.96, 0.06, 0.06, 0, 0.83, 0.55)])))

  const pad = kit.fillable(box(0.38, 0.03, 0.28, 0.2, 1.015, -0.5))
  group.add(pad.group)

  // Braços: giram em torno de um eixo inclinado 45°, como numa catraca de três braços.
  const hub = new Group()
  hub.position.set(0, 0.74, -0.29)
  hub.rotation.x = (3 * Math.PI) / 4
  hub.add(kit.solid(new CylinderGeometry(0.1, 0.1, 0.14, 6).translate(0, 0.07, 0)))
  const spinner = new Group()
  spinner.position.y = 0.14
  const length = 0.6
  for (const phi of [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6]) {
    const arm = kit.solid(box(0.045, length, 0.045, 0, length / 2, 0))
    const direction = new Vector3(Math.SQRT1_2 * Math.cos(phi), Math.SQRT1_2, Math.SQRT1_2 * Math.sin(phi))
    arm.quaternion.setFromUnitVectors(UP, direction)
    spinner.add(arm)
  }
  hub.add(spinner)
  group.add(hub)

  // Cartão e a onda da leitura
  cardGroup.scale.setScalar(0.34)
  group.add(cardGroup)
  const ringMaterial = kit.fadeLine('accent', 1.8)
  const ring = kit.polyline(circle(1, 0), ringMaterial)
  ring.position.set(0.2, 1.04, -0.5)
  group.add(ring)

  return {
    group,
    update: (s, time, state) => {
      const down = ease(span(s, 0.05, 0.46))
      const hover = (1 - down) * Math.sin(time * 1.7) * 0.035
      cardGroup.position.set(0.2, lerp(1.62, 1.05, down) + hover, -0.5)
      cardGroup.rotation.set(lerp(-0.95, -Math.PI / 2, down), 0, lerp(0.22, 0, down) + (1 - down) * Math.sin(time * 1.1) * 0.05)
      pad.fill.mix = ease(span(s, 0.44, 0.56))
      const wave = span(s, 0.46, 0.92)
      ring.scale.setScalar(0.16 + easeOut(wave) * 0.7)
      ringMaterial.opacity = wave > 0 && wave < 1 ? 1 - wave : 0
      // A catraca só libera depois da resposta do servidor (estação 03).
      spinner.rotation.y = ease(span(state.s2, 0.62, 0.95)) * ((2 * Math.PI) / 3)
    },
  }
}

/* ─── 02 · Placa ESP32 ───────────────────────────────────────────────────── */
function esp32(kit: Kit): Station {
  const group = new Group()
  const y = 0.3
  const parts = [box(1.5, 0.05, 0.7, 0, y, 0), box(0.2, 0.09, 0.24, 0.72, y + 0.07, 0), box(0.16, 0.03, 0.16, 0.22, y + 0.04, 0)]
  for (const x of [-0.68, 0.68]) for (const z of [-0.29, 0.29]) parts.push(box(0.06, y - 0.025, 0.06, x, (y - 0.025) / 2, z))
  for (let i = 0; i < 13; i += 1) for (const z of [-0.3, 0.3]) parts.push(box(0.05, 0.07, 0.05, -0.58 + i * 0.095, y + 0.06, z))
  for (const z of [-0.19, 0.19]) parts.push(box(0.08, 0.05, 0.08, 0.5, y + 0.05, z))
  group.add(kit.solid(merge(parts)))

  const shield = kit.fillable(box(0.46, 0.08, 0.4, -0.3, y + 0.065, 0))
  group.add(shield.group)

  // Antena em zigue-zague na ponta da placa
  const antenna: number[] = []
  for (let i = 0; i <= 8; i += 1) antenna.push(i % 2 === 0 ? -0.71 : -0.6, y + 0.027, -0.2 + i * 0.05)
  group.add(kit.polyline(antenna))

  // Ondas do Wi-Fi
  const arcs = [0.3, 0.5, 0.7].map((radius) => {
    const material = kit.fadeLine('accent', 1.8)
    const points: number[] = []
    for (let i = 0; i <= 28; i += 1) {
      const a = lerp(0.62, Math.PI - 0.62, i / 28)
      points.push(
        -0.66 + SIDE.x * Math.cos(a) * radius,
        y + 0.12 + Math.sin(a) * radius,
        SIDE.z * Math.cos(a) * radius,
      )
    }
    const line = kit.polyline(points, material)
    group.add(line)
    return material
  })

  return {
    group,
    update: (s, time) => {
      shield.fill.mix = ease(span(s, 0.04, 0.26))
      arcs.forEach((material, i) => {
        const on = ease(span(s, 0.22 + i * 0.16, 0.36 + i * 0.16))
        const breathe = 0.72 + 0.28 * Math.sin(time * 4 - i * 0.9)
        material.opacity = on * breathe * (1 - span(s, 0.94, 1) * 0.5)
      })
    },
  }
}

/* ─── 03 · Servidor (API em PHP) ─────────────────────────────────────────── */
function server(kit: Kit): Station {
  const group = new Group()
  group.add(kit.solid(box(1.25, 0.06, 0.95, 0, 0.03, 0)))
  const units = [0, 1, 2].map((k) => {
    const unit = new Group()
    const y = 0.06 + 0.14 + k * 0.32
    unit.add(kit.solid(box(1.15, 0.28, 0.85, 0, y, 0)))
    const leds = [0, 1].map((j) => {
      const led = kit.fillable(box(0.06, 0.06, 0.02, -0.44 + j * 0.11, y, 0.435))
      unit.add(led.group)
      return led.fill
    })
    for (const dy of [-0.06, 0, 0.06]) unit.add(kit.polyline([-0.1, y + dy, 0.427, 0.46, y + dy, 0.427], kit.dim))
    group.add(unit)
    return { unit, leds }
  })

  return {
    group,
    update: (s, time) => {
      units.forEach(({ unit, leds }, k) => {
        const local = span(s, 0.06 + k * 0.16, 0.5 + k * 0.16)
        unit.position.z = Math.sin(Math.PI * local) * 0.16
        const lit = ease(span(s, 0.06 + k * 0.16, 0.2 + k * 0.16))
        leds.forEach((led, j) => {
          led.mix = lit * (0.55 + 0.45 * Math.sin(time * 7 + k * 1.7 + j * 2.4))
        })
      })
    },
  }
}

/* ─── 04 · Banco de dados (MySQL) ────────────────────────────────────────── */
function database(kit: Kit): Station {
  const group = new Group()
  const radius = 0.56
  for (let k = 0; k < 3; k += 1) group.add(drum(kit, radius, 0.3, 0.15 + k * 0.37).group)
  // O registro novo: um disco que desce e encaixa no topo da pilha.
  const row = drum(kit, radius, 0.14, 0, 1)
  group.add(row.group)
  const rest = 3 * 0.37 + 0.07

  return {
    group,
    update: (s) => {
      row.group.visible = s > 0.01
      row.group.position.y = lerp(1.92, rest, easeOut(span(s, 0.02, 0.62)))
      const squash = Math.sin(Math.PI * span(s, 0.6, 0.8)) * 0.12
      row.group.scale.set(1 + squash, 1 - squash, 1 + squash)
    },
  }
}

/* ─── 05 · Previsão de demanda ───────────────────────────────────────────── */
function forecast(kit: Kit): Station {
  const group = new Group()
  group.add(kit.solid(box(2.0, 0.05, 0.72, 0, 0.025, 0)))
  const heights = [0.62, 0.92, 0.5, 0.8]
  const target = 0.74
  const history = heights.map((h, i) => {
    const bar = kit.solid(box(0.24, h, 0.24, 0, h / 2, 0))
    bar.position.set(-0.72 + i * 0.36, 0.05, 0)
    group.add(bar)
    return bar
  })
  const predicted = kit.fillable(box(0.26, target, 0.26, 0, target / 2, 0), 1)
  predicted.group.position.set(0.82, 0.05, 0)
  group.add(predicted.group)

  // Linha tracejada na altura da previsão: a média dos dias anteriores.
  const averageMaterial = kit.fadeLine('line', 1.2)
  averageMaterial.dashed = true
  averageMaterial.dashSize = 0.07
  averageMaterial.gapSize = 0.05
  const average = kit.polyline([0, 0, 0, 1, 0, 0], averageMaterial)
  average.computeLineDistances()
  average.position.set(-0.9, 0.05 + target, 0.14)
  group.add(average)

  return {
    group,
    update: (s) => {
      history.forEach((bar, i) => {
        bar.scale.y = Math.max(0.001, easeOut(span(s, 0.04 + i * 0.09, 0.3 + i * 0.09)))
      })
      const reach = ease(span(s, 0.42, 0.66))
      average.scale.x = Math.max(0.001, reach * 1.86)
      averageMaterial.opacity = reach
      predicted.group.scale.y = Math.max(0.001, easeOut(span(s, 0.6, 0.92)))
      predicted.group.visible = s > 0.6
    },
  }
}

/* ─── 06 · Painel e aplicativo ───────────────────────────────────────────── */
function dashboard(kit: Kit, urls: FlowSceneOptions['screens'], covers: MeshBasicMaterial[]): Station {
  const group = new Group()
  const loader = new TextureLoader()

  const screen = (width: number, height: number, url: string) => {
    const holder = new Group()
    const geometry = kit.track(new PlaneGeometry(width, height))
    const texture = kit.track(loader.load(url))
    texture.colorSpace = SRGBColorSpace
    const image = new Mesh(geometry, kit.track(new MeshBasicMaterial({ map: texture })))
    const cover = kit.track(new MeshBasicMaterial({ transparent: true, depthWrite: false }))
    covers.push(cover)
    const veil = new Mesh(geometry, cover)
    veil.position.z = 0.002
    holder.add(image, veil)
    return { holder, cover }
  }

  const monitor = new Group()
  monitor.add(kit.solid(merge([box(1.52, 0.94, 0.06, 0, 0.86, 0), box(0.1, 0.34, 0.06, 0, 0.22, -0.02), box(0.56, 0.04, 0.32, 0, 0.02, 0)])))
  const monitorScreen = screen(1.42, 0.84, urls.monitor)
  monitorScreen.holder.position.set(0, 0.86, 0.032)
  monitor.add(monitorScreen.holder)
  monitor.position.set(-0.12, 0, 0)
  monitor.rotation.y = 0.36
  group.add(monitor)

  const phone = new Group()
  phone.add(kit.solid(box(0.4, 0.82, 0.05, 0, 0.41, 0)))
  const phoneScreen = screen(0.34, 0.74, urls.phone)
  phoneScreen.holder.position.set(0, 0.41, 0.027)
  phone.add(phoneScreen.holder)
  phone.position.set(0.98, 0, 0.5)
  phone.rotation.set(-0.16, 0.36, 0)
  group.add(phone)

  return {
    group,
    update: (s) => {
      monitorScreen.cover.opacity = 1 - ease(span(s, 0.08, 0.5))
      phoneScreen.cover.opacity = 1 - ease(span(s, 0.4, 0.82))
    },
  }
}

/* ─── Cena ───────────────────────────────────────────────────────────────── */
export function createFlowScene({ canvas, host, tone, state, card, screens }: FlowSceneOptions): FlowScene {
  const renderer = createRenderer(canvas)
  const scene = new Scene()
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 200)
  const kit = new Kit(readPalette(host, tone))
  const covers: MeshBasicMaterial[] = []
  let cardContent = card

  const accessCard = createCard(renderer, { sheen: false })
  const paintCard = () => {
    const { palette } = kit
    const colors = {
      body: `#${palette.line.getHexString()}`,
      text: `#${palette.bg.getHexString()}`,
      signal: `#${palette.signal.getHexString()}`,
      carbon: '#11110f',
    }
    drawCardFront(accessCard.front, cardContent, colors)
    drawCardBack(accessCard.back, cardContent, colors)
    accessCard.setRimColor(palette.dim)
    accessCard.refresh()
  }
  paintCard()
  loadCardFonts().then(paintCard)

  const stations: Station[] = [turnstile(kit, accessCard.group), esp32(kit), server(kit), database(kit), forecast(kit), dashboard(kit, screens, covers)]
  stations.forEach((station, i) => {
    station.group.position.x = i * GAP
    scene.add(station.group)
  })

  // Chão: um quadro por estação e o caminho entre eles.
  const half = 1.15
  const trails: { line: Group['children'][number]; length: number }[] = []
  for (let i = 0; i < STATIONS; i += 1) {
    const x = i * GAP
    const tile = kit.polyline([x - half, 0, -half, x + half, 0, -half, x + half, 0, half, x - half, 0, half, x - half, 0, -half], kit.dim)
    scene.add(tile)
    if (i === STATIONS - 1) continue
    const from = x + half
    const length = GAP - half * 2
    scene.add(kit.polyline([from, 0, 0, from + length, 0, 0], kit.dim))
    const mid = from + length / 2
    scene.add(kit.polyline([mid - 0.09, 0, -0.09, mid, 0, 0, mid - 0.09, 0, 0.09], kit.dim))
    const trail = kit.polyline([0, 0.004, 0, 1, 0.004, 0], kit.accentLine)
    trail.position.x = from
    scene.add(trail)
    trails.push({ line: trail, length })
  }

  const packet = kit.fillable(box(0.17, 0.17, 0.17), 1)
  scene.add(packet.group)

  const paintCovers = () => covers.forEach((material) => material.color.copy(kit.palette.bg))
  paintCovers()

  /* Tamanho */
  let viewWidth = 4.4
  let viewHeight = 3.4
  const resize = () => {
    const width = Math.max(1, host.clientWidth)
    const height = Math.max(1, host.clientHeight)
    renderer.setSize(width, height, false)
    const aspect = width / height
    viewWidth = Math.max(3.7, 3.0 * aspect)
    viewHeight = viewWidth / aspect
  }
  const observer = new ResizeObserver(resize)
  observer.observe(host)
  resize()

  /* Quadro a quadro */
  const target = new Vector3()
  const from = new Vector3()
  const to = new Vector3()
  let active = true

  const frame = (time: number) => {
    if (!active) return
    const cam = Math.min(STATIONS - 1, Math.max(0, state.cam))
    const index = Math.min(STATIONS - 2, Math.floor(cam))
    const between = cam - index
    // A câmera abre um pouco no meio do caminho entre duas estações.
    const zoom = 1 + Math.sin(Math.PI * clamp01(between)) * 0.16
    camera.left = (-viewWidth / 2) * zoom
    camera.right = (viewWidth / 2) * zoom
    camera.top = (viewHeight / 2) * zoom
    camera.bottom = (-viewHeight / 2) * zoom
    camera.updateProjectionMatrix()
    target.set(cam * GAP, lerp(FOCUS_Y[index], FOCUS_Y[index + 1], between), 0)
    camera.position.copy(target).addScaledVector(VIEW_DIR, 60)
    camera.lookAt(target)

    const progress = [state.s0, state.s1, state.s2, state.s3, state.s4, state.s5]
    stations.forEach((station, i) => station.update(clamp01(progress[i]), time, state))

    // Pacote de dados: salta em arco da saída de uma estação até a entrada da próxima.
    const p = Math.min(STATIONS - 1, Math.max(0, state.packet))
    const hop = Math.min(STATIONS - 2, Math.floor(p))
    const t = p - hop
    from.copy(PORTS[hop]).setX(PORTS[hop].x + hop * GAP)
    to.copy(PORTS[hop + 1]).setX(PORTS[hop + 1].x + (hop + 1) * GAP)
    packet.group.position.lerpVectors(from, to, ease(t))
    packet.group.position.y += Math.sin(Math.PI * t) * 0.85
    packet.group.rotation.set(time * 0.9, time * 1.3, 0)
    let size = 0
    if (t <= 0) size = hop === 0 ? ease(span(state.s0, 0.56, 0.72)) : 0
    else if (t < 1) size = Math.min(hop === 0 ? 1 : span(t, 0, 0.12), 1 - span(t, 0.9, 1))
    packet.group.scale.setScalar(Math.max(0.0001, size))
    trails.forEach((trail, i) => {
      trail.line.scale.x = Math.max(0.0001, trail.length * ease(span(p - i, 0.3, 0.75)))
      trail.line.visible = p - i > 0.3
    })

    kit.paintFills()
    renderer.render(scene, camera)
  }
  gsap.ticker.add(frame)

  return {
    setActive: (next) => {
      active = next
    },
    refreshTheme: () => {
      kit.setPalette(readPalette(host, tone))
      paintCovers()
      paintCard()
    },
    setCard: (next) => {
      cardContent = next
      paintCard()
    },
    dispose: () => {
      gsap.ticker.remove(frame)
      observer.disconnect()
      accessCard.dispose()
      kit.dispose()
      renderer.dispose()
    },
  }
}
