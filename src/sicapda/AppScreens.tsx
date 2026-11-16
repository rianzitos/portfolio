import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { PhoneFrame } from '../components/ui/Frames'
import { sicapda } from '../content/sicapda'
import { ui } from '../content/ui'
import { useT } from '../i18n'

/** Faixa horizontal com as telas do aplicativo Flutter. Arraste, role ou use as setas. */
export function AppScreens() {
  const t = useT()
  const trackRef = useRef<HTMLUListElement>(null)

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const item = track.querySelector('li')
    const step = item ? item.getBoundingClientRect().width + 16 : 240
    track.scrollBy({ left: dir * step * 2, behavior: 'smooth' })
  }

  return (
    <div>
      <div className="mb-5 flex justify-end gap-1">
        <button
          type="button"
          aria-label={t(ui.app.previous)}
          onClick={() => scroll(-1)}
          className="inline-flex size-11 items-center justify-center border border-paper/20 text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          <ArrowLeft aria-hidden size={16} />
        </button>
        <button
          type="button"
          aria-label={t(ui.app.next)}
          onClick={() => scroll(1)}
          className="inline-flex size-11 items-center justify-center border border-paper/20 text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          <ArrowRight aria-hidden size={16} />
        </button>
      </div>
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label={t(ui.app.aria)}
        className="-mx-[clamp(1rem,4vw,3rem)] flex snap-x snap-mandatory scroll-px-[clamp(1rem,4vw,3rem)] gap-4 overflow-x-auto px-[clamp(1rem,4vw,3rem)] pb-4 [scrollbar-width:thin] focus-visible:outline-offset-[-2px]"
      >
        {sicapda.appScreens.map((s) => (
          <li key={s.id} className="w-[min(58vw,15rem)] shrink-0 snap-start">
            <PhoneFrame>
              <img
                src={s.src}
                alt={`${t(ui.app.alt)} ${t(s.label)}`}
                width={780}
                height={1688}
                loading="lazy"
                decoding="async"
                className="aspect-[780/1688] w-full object-cover"
              />
            </PhoneFrame>
            <p className="eyebrow mt-3 text-muted-dark">{t(s.label)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
