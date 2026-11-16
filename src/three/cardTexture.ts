/**
 * Desenha as duas faces do cartão em <canvas>. O resultado vira textura no Three.js.
 * Como é desenhado na hora, usa as fontes e as cores do site e acompanha idioma e tema.
 */

export const CARD_RATIO = 1.585 // cartão padrão ISO ID-1 (85,6 × 54 mm)
const W = 1400
const H = Math.round(W / CARD_RATIO)

export interface CardContent {
  name: string
  role: string
  place: string
  label: string
  contactLabel: string
  contacts: string[]
}

export interface CardColors {
  body: string
  text: string
  signal: string
  carbon: string
}

const DISPLAY = '"Archivo Variable", "Archivo", system-ui, sans-serif'
const MONO = '"IBM Plex Mono", ui-monospace, monospace'

type Ctx = CanvasRenderingContext2D & { fontStretch?: string; letterSpacing?: string }

function setup(canvas: HTMLCanvasElement) {
  canvas.width = W
  canvas.height = H
  return canvas.getContext('2d') as Ctx
}

function mono(ctx: Ctx, size: number, spacing = 0.08) {
  ctx.font = `500 ${size}px ${MONO}`
  ctx.fontStretch = 'normal'
  ctx.letterSpacing = `${size * spacing}px`
}

function display(ctx: Ctx, size: number) {
  ctx.font = `800 ${size}px ${DISPLAY}`
  ctx.fontStretch = 'expanded'
  ctx.letterSpacing = `${-size * 0.035}px`
}

/** Símbolo de aproximação (ondas), como nos cartões sem contato. */
function contactless(ctx: Ctx, x: number, y: number, size: number, color: string, alpha = 1) {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.strokeStyle = color
  ctx.lineWidth = size * 0.09
  ctx.lineCap = 'round'
  for (let i = 0; i < 4; i += 1) {
    const r = size * (0.22 + i * 0.22)
    ctx.beginPath()
    ctx.arc(x, y, r, -Math.PI / 3.4, Math.PI / 3.4)
    ctx.stroke()
  }
  ctx.restore()
}

function chip(ctx: Ctx, x: number, y: number, w: number, h: number, colors: CardColors) {
  const r = h * 0.16
  ctx.fillStyle = colors.signal
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.fill()
  ctx.strokeStyle = colors.carbon
  ctx.lineWidth = 3
  ctx.beginPath()
  // contatos do chip
  ctx.moveTo(x, y + h * 0.34)
  ctx.lineTo(x + w * 0.3, y + h * 0.34)
  ctx.moveTo(x, y + h * 0.66)
  ctx.lineTo(x + w * 0.3, y + h * 0.66)
  ctx.moveTo(x + w, y + h * 0.34)
  ctx.lineTo(x + w * 0.7, y + h * 0.34)
  ctx.moveTo(x + w, y + h * 0.66)
  ctx.lineTo(x + w * 0.7, y + h * 0.66)
  ctx.roundRect(x + w * 0.3, y + h * 0.18, w * 0.4, h * 0.64, r * 0.6)
  ctx.stroke()
}

function frame(ctx: Ctx, colors: CardColors) {
  ctx.fillStyle = colors.body
  ctx.fillRect(0, 0, W, H)
  ctx.save()
  ctx.globalAlpha = 0.16
  ctx.strokeStyle = colors.text
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.roundRect(34, 34, W - 68, H - 68, 44)
  ctx.stroke()
  ctx.restore()
}

export function drawCardFront(canvas: HTMLCanvasElement, content: CardContent, colors: CardColors) {
  const ctx = setup(canvas)
  const pad = 92
  frame(ctx, colors)

  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = colors.text

  mono(ctx, 30)
  ctx.globalAlpha = 0.62
  ctx.fillText(content.label.toUpperCase(), pad, pad + 26)
  ctx.globalAlpha = 1

  contactless(ctx, W - pad - 96, pad + 150, 120, colors.text, 0.9)
  chip(ctx, pad, pad + 96, 178, 132, colors)

  // Nome, ajustado para caber na largura do cartão
  ctx.fillStyle = colors.text
  let size = 158
  display(ctx, size)
  const maxWidth = W - pad * 2 - 60
  const measured = ctx.measureText(content.name).width
  if (measured > maxWidth) {
    size = Math.floor((size * maxWidth) / measured)
    display(ctx, size)
  }
  const nameY = H - pad - 88
  ctx.fillText(content.name, pad - 6, nameY)
  const nameWidth = ctx.measureText(content.name).width
  ctx.fillStyle = colors.signal
  ctx.fillRect(pad - 6 + nameWidth + size * 0.05, nameY - size * 0.2, size * 0.2, size * 0.2)

  ctx.fillStyle = colors.text
  mono(ctx, 29)
  ctx.globalAlpha = 0.78
  ctx.fillText(content.role.toUpperCase(), pad, H - pad - 14)
  ctx.textAlign = 'right'
  ctx.globalAlpha = 0.62
  ctx.fillText(content.place.toUpperCase(), W - pad, pad + 26)
  ctx.textAlign = 'left'
  ctx.globalAlpha = 1
}

export function drawCardBack(canvas: HTMLCanvasElement, content: CardContent, colors: CardColors) {
  const ctx = setup(canvas)
  const pad = 92
  frame(ctx, colors)

  contactless(ctx, W - pad - 250, H / 2, 330, colors.text, 0.1)

  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = colors.text
  mono(ctx, 30)
  ctx.globalAlpha = 0.62
  ctx.fillText(content.contactLabel.toUpperCase(), pad, pad + 26)
  ctx.globalAlpha = 1

  const rows = content.contacts
  const lineHeight = 96
  const top = H / 2 - ((rows.length - 1) * lineHeight) / 2 + 30
  rows.forEach((row, i) => {
    const y = top + i * lineHeight
    ctx.fillStyle = colors.signal
    ctx.fillRect(pad, y - 26, 16, 16)
    ctx.fillStyle = colors.text
    mono(ctx, 43, 0)
    ctx.fillText(row, pad + 42, y)
    ctx.save()
    ctx.globalAlpha = 0.16
    ctx.fillRect(pad, y + 30, W - pad * 2, 2)
    ctx.restore()
  })

  display(ctx, 54)
  ctx.fillStyle = colors.text
  ctx.fillText(content.name, pad - 2, H - pad)
  const nameWidth = ctx.measureText(content.name).width
  ctx.fillStyle = colors.signal
  ctx.fillRect(pad - 2 + nameWidth + 4, H - pad - 12, 12, 12)
}

/** Espera as fontes do site estarem prontas para o canvas poder usá-las. */
export async function loadCardFonts() {
  try {
    await Promise.all([
      document.fonts.load(`800 100px ${DISPLAY}`, 'Rian Rafael'),
      document.fonts.load(`500 30px ${MONO}`, 'ABC abc 123'),
    ])
  } catch {
    /* sem a API de fontes, o canvas usa as fontes do sistema */
  }
}
