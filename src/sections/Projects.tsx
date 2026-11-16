import { ArrowUpRight } from 'lucide-react'
import { BrandIcon } from '../components/ui/BrandIcon'
import { Reveal } from '../components/ui/Reveal'
import { SectionHead } from '../components/ui/SectionHead'
import { TextLink } from '../components/ui/ButtonLink'
import { sectionNumber } from '../content/navigation'
import { profile } from '../content/profile'
import { projects, type Project } from '../content/projects'

export function Projects() {
  const n = sectionNumber('projetos')
  return (
    <section id="projetos" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHead
          index={n}
          label="Outros projetos"
          aside={<TextLink href={profile.links.github.url}>Mais no GitHub</TextLink>}
        />
        <ol className="mt-12 sm:mt-16">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={`${n}.${i + 1}`} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function ProjectRow({ project, index }: { project: Project; index: string }) {
  const image = project.images?.[0]
  return (
    <li className="border-t border-ink/15 py-12 first:border-t-0 first:pt-4 sm:py-16 sm:first:pt-6">
      <Reveal className="grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-6">
          <p className="eyebrow tabular text-muted">{index}</p>
          <h3 className="display mt-3 text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.9]">{project.title}</h3>
          <p className="mt-6 max-w-xl text-[1.2rem] leading-snug font-medium tracking-[-0.01em] text-pretty">{project.summary}</p>
          <p className="mt-4 max-w-xl leading-relaxed text-pretty text-muted">{project.description}</p>

          <ul className="mt-6 max-w-xl border-b border-ink/15">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 border-t border-ink/15 py-2 text-[0.95rem]">
                <span aria-hidden className="mt-[0.6em] size-1 shrink-0 bg-signal" />
                {h}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Tecnologias">
            {project.tech.map((t) => (
              <li key={t} className="eyebrow border border-ink/20 px-2 py-1 text-[0.68rem]">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 font-semibold"
              >
                <BrandIcon name="github" size={16} />
                <span className="link-underline">Repositório</span>
                <ArrowUpRight aria-hidden size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 font-semibold"
              >
                <span className="link-underline">Ver online</span>
                <ArrowUpRight aria-hidden size={15} />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            )}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          {image ? (
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full border border-ink/15 object-cover object-top"
            />
          ) : (
            <ProjectCover project={project} />
          )}
        </div>
      </Reveal>
    </li>
  )
}

/** Capa tipográfica para projetos que ainda não têm captura de tela. */
function ProjectCover({ project }: { project: Project }) {
  const { background, foreground, logo } = project.cover
  return (
    <div
      className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden p-6 [container-type:inline-size] sm:p-8"
      style={{ background, color: foreground }}
    >
      <div className="eyebrow flex justify-between gap-4 opacity-70">
        <span>{project.tech.slice(0, 3).join(' · ')}</span>
        <span>{project.slug}</span>
      </div>
      {logo ? (
        <img src={logo} alt={`Logo do ${project.title}`} className="mx-auto w-[72%] max-w-md" loading="lazy" decoding="async" />
      ) : (
        <p className="display text-[13cqw] leading-[0.85] whitespace-nowrap">{project.title}</p>
      )}
      <div aria-hidden className="grid grid-cols-12 gap-1 opacity-25">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className="h-1.5 bg-current" style={{ opacity: ((i * 7) % 10) / 10 + 0.1 }} />
        ))}
      </div>
    </div>
  )
}
