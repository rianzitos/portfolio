import { useEffect, useState } from 'react'

const formatTime = (timeZone: string) =>
  new Intl.DateTimeFormat('pt-BR', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())

/** Hora atual em um fuso específico (ex.: America/Sao_Paulo), atualizada a cada 15 s. */
export function useLocalTime(timeZone: string) {
  const [time, setTime] = useState(() => formatTime(timeZone))

  useEffect(() => {
    setTime(formatTime(timeZone))
    const id = window.setInterval(() => setTime(formatTime(timeZone)), 15_000)
    return () => window.clearInterval(id)
  }, [timeZone])

  return time
}
