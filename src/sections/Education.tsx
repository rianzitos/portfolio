import { ArrowDownRight } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { SectionHead } from '../components/ui/SectionHead'
import { certificates } from '../content/certificates'
import { education, type EducationItem } from '../content/education'
import { sectionNumber } from '../content/navigation'
import { cn } from '../lib/cn'
import { formatMonthYear } from '../lib/format'

/** Os cursos livres entram na linha do tempo com dados calculados a partir dos certificados. */
function coursesItem(): EducationItem {
  const start = certificates.map((c) => c.start).sort()[0]
  const end = certificates.map((c) => c.end).sort().at(-1) ?? start
  const hours = certificates.reduce((s, c) => s + c.hours, 0)
  return {
    title: 'Cursos livres a distância',
    institution: 'SENAI-SP',
    status: 'Concluído',
    period: `${formatMonthYear(start)} – ${formatMonthYear(end)}`,
    description: `${certificates.length} cursos e ${hours} horas em tecnologia, gestão, sustentabilidade e segurança do trabalho.`,
    href: '#cursos',
  }
}

export function Education() {
  const items = [...education, coursesItem()]
  return (
    <section id="formacao" className="grain relative bg-paper-2 py-24 sm:py-32">
      <div className="shell relative">
        <SectionHead index={sectionNumber('formacao')} label="Formação" aside="Ensino médio, técnico e cursos livres" />

        <div className="grid-12 mt-12 gap-y-12 sm:mt-16">
          <div className="col-span-12 lg:col-span-4">
            <h2 className="display text-[clamp(2.5rem,4.6vw,4.25rem)] lg:sticky lg:top-28">
              Escola,
              <br />
              técnico e<br />
              cursos
            </h2>
          </div>

          <ol className="relative col-span-12 lg:col-span-7 lg:col-start-6">
            <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-ink/25" />
            {items.map((item, i) => (
              <li key={item.title} className="relative pb-14 pl-10 last:pb-0">
                <span
                  aria-hidden
                  className={cn(
                    'absolute top-1.5 left-0 size-[11px]',
                    item.status === 'Em andamento'
                      ? 'bg-signal motion-safe:animate-[pulse-dot_2.4s_infinite]'
                      : 'border border-ink bg-paper-2',
                  )}
                />
                <Reveal delay={i * 0.06}>
                  <p className="eyebrow flex flex-wrap gap-x-3 gap-y-1 text-muted">
                    <span className={item.status === 'Em andamento' ? 'text-signal-ink' : undefined}>{item.status}</span>
                    {item.period && <span>{item.period}</span>}
                  </p>
                  <p className="display mt-3 text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[0.9]">{item.institution}</p>
                  <h3 className="mt-3 text-[1.3rem] leading-tight font-bold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-pretty text-muted">{item.description}</p>
                  {item.href && (
                    <a href={item.href} className="eyebrow group mt-4 inline-flex min-h-11 items-center gap-2">
                      <span className="link-underline">{item.href === '#cursos' ? 'Ver certificados' : 'Ver o projeto integrador'}</span>
                      <ArrowDownRight aria-hidden size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                    </a>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
