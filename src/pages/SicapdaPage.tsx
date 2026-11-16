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
import { FlowStory } from '../three/FlowStory'
import { ScreenGallery } from '../sicapda/ScreenGallery'
import { VideoTour } from '../sicapda/VideoTour'
import { SicapdaWordmark } from '../sicapda/Wordmark'
import { ui } from '../content/ui'
import { useDocumentMeta, useLang } from '../i18n'

const HOME = '../'

const nav = ui.caseStudy.nav
const navItems = [
  { id: 'visao-geral', label: nav.overview, href: '#visao-geral' },
  { id: 'como-funciona', label: nav.how, href: '#como-funciona' },
  { id: 'funcionalidades', label: nav.features, href: '#funcionalidades' },
  { id: 'telas', label: nav.screens, href: '#telas' },
  { id: 'aplicativo', label: nav.app, href: '#aplicativo' },
  { id: 'equipe', label: nav.team, href: '#equipe' },
]

export function SicapdaPage() {
  useInitialHashScroll()
  useDocumentMeta(ui.meta.caseTitle, ui.meta.caseDescription)
  const { t, lang } = useLang()
  const c = ui.caseStudy
  const painel = sicapda.screens[0]
  return (
    <>
      <SiteHeader items={navItems} backHref={HOME} homeHref="#topo" />
      <main id="conteudo">
        {/* Capa */}
        <section id="topo" data-theme="dark" className="relative overflow-hidden bg-ink pt-28 pb-20 text-paper sm:pt-36">
          <div className="shell [container-type:inline-size]">
            <nav aria-label={t(c.breadcrumbAria)} className="eyebrow flex flex-wrap items-center gap-2 text-muted-dark">
              <a href={HOME} className="link-underline">
                {t(ui.common.portfolio)}
              </a>
              <span aria-hidden>/</span>
              <a href={`${HOME}#sicapda`} className="link-underline">
                {t(c.projects)}
              </a>
              <span aria-hidden>/</span>
              <span className="text-paper" aria-current="page">
                SICAPDA
              </span>
            </nav>
            <p className="eyebrow mt-10 flex items-center gap-2 text-sica">
              <span aria-hidden className="size-1.5 bg-sica" /> {t(c.eyebrow)}
            </p>
            <h1 className="mt-5">
              <SicapdaWordmark className="text-[clamp(3rem,17.6cqw,20rem)] leading-[0.8] tracking-[-0.05em]" />
            </h1>
            <p className="mt-6 max-w-3xl text-[clamp(1.2rem,2.2vw,1.75rem)] leading-tight font-medium tracking-[-0.015em] text-balance text-paper/90 [font-stretch:110%]">
              {t(sicapda.fullName)}
            </p>

            <div className="grid-12 mt-14 gap-y-10">
              <p className="col-span-12 text-[1.15rem] leading-relaxed text-pretty text-paper/85 sm:text-[1.25rem] lg:col-span-6">
                {t(sicapda.summary)}
              </p>
              <dl className="col-span-12 border-b border-paper/15 lg:col-span-5 lg:col-start-8">
                {sicapda.meta.map((m) => (
                  <div key={m.label.pt} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-paper/15 py-3">
                    <dt className="eyebrow pt-[0.2em] text-muted-dark">{t(m.label)}</dt>
                    <dd className="font-medium">{t(m.value)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={sicapda.links.repo} variant="sica" arrow="external">
                {t(c.repoSystem)}
              </ButtonLink>
              <ButtonLink href={sicapda.links.app} variant="outline-dark" arrow="external">
                {t(c.repoApp)}
              </ButtonLink>
              <ButtonLink href={sicapda.links.site} variant="outline-dark" arrow="external">
                {t(c.site)}
              </ButtonLink>
            </div>

            <Reveal className="mt-16" y={48}>
              <BrowserFrame path={painel.path}>
                <img
                  src={painel.src}
                  alt={`${t(c.painelAlt)} ${t(painel.caption)}`}
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
            <SectionHead index="01" label={t(nav.overview)} tone="dark" aside={`${t(c.tourOf)} ${sicapda.video.duration}`} />
            <Reveal className="mt-10">
              <VideoTour />
            </Reveal>
            <div className="grid-12 mt-20 gap-y-12">
              {[sicapda.problem, sicapda.solution].map((block, i) => (
                <Reveal key={block.title.pt} delay={i * 0.08} className="col-span-12 md:col-span-6 lg:col-span-5 lg:even:col-start-7">
                  <p className="eyebrow flex items-center gap-2 text-sica">
                    <span aria-hidden className="size-1.5 bg-sica" />
                    {t(block.title)}
                  </p>
                  <p className="mt-4 text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.25] font-medium tracking-[-0.02em] text-pretty">
                    {t(block.text)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="grain relative bg-paper py-24 text-ink sm:py-32">
          <div className="shell relative">
            <SectionHead index="02" label={t(nav.how)} aside={t(c.howAside)} />
            <RevealLines
              key={lang}
              className="display mt-12 text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[0.92]"
              lines={t(c.howTitle)}
            />
          </div>
          <div className="relative mt-12">
            <FlowStory tone="light" />
          </div>
        </section>

        {/* Funcionalidades */}
        <section id="funcionalidades" className="relative bg-paper-2 py-24 text-ink sm:py-32">
          <div className="shell">
            <SectionHead index="03" label={t(nav.features)} aside={t(c.featuresAside)} />
            <ol className="mt-12 grid gap-x-10 border-b border-ink/15 sm:mt-16 md:grid-cols-2">
              {sicapda.features.map((f, i) => (
                <li key={f.path} className="border-t border-ink/15 py-7">
                  <Reveal delay={(i % 2) * 0.06} className="grid grid-cols-[2.5rem_1fr] gap-x-3">
                    <span className="eyebrow pt-1.5 tabular text-muted">{pad2(i + 1)}</span>
                    <div>
                      <h3 className="text-[1.35rem] leading-tight font-bold tracking-[-0.02em] [font-stretch:110%]">{t(f.title)}</h3>
                      <p className="mt-2 leading-relaxed text-pretty text-muted">{t(f.text)}</p>
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
            <SectionHead index="04" label={t(c.screensLabel)} tone="dark" aside={`${sicapda.screens.length} ${t(c.captures)}`} />
            <Reveal className="mt-12">
              <ScreenGallery screens={sicapda.screens} />
            </Reveal>
            <p className="eyebrow mt-8 max-w-3xl leading-relaxed normal-case tracking-normal text-muted-dark">
              {t(sicapda.screenshotNote)}
            </p>
          </div>
        </section>

        {/* Aplicativo */}
        <section id="aplicativo" data-theme="dark" className="border-t border-paper/10 bg-ink-2 py-24 text-paper sm:py-32">
          <div className="shell">
            <SectionHead index="05" label={t(c.appLabel)} tone="dark" aside={t(c.appAside)} />
            <div className="grid-12 mt-12 gap-y-8">
              <RevealLines
                key={lang}
                className="display col-span-12 text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[0.92] lg:col-span-8"
                lines={t(c.appTitle)}
              />
              <Reveal className="col-span-12 self-end lg:col-span-4 lg:col-start-9">
                <p className="leading-relaxed text-pretty text-paper/80">
                  {t(c.appText)}
                </p>
                <TextLink href={sicapda.links.app} className="eyebrow mt-5 text-sica">
                  {t(c.appCode)}
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
            <SectionHead index="06" label={t(c.engineeringLabel)} aside={t(c.engineeringAside)} />
            <ol className="mt-12 grid gap-px border border-ink/15 bg-ink/15 sm:mt-16 md:grid-cols-2">
              {sicapda.engineering.map((e, i) => (
                <li key={e.title.pt} className="bg-paper p-6 sm:p-8">
                  <Reveal delay={(i % 2) * 0.06}>
                    <p className="eyebrow tabular text-signal-ink">{pad2(i + 1)}</p>
                    <h3 className="mt-3 text-[1.5rem] leading-tight font-bold tracking-[-0.025em] [font-stretch:115%]">{t(e.title)}</h3>
                    <p className="mt-3 leading-relaxed text-pretty text-muted">{t(e.text)}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Equipe e tecnologias */}
        <section id="equipe" className="grain relative bg-paper-2 py-24 text-ink sm:py-32">
          <div className="shell relative">
            <SectionHead index="07" label={t(c.teamLabel)} aside="FLUXE" />
            <div className="grid-12 mt-12 gap-y-14 sm:mt-16">
              <div className="col-span-12 lg:col-span-6">
                <h2 className="display text-[clamp(2.25rem,5vw,4rem)]">{t(c.teamTitle)}</h2>
                <ul className="mt-8 border-b border-ink/15">
                  {sicapda.team.map((m) => (
                    <li key={m.name} className="flex items-baseline justify-between gap-4 border-t border-ink/15 py-3.5">
                      <span className="text-[1.1rem] font-semibold">
                        {m.name}
                        {m.me && <span className="eyebrow ml-2 bg-signal px-1.5 py-0.5 text-carbon">{t(c.me)}</span>}
                      </span>
                      <span className="text-right text-[0.95rem] text-muted">{t(m.role)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-12 lg:col-span-5 lg:col-start-8">
                <h2 className="display text-[clamp(2.25rem,5vw,4rem)]">Stack</h2>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {sicapda.tech.map((tech) => (
                    <li key={tech} className="border border-ink px-3 py-2 font-semibold">
                      {tech}
                    </li>
                  ))}
                </ul>
                <p className="eyebrow mt-6 text-muted">{t(c.alsoInProject)}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {sicapda.techExtra.map((extra) => (
                    <li key={t(extra)} className="border border-ink/25 px-3 py-1.5 text-[0.92rem]">
                      {t(extra)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-20 flex flex-col gap-6 border-t border-ink pt-8 sm:flex-row sm:items-center sm:justify-between">
              <a href={HOME} className="group inline-flex min-h-12 items-center gap-3 text-[1.25rem] font-bold tracking-[-0.02em]">
                <ArrowLeft aria-hidden size={22} className="transition-transform duration-300 group-hover:-translate-x-1" />
                {t(c.back)}
              </a>
              <a
                href={sicapda.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center gap-3 font-semibold"
              >
                <BrandIcon name="github" size={18} />
                <span className="link-underline">rianzitos/SystemFluxe</span>
                <span className="sr-only">{t(ui.common.newTab)}</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter topHref="#topo" />
    </>
  )
}
