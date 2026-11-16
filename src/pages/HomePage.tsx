import { useInitialHashScroll } from '../lib/useInitialHashScroll'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { sections } from '../content/navigation'
import { About } from '../sections/About'
import { Certificates } from '../sections/Certificates'
import { Contact } from '../sections/Contact'
import { Education } from '../sections/Education'
import { FeaturedSicapda } from '../sections/FeaturedSicapda'
import { Hero } from '../sections/Hero'
import { Projects } from '../sections/Projects'
import { Stack } from '../sections/Stack'

const navItems = sections.map((s) => ({ id: s.id, label: s.label, href: `#${s.id}` }))

export function HomePage() {
  useInitialHashScroll()
  return (
    <>
      <SiteHeader items={navItems} />
      <main id="conteudo">
        <Hero />
        <About />
        <FeaturedSicapda caseStudyHref="./sicapda/" />
        <Projects />
        <Stack />
        <Certificates />
        <Education />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
