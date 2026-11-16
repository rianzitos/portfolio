import {
  type BufferGeometry,
  BoxGeometry,
  Color,
  CylinderGeometry,
  EdgesGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  WebGLRenderer,
} from 'three'
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

/**
 * Peças compartilhadas pelas cenas 3D.
 *
 * O estilo é o de um desenho técnico: cada objeto tem faces da cor do fundo (para esconder
 * as linhas de trás) e arestas desenhadas por cima. Sem luz, sem sombra, sem brilho.
 * As cores vêm das mesmas variáveis CSS do resto do site, então as cenas acompanham o tema.
 */

export type Tone = 'dark' | 'light'

export interface Palette {
  bg: Color
  line: Color
  dim: Color
  accent: Color
  signal: Color
}

const cssVar = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim() || '#888888'

/** tone "dark": seção com fundo de tinta. tone "light": seção com fundo de papel. */
export function readPalette(el: Element, tone: Tone): Palette {
  const bg = new Color(cssVar(el, tone === 'dark' ? '--color-ink' : '--color-paper'))
  const line = new Color(cssVar(el, tone === 'dark' ? '--color-paper' : '--color-ink'))
  return {
    bg,
    line,
    dim: bg.clone().lerp(line, 0.34),
    accent: new Color(cssVar(el, '--color-sica')),
    signal: new Color(cssVar(el, '--color-signal')),
  }
}

export function createRenderer(canvas: HTMLCanvasElement) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setClearColor(0x000000, 0)
  return renderer
}

/* ─── Geometria ──────────────────────────────────────────────────────────── */

export const box = (w: number, h: number, d: number, x = 0, y = 0, z = 0) => new BoxGeometry(w, h, d).translate(x, y, z)

export const cylinder = (r: number, h: number, x = 0, y = 0, z = 0, segments = 40) =>
  new CylinderGeometry(r, r, h, segments).translate(x, y, z)

export const merge = (geometries: BufferGeometry[]) => {
  const merged = mergeGeometries(geometries, false)
  geometries.forEach((g) => g.dispose())
  return merged
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
/** Progresso local: 0 antes de `from`, 1 depois de `to`. */
export const span = (v: number, from: number, to: number) => clamp01((v - from) / (to - from))
export const ease = (t: number) => t * t * (3 - 2 * t)
export const easeOut = (t: number) => 1 - (1 - t) ** 3

/* ─── Materiais e montagem ───────────────────────────────────────────────── */

export interface Fill {
  mesh: Mesh
  /** 0 = cor do fundo, 1 = cor de destaque. */
  mix: number
}

export class Kit {
  palette: Palette
  readonly face = new MeshBasicMaterial({ polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 })
  readonly line = new LineMaterial({ linewidth: 1.3, alphaToCoverage: true })
  readonly dim = new LineMaterial({ linewidth: 1, alphaToCoverage: true })
  readonly accentLine = new LineMaterial({ linewidth: 1.7, alphaToCoverage: true })
  private readonly fills: Fill[] = []
  private readonly fades: { material: LineMaterial; key: 'line' | 'accent' }[] = []
  private readonly trash: { dispose: () => void }[] = [this.face, this.line, this.dim, this.accentLine]

  constructor(palette: Palette) {
    this.palette = palette
    this.setPalette(palette)
  }

  setPalette(palette: Palette) {
    this.palette = palette
    this.face.color.copy(palette.bg)
    this.line.color.copy(palette.line)
    this.dim.color.copy(palette.dim)
    this.accentLine.color.copy(palette.accent)
    this.fades.forEach((f) => f.material.color.copy(palette[f.key]))
    this.paintFills()
  }

  /** Recalcula a cor das faces de destaque. Chamado a cada quadro. */
  paintFills() {
    const { bg, accent } = this.palette
    for (const fill of this.fills) (fill.mesh.material as MeshBasicMaterial).color.copy(bg).lerp(accent, clamp01(fill.mix))
  }

  track<T extends { dispose: () => void }>(item: T) {
    this.trash.push(item)
    return item
  }

  /** Arestas de uma geometria, como linhas de espessura fixa em pixels. */
  edges(geometry: BufferGeometry, material: LineMaterial = this.line, threshold = 1) {
    const source = new EdgesGeometry(geometry, threshold)
    const lineGeometry = this.track(new LineSegmentsGeometry().fromEdgesGeometry(source))
    source.dispose()
    return new LineSegments2(lineGeometry, material)
  }

  /** Objeto sólido no estilo de desenho técnico: faces da cor do fundo + arestas. */
  solid(geometry: BufferGeometry, material: LineMaterial = this.line, threshold = 1) {
    this.track(geometry)
    const group = new Group()
    group.add(new Mesh(geometry, this.face), this.edges(geometry, material, threshold))
    return group
  }

  /** Como `solid`, mas com faces que podem ser pintadas com a cor de destaque (fill.mix). */
  fillable(geometry: BufferGeometry, mix = 0, material: LineMaterial = this.line, threshold = 1) {
    this.track(geometry)
    const faceMaterial = this.track(
      new MeshBasicMaterial({ polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }),
    )
    const mesh = new Mesh(geometry, faceMaterial)
    const fill: Fill = { mesh, mix }
    this.fills.push(fill)
    const group = new Group()
    group.add(mesh, this.edges(geometry, material, threshold))
    return { group, fill }
  }

  /** Linha contínua passando pelos pontos [x, y, z, x, y, z, ...]. */
  polyline(points: number[], material: LineMaterial = this.line) {
    const geometry = this.track(new LineGeometry())
    geometry.setPositions(points)
    return new Line2(geometry, material)
  }

  /** Material de linha com transparência própria, para elementos que aparecem e somem. */
  fadeLine(key: 'line' | 'accent' = 'accent', linewidth = 1.6) {
    const material = this.track(new LineMaterial({ linewidth, transparent: true, opacity: 0, depthWrite: false }))
    material.color.copy(this.palette[key])
    this.fades.push({ material, key })
    return material
  }

  dispose() {
    this.trash.forEach((item) => item.dispose())
    this.trash.length = 0
    this.fills.length = 0
  }
}
