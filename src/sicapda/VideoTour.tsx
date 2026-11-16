import { Maximize2, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { sicapda } from '../content/sicapda'
import { cn } from '../lib/cn'
import { formatSeconds } from '../lib/format'

const { video } = sicapda

/**
 * Tour de 30 segundos do sistema (vídeo do próprio repositório).
 * Toca sem som e em loop quando aparece na tela; pausa quando sai.
 * Com "reduzir movimento", só toca se a pessoa apertar o play.
 * A barra de progresso é dividida pelos capítulos do vídeo.
 */
export function VideoTour({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(30)
  const userPaused = useRef(false)

  // preload="none": o vídeo só é baixado quando começa a tocar.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current
        if (!v) return
        if (entry.isIntersecting) {
          if (!reduce && !userPaused.current) v.play().catch(() => undefined)
        } else if (!v.paused) {
          v.pause()
        }
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduce])

  const chapters = video.chapters.map((c, i) => {
    const start = i === 0 ? 0 : c.time
    const end = video.chapters[i + 1]?.time ?? duration
    return { ...c, start, end }
  })
  const currentIndex = chapters.findIndex((c) => time >= c.start && time < c.end)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      userPaused.current = false
      v.play().catch(() => undefined)
    } else {
      userPaused.current = true
      v.pause()
    }
  }

  const seek = (t: number) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = t
    setTime(t)
    userPaused.current = false
    v.play().catch(() => undefined)
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    if (!v.muted && v.paused) v.play().catch(() => undefined)
  }

  const fullscreen = () => {
    const v = videoRef.current
    if (!v) return
    const anyVideo = v as HTMLVideoElement & { webkitEnterFullscreen?: () => void }
    if (v.requestFullscreen) v.requestFullscreen().catch(() => undefined)
    else anyVideo.webkitEnterFullscreen?.()
  }

  return (
    <div className={cn('text-paper', className)}>
      <div ref={wrapRef} className="group/video relative aspect-video overflow-hidden border border-paper/15 bg-ink-2">
        <video
          ref={videoRef}
          className="size-full object-cover"
          poster={video.poster}
          src={video.src}
          muted={muted}
          loop
          playsInline
          preload="none"
          aria-label="Tour de 30 segundos pelo SICAPDA: login, painel, análise mensal, pessoas, assistente, relatórios, configurações e aplicativo"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 30)}
          onClick={toggle}
        />

        {!playing && (
          <button
            type="button"
            onClick={toggle}
            className="absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors hover:bg-ink/10"
          >
            <span className="flex items-center gap-2.5 bg-sica px-3.5 py-2.5 text-[0.9rem] font-semibold text-ink sm:gap-3 sm:px-5 sm:py-3.5 sm:text-base">
              <Play aria-hidden size={16} fill="currentColor" />
              Assistir ao tour · {video.duration}
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/70 to-transparent p-3 sm:p-4">
          <div className="pointer-events-auto flex gap-2">
            <ControlButton onClick={toggle} label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}>
              {playing ? <Pause aria-hidden size={16} /> : <Play aria-hidden size={16} />}
            </ControlButton>
            <ControlButton onClick={toggleMute} label={muted ? 'Ativar som' : 'Desativar som'} wide>
              {muted ? <VolumeX aria-hidden size={16} /> : <Volume2 aria-hidden size={16} />}
              <span className="eyebrow hidden sm:inline">{muted ? 'Ativar som' : 'Som ligado'}</span>
            </ControlButton>
          </div>
          <div className="pointer-events-auto flex items-center gap-3">
            <span className="eyebrow tabular text-paper/80">
              {formatSeconds(time)} / {formatSeconds(duration)}
            </span>
            <ControlButton onClick={fullscreen} label="Tela cheia">
              <Maximize2 aria-hidden size={16} />
            </ControlButton>
          </div>
        </div>
      </div>

      <ol className="mt-3 grid grid-cols-4 gap-x-1.5 gap-y-3 md:grid-cols-8" aria-label="Capítulos do vídeo">
        {chapters.map((c, i) => {
          const span = c.end - c.start
          const fill = Math.min(1, Math.max(0, (time - c.start) / span))
          const active = i === currentIndex
          return (
            <li key={c.label}>
              <button
                type="button"
                onClick={() => seek(c.time)}
                aria-current={active ? 'step' : undefined}
                className="group/chap block w-full pt-1 text-left"
              >
                <span className="relative block h-[3px] overflow-hidden bg-paper/15">
                  <span
                    className="absolute inset-y-0 left-0 bg-sica transition-[width] duration-300 ease-linear"
                    style={{ width: `${(i < currentIndex ? 1 : active ? fill : 0) * 100}%` }}
                  />
                </span>
                <span
                  className={cn(
                    'eyebrow mt-2 flex min-h-8 flex-col gap-0.5 transition-colors',
                    active ? 'text-paper' : 'text-muted-dark group-hover/chap:text-paper',
                  )}
                >
                  <span className="tabular text-[0.65rem] opacity-70">{formatSeconds(c.time)}</span>
                  <span className="text-[0.66rem] leading-tight normal-case tracking-normal [overflow-wrap:anywhere] sm:text-[0.72rem]">{c.label}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function ControlButton({
  onClick,
  label,
  children,
  wide,
}: {
  onClick: () => void
  label: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'inline-flex h-11 items-center justify-center gap-2 border border-paper/25 bg-ink/60 text-paper backdrop-blur-sm transition-colors hover:bg-paper hover:text-ink',
        wide ? 'px-3' : 'w-11',
      )}
    >
      {children}
    </button>
  )
}
