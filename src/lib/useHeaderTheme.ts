import { useEffect, useState } from 'react'

/**
 * Descobre se o cabeçalho fixo está sobre uma seção escura (data-theme="dark"),
 * para inverter as cores e manter o contraste.
 */
export function useHeaderTheme() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-theme="dark"]'))
    if (!sections.length) return
    const visible = new Set<Element>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setDark(visible.size > 0)
      },
      // Faixa fina no topo da tela, na altura do cabeçalho.
      { rootMargin: '0px 0px -96% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return dark
}
