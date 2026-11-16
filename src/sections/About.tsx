import { Reveal, RevealLines } from '../components/ui/Reveal'
import { SectionHead } from '../components/ui/SectionHead'
import { sectionNumber } from '../content/navigation'
import { profile } from '../content/profile'

export function About() {
  const { about, photo } = profile
  return (
    <section id="sobre" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHead index={sectionNumber('sobre')} label="Sobre" aside="Quem está por trás do código" />

        <div className="grid-12 mt-12 gap-y-14 sm:mt-16">
          <Reveal className="col-span-12 sm:col-span-7 md:col-span-5 lg:col-span-4">
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden bg-paper-3">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={720}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover grayscale contrast-[1.08] transition-[filter] duration-700 hover:grayscale-0"
                />
                <span aria-hidden className="absolute top-3 left-3 size-3 border-t border-l border-paper" />
                <span aria-hidden className="absolute right-3 bottom-3 size-3 border-r border-b border-paper" />
              </div>
              <figcaption className="eyebrow mt-3 flex justify-between gap-4 text-muted">
                <span>Fig. 01</span>
                <span>{photo.caption}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
            <RevealLines
              as="p"
              className="text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.06] font-semibold tracking-[-0.03em] [font-stretch:110%] text-balance"
              lines={[about.lead]}
            />

            <div className="mt-12 grid gap-x-8 gap-y-8 xl:grid-cols-3 xl:gap-y-10">
              {about.paragraphs.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08} className="grid gap-x-6 sm:grid-cols-[9rem_1fr] xl:block">
                  <h3 className="eyebrow flex items-center gap-2 self-start pt-1 text-signal-ink xl:pt-0">
                    <span aria-hidden className="size-1.5 bg-signal" />
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-pretty sm:mt-0 xl:mt-3">{p.text}</p>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <dl className="mt-14 border-b border-ink/15">
                {about.facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-ink/15 py-3 sm:grid-cols-[10rem_1fr]">
                    <dt className="eyebrow pt-[0.2em] text-muted">{f.label}</dt>
                    <dd className="font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
