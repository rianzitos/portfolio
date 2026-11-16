import { useEffect } from 'react'
import { scrollToTarget } from './smoothScroll'

/**
 * O conteúdo é montado pelo React depois que a página carrega, então o navegador não
 * consegue pular sozinho para um link como /#cursos. Este hook faz esse pulo.
 */
export function useInitialHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const jump = () => {
      const target = document.getElementById(id)
      if (target) scrollToTarget(target, { immediate: true })
    }
    requestAnimationFrame(jump)
    // As fontes podem mudar a altura dos blocos: confere de novo quando carregarem.
    document.fonts?.ready.then(() => requestAnimationFrame(jump))
  }, [])
}
