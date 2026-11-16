import { useEffect } from 'react'

/**
 * O conteúdo é montado pelo React depois que a página carrega, então o navegador não
 * consegue pular sozinho para um link como /#cursos. Este hook faz esse pulo.
 */
export function useInitialHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    requestAnimationFrame(jump)
    // As fontes podem mudar a altura dos blocos: confere de novo quando carregarem.
    document.fonts?.ready.then(() => requestAnimationFrame(jump))
  }, [])
}
