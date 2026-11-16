import { ButtonLink, TextLink } from '../components/ui/ButtonLink'
import { Reveal } from '../components/ui/Reveal'
import { SectionHead } from '../components/ui/SectionHead'
import { sectionNumber } from '../content/navigation'
import { sicapda } from '../content/sicapda'
import { ScreenGallery } from '../sicapda/ScreenGallery'
import { VideoTour } from '../sicapda/VideoTour'
import { SicapdaWordmark } from '../sicapda/Wordmark'

const homeScreens = sicapda.screens.filter((s) =>
  ['painel', 'analise', 'producao', 'pessoas', 'relatorios', 'assistente', 'painel-escuro'].includes(s.id),
)

/** Capítulo escuro do projeto principal. Usa o amarelo da marca do SICAPDA como acento local. */
export function FeaturedSicapda({ caseStudyHref }: { caseStudyHref: string }) {
  return (
    <section id="sicapda" data-theme="dark" className="relative bg-ink py-24 text-paper sm:py-32">
      <div className="shell [container-type:inline-size]">
        <SectionHead
          index={sectionNumber('sicapda')}
          label="Projeto principal"
          tone="dark"
          aside="Projeto Integrador · SENAI · Equipe FLUXE"
        />

        <Reveal className="mt-12 sm:mt-16" y={40}>
          <h2>
            <SicapdaWordmark className="text-[clamp(3rem,17.6cqw,20rem)] leading-[0.8] tracking-[-0.05em]" />
          </h2>
          <p className="mt-6 max-w-3xl text-[clamp(1.15rem,2vw,1.6rem)] leading-tight font-medium tracking-[-0.015em] text-balance text-paper/90 [font-stretch:110%]">
            {sicapda.fullName}
          </p>
        </Reveal>

        <div className="grid-12 mt-14 gap-y-12">
          <Reveal className="col-span-12 lg:col-span-6">
            <p className="text-[1.15rem] leading-relaxed text-pretty text-paper/85 sm:text-[1.25rem]">{sicapda.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={caseStudyHref} variant="sica">
                Ver estudo de caso
              </ButtonLink>
              <ButtonLink href={sicapda.links.repo} variant="outline-dark" arrow="external">
                Repositório
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-5 lg:col-start-8" delay={0.1}>
            <dl className="border-b border-paper/15">
              {sicapda.meta.map((m) => (
                <div key={m.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-paper/15 py-3">
                  <dt className="eyebrow pt-[0.2em] text-muted-dark">{m.label}</dt>
                  <dd className="font-medium">{m.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-paper/15 py-3">
                <dt className="eyebrow pt-[0.2em] text-muted-dark">Stack</dt>
                <dd>
                  <ul className="flex flex-wrap gap-1.5">
                    {sicapda.tech.map((t) => (
                      <li key={t} className="eyebrow border border-paper/20 px-2 py-1 text-[0.68rem] text-paper/90">
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h3 className="eyebrow text-paper">Tour pelo sistema</h3>
            <p className="eyebrow text-muted-dark">{sicapda.video.duration} · do login ao aplicativo</p>
          </div>
          <VideoTour />
        </Reveal>

        <div className="grid-12 mt-24 gap-y-12">
          {[sicapda.problem, sicapda.solution].map((block, i) => (
            <Reveal key={block.title} delay={i * 0.08} className="col-span-12 md:col-span-6 lg:col-span-5 lg:even:col-start-7">
              <p className="eyebrow flex items-center gap-2 text-sica">
                <span aria-hidden className="size-1.5 bg-sica" />
                {block.title}
              </p>
              <p className="mt-4 text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.25] font-medium tracking-[-0.02em] text-pretty">
                {block.text}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <h3 className="eyebrow text-paper">Telas do sistema web</h3>
            <TextLink href={caseStudyHref} className="eyebrow text-sica">
              Todas as telas e o aplicativo
            </TextLink>
          </div>
          <ScreenGallery screens={homeScreens} />
          <p className="eyebrow mt-8 max-w-3xl leading-relaxed normal-case tracking-normal text-muted-dark">
            {sicapda.screenshotNote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
