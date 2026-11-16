/** Checagens leves, sem importar o Three.js (que só é baixado quando a cena vai aparecer). */

export function hasWebGL() {
  try {
    return Boolean(document.createElement('canvas').getContext('webgl2'))
  } catch {
    return false
  }
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
