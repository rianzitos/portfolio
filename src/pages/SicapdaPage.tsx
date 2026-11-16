import { ArrowLeft } from 'lucide-react'
import { useInitialHashScroll } from '../lib/useInitialHashScroll'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { BrandIcon } from '../components/ui/BrandIcon'
import { ButtonLink, TextLink } from '../components/ui/ButtonLink'
import { BrowserFrame } from '../components/ui/Frames'
import { Reveal, RevealLines } from '../components/ui/Reveal'
import { SectionHead } from '../components/ui/SectionHead'
import { sicapda } from '../content/sicapda'
import { pad2 } from '../lib/format'
import { AppScreens } from '../sicapda/AppScreens'
import { FlowDiagram } from '../sicapda/FlowDiagram'
import { ScreenGallery } from '../sicapda/ScreenGallery'
import { VideoTour } from '../sicapda/VideoTour'
import { SicapdaWordmark } from '../sicapda/Wordmark'

const HOME = '../'

const navItems = [
  { id: 'visao-geral', label: 'Visão geral', href: '#visao-geral' },
  { id: 'como-funciona', label: 'Como funciona', href: '#como-funciona' },
  { id: 'funcionalidades', label: 'Funcionalidades', href: '#funcionalidades' },
  { id: 'telas', label: 'Telas', href: '#telas' },
  { id: 'aplicativo', label: 'App', href: '#aplicativo' },
  { id: 'equipe', label: 'Equipe', href: '#equipe' },
] as const

export function SicapdaPage() {
  useInitialHashScroll()
  const painel = sicapda.screens[0]
  return (
    <>
      <SiteHeader items={navItems} backHref={HOME} homeHref="#topo" />
      <main id="conteudo">
        {/* Capa */}
        <section id="topo" data-theme="dark" className="relative overflow-hidden bg-ink pt-28 pb-20 text-paper sm:pt-36">
          <div className="shell [container-type:inline-size]">
            <nav aria-label="Você está em" className="eyebrow flex flex-wrap items-center gap-2 text-muted-dark">
              <a href={HOME} className="link-underline">
                Portfólio
              </a>
              <span aria-hidden>/</span>
              <a href={`${HOME}#sicapda`} className="link-underline">
                Projetos
              </a>
              <span aria-hidden>/</span>
              <span className="text-paper" aria-current="page">
                SICAPDA
              </span>
            </nav>
            <p className="eyebrow mt-10 flex items-center gap-2 text-sica">
              <span aria-hidden className="size-1.5 bg-sica" /> Estudo de caso
            </p>
            <h1 className="mt-5">
              <SicapdaWordmark className="text-[clamp(3rem,17.6cqw,20rem)] leading-[0.8] tracking-[-0.05em]" />
            </h1>
            <p className="mt-6 max-w-3xl text-[clamp(1.2rem,2.2vw,1.75rem)] leading-tight font-medium tracking-[-0.015em] text-balance text-paper/90 [font-stretch:110%]">
              {sicapda.fullName}
            </p>

            <div className="grid-12 mt-14 gap-y-10">
              <p className="col-span-12 text-[1.15rem] leading-relaxed text-pretty text-paper/85 sm:text-[1.25rem] lg:col-span-6">
                {sicapda.summary}
              </p>
              <dl className="col-span-12 border-b border-paper/15 lg:col-span-5 lg:col-start-8">
                {sicapda.meta.map((m) => (
                  <div key={m.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-paper/15 py-3">
                    <dt className="eyebrow pt-[0.2em] text-muted-dark">{m.label}</dt>
                    <dd className="font-medium">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={sicapda.links.repo} variant="sica" arrow="external">
                Repositório do sistema
              </ButtonLink>
              <ButtonLink href={sicapda.links.app} variant="outline-dark" arrow="external">
                Repositório do app
              </ButtonLink>
              <ButtonLink href={sicapda.links.site} variant="outline-dark" arrow="external">
                Site do projeto
              </ButtonLink>
            </div>

            <Reveal className="mt-16" y={48}>
              <BrowserFrame path={painel.path}>
                <img
                  src={painel.src}
                  alt={`Painel geral do SICAPDA. ${painel.caption}`}
                  width={2400}
                  height={1500}
                  fetchPriority="high"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </BrowserFrame>
            </Reveal>
          </div>
        </section>

        {/* Visão geral: vídeo + problema/proposta */}
        <section id="visao-geral" data-theme="dark" className="bg-ink pb-24 text-paper sm:pb-32">
          <div className="shell">
            <SectionHead index="01" label="Visão geral" tone="dark" aside={`Tour de ${sicapda.video.duration}`} />
            <Reveal className="mt-10">
              <VideoTour />
            </Reveal>
            <div className="grid-12 mt-20 gap-y-12">
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
          </div>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="grain relative bg-paper py-24 text-ink sm:py-32">
          <div className="shell relative">
            <SectionHead index="02" label="Como funciona" aside="Do cartão ao painel" />
            <RevealLines
              className="display mt-12 text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[0.92]"
              lines={['Cada passagem na catraca', 'alimenta a previsão.']}
            />
            <div className="mt-16">
              <FlowDiagram />
            </div>
          </div>
        </section>

        {/* Funcionalidades */}
        <section id="funcionalidades" className="relative bg-paper-2 py-24 text-ink sm:py-32">
          <div className="shell">
            <SectionHead index="03" label="Funcionalidades" aside="Com o arquivo onde cada uma vive no código" />
            <ol className="mt-12 grid gap-x-10 border-b border-ink/15 sm:mt-16 md:grid-cols-2">
              {sicapda.features.map((f, i) => (
                <li key={f.title} className="border-t border-ink/15 py-7">
                  <Reveal delay={(i % 2) * 0.06} className="grid grid-cols-[2.5rem_1fr] gap-x-3">
                    <span className="eyebrow pt-1.5 tabular text-muted">{pad2(i + 1)}</span>
                    <div>
                      <h3 className="text-[1.35rem] leading-tight font-bold tracking-[-0.02em] [font-stretch:110%]">{f.title}</h3>
                      <p className="mt-2 leading-relaxed text-pretty text-muted">{f.text}</p>
                      <p className="mt-3 inline-block bg-ink px-2 py-1 font-mono text-[0.72rem] text-paper/90">{f.path}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Telas */}
        <section id="telas" data-theme="dark" className="bg-ink py-24 text-paper sm:py-32">
          <div className="shell">
            <SectionHead index="04" label="Telas do sistema web" tone="dark" aside={`${sicapda.screens.length} capturas`} />
            <Reveal className="mt-12">
              <ScreenGallery screens={sicapda.screens} />
            </Reveal>
            <p className="eyebrow mt-8 max-w-3xl leading-relaxed normal-case tracking-normal text-muted-dark">
              {sicapda.screenshotNote}
            </p>
          </div>
        </section>

        {/* Aplicativo */}
        <section id="aplicativo" data-theme="dark" className="border-t border-paper/10 bg-ink-2 py-24 text-paper sm:py-32">
          <div className="shell">
            <SectionHead index="05" label="Aplicativo" tone="dark" aside="Flutter · Android, Windows e navegador" />
            <div className="grid-12 mt-12 gap-y-8">
              <RevealLines
                className="display col-span-12 text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[0.92] lg:col-span-8"
                lines={['O mesmo sistema,', 'no bolso do gestor.']}
              />
              <Reveal className="col-span-12 self-end lg:col-span-4 lg:col-start-9">
                <p className="leading-relaxed text-pretty text-paper/80">
                  O app em Flutter usa o mesmo login, a mesma API e as mesmas regras do site. Quem cuida da cozinha ou da portaria
                  consulta a previsão, vê quem está no local, cadastra cartões e acompanha as catracas sem estar no computador.
                </p>
                <TextLink href={sicapda.links.app} className="eyebrow mt-5 text-sica">
                  Código do aplicativo
                </TextLink>
              </Reveal>
            </div>
            <div className="mt-14">
              <AppScreens />
            </div>
          </div>
        </section>

        {/* Engenharia */}
        <section id="engenharia" className="relative bg-paper py-24 text-ink sm:py-32">
          <div className="shell">
            <SectionHead index="06" label="Detalhes de engenharia" aside="Problemas pequenos que fazem diferença" />
            <ol className="mt-12 grid gap-px border border-ink/15 bg-ink/15 sm:mt-16 md:grid-cols-2">
              {sicapda.engineering.map((e, i) => (
                <li key={e.title} className="bg-paper p-6 sm:p-8">
                  <Reveal delay={(i % 2) * 0.06}>
                    <p className="eyebrow tabular text-signal-ink">{pad2(i + 1)}</p>
                    <h3 className="mt-3 text-[1.5rem] leading-tight font-bold tracking-[-0.025em] [font-stretch:115%]">{e.title}</h3>
                    <p className="mt-3 leading-relaxed text-pretty text-muted">{e.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Equipe e tecnologias */}
        <section id="equipe" className="grain relative bg-paper-2 py-24 text-ink sm:py-32">
          <div className="shell relative">
            <SectionHead index="07" label="Equipe e tecnologias" aside="FLUXE" />
            <div className="grid-12 mt-12 gap-y-14 sm:mt-16">
              <div className="col-span-12 lg:col-span-6">
                <h2 className="display text-[clamp(2.25rem,5vw,4rem)]">Equipe FLUXE</h2>
                <ul className="mt-8 border-b border-ink/15">
                  {sicapda.team.map((m) => (
                    <li key={m.name} className="flex items-baseline justify-between gap-4 border-t border-ink/15 py-3.5">
                      <span className="text-[1.1rem] font-semibold">
                        {m.name}
                        {'me' in m && m.me && <span className="eyebrow ml-2 bg-signal px-1.5 py-0.5 text-ink">eu</span>}
                      </span>
                      <span className="text-right text-[0.95rem] text-muted">{m.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-12 lg:col-span-5 lg:col-start-8">
                <h2 className="display text-[clamp(2.25rem,5vw,4rem)]">Stack</h2>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {sicapda.tech.map((t) => (
                    <li key={t} className="border border-ink px-3 py-2 font-semibold">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="eyebrow mt-6 text-muted">Também no projeto</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {sicapda.techExtra.map((t) => (
                    <li key={t} className="border border-ink/25 px-3 py-1.5 text-[0.92rem]">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-20 flex flex-col gap-6 border-t border-ink pt-8 sm:flex-row sm:items-center sm:justify-between">
              <a href={HOME} className="group inline-flex min-h-12 items-center gap-3 text-[1.25rem] font-bold tracking-[-0.02em]">
                <ArrowLeft aria-hidden size={22} className="transition-transform duration-300 group-hover:-translate-x-1" />
                Voltar ao portfólio
              </a>
              <a
                href={sicapda.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center gap-3 font-semibold"
              >
                <BrandIcon name="github" size={18} />
                <span className="link-underline">rianzitos/SystemFluxe</span>
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter topHref="#topo" />
    </>
  )
}
