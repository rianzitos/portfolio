import {
  AdditiveBlending,
  CanvasTexture,
  ClampToEdgeWrapping,
  type ColorRepresentation,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  type WebGLRenderer,
} from 'three'
import { CARD_RATIO } from './cardTexture'

/** Cartão de acesso: duas faces com textura e uma borda fina. Largura = 1,6 unidade. */
export const CARD_WIDTH = 1.6
export const CARD_HEIGHT = CARD_WIDTH / CARD_RATIO
const THICKNESS = 0.02
const RADIUS = 0.075

function roundedRect(w: number, h: number, r: number) {
  const shape = new Shape()
  const x = -w / 2
  const y = -h / 2
  shape.moveTo(x + r, y)
  shape.lineTo(x + w - r, y)
  shape.quadraticCurveTo(x + w, y, x + w, y + r)
  shape.lineTo(x + w, y + h - r)
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  shape.lineTo(x + r, y + h)
  shape.quadraticCurveTo(x, y + h, x, y + h - r)
  shape.lineTo(x, y + r)
  shape.quadraticCurveTo(x, y, x + r, y)
  return shape
}

/** A ShapeGeometry usa as coordenadas da forma como UV. Aqui elas viram 0–1. */
function faceGeometry(shape: Shape) {
  const geometry = new ShapeGeometry(shape, 10)
  const position = geometry.attributes.position
  const uv = geometry.attributes.uv
  for (let i = 0; i < position.count; i += 1) {
    uv.setXY(i, (position.getX(i) + CARD_WIDTH / 2) / CARD_WIDTH, (position.getY(i) + CARD_HEIGHT / 2) / CARD_HEIGHT)
  }
  uv.needsUpdate = true
  return geometry
}

function sheenTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 4
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createLinearGradient(0, 0, 256, 0)
  gradient.addColorStop(0, 'rgba(255,255,255,0)')
  gradient.addColorStop(0.5, 'rgba(255,255,255,1)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 256, 4)
  const texture = new CanvasTexture(canvas)
  texture.wrapS = ClampToEdgeWrapping
  texture.wrapT = ClampToEdgeWrapping
  texture.center.set(0.5, 0.5)
  texture.rotation = 0.5
  texture.repeat.set(1.7, 1)
  return texture
}

export interface Card {
  group: Group
  front: HTMLCanvasElement
  back: HTMLCanvasElement
  /** Chame depois de redesenhar os canvas das faces. */
  refresh: () => void
  setRimColor: (color: ColorRepresentation) => void
  /** Posição do reflexo (-1 a 1) e intensidade (0 desliga). */
  setSheen: (position: number, strength: number) => void
  dispose: () => void
}

export function createCard(renderer: WebGLRenderer, { sheen = true }: { sheen?: boolean } = {}): Card {
  const shape = roundedRect(CARD_WIDTH, CARD_HEIGHT, RADIUS)
  const anisotropy = renderer.capabilities.getMaxAnisotropy()

  const makeFace = () => {
    const canvas = document.createElement('canvas')
    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    texture.anisotropy = anisotropy
    return { canvas, texture, material: new MeshBasicMaterial({ map: texture }) }
  }
  const front = makeFace()
  const back = makeFace()

  const face = faceGeometry(shape)
  const rimGeometry = new ExtrudeGeometry(shape, { depth: THICKNESS, bevelEnabled: false, curveSegments: 10 })
  rimGeometry.translate(0, 0, -THICKNESS / 2)
  const rimMaterial = new MeshBasicMaterial()

  const frontMesh = new Mesh(face, front.material)
  frontMesh.position.z = THICKNESS / 2 + 0.0006
  const backMesh = new Mesh(face, back.material)
  backMesh.rotation.y = Math.PI
  backMesh.position.z = -(THICKNESS / 2 + 0.0006)

  const group = new Group()
  group.add(new Mesh(rimGeometry, rimMaterial), frontMesh, backMesh)

  // Reflexo: uma faixa clara que desliza pelo cartão conforme ele inclina.
  const sheenMap = sheen ? sheenTexture() : null
  const sheenMaterial = sheenMap
    ? new MeshBasicMaterial({ map: sheenMap, transparent: true, opacity: 0, depthWrite: false, blending: AdditiveBlending })
    : null
  if (sheenMaterial) {
    const frontSheen = new Mesh(face, sheenMaterial)
    frontSheen.position.z = THICKNESS / 2 + 0.0012
    const backSheen = new Mesh(face, sheenMaterial)
    backSheen.rotation.y = Math.PI
    backSheen.position.z = -(THICKNESS / 2 + 0.0012)
    group.add(frontSheen, backSheen)
  }

  return {
    group,
    front: front.canvas,
    back: back.canvas,
    refresh: () => {
      front.texture.needsUpdate = true
      back.texture.needsUpdate = true
    },
    setRimColor: (color) => rimMaterial.color.set(color),
    setSheen: (position, strength) => {
      if (!sheenMap || !sheenMaterial) return
      sheenMap.offset.x = -position * 0.9
      sheenMaterial.opacity = strength
    },
    dispose: () => {
      face.dispose()
      rimGeometry.dispose()
      rimMaterial.dispose()
      front.texture.dispose()
      front.material.dispose()
      back.texture.dispose()
      back.material.dispose()
      sheenMap?.dispose()
      sheenMaterial?.dispose()
    },
  }
}
