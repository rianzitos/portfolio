import { BrandIcon, brandHex } from '../components/ui/BrandIcon'
import { Reveal } from '../components/ui/Reveal'
import { SectionHead } from '../components/ui/SectionHead'
import { sectionNumber } from '../content/navigation'
import { skillGroups } from '../content/skills'
import { cn } from '../lib/cn'
import { ui } from '../content/ui'
import { useT } from '../i18n'

export function Stack() {
  const t = useT()
  return (
    <section id="stack" className="grain relative bg-paper-2 py-24 sm:py-32">
      <div className="shell relative">
        <SectionHead index={sectionNumber('stack')} label="Stack" aside={t(ui.stack.aside)} />

        <div className="grid-12 mt-12 gap-y-6 sm:mt-16">
          <h2 className="display col-span-12 text-[clamp(2.5rem,6vw,5rem)] lg:col-span-7">{t(ui.stack.title)}</h2>
          <ul className="eyebrow col-span-12 flex flex-wrap items-end gap-x-6 gap-y-2 text-muted lg:col-span-5 lg:justify-end">
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-2.5 bg-ink" /> {t(ui.stack.inUse)}
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-2.5 border border-ink" /> {t(ui.stack.learning)}
            </li>
          </ul>
        </div>

        <div className="mt-14 border-b border-ink">
          {skillGroups.map((group) => (
            <Reveal key={group.id} className="grid-12 gap-y-4 border-t border-ink py-8">
              <div className="col-span-12 lg:col-span-3">
                <h3 className="text-xl font-bold tracking-[-0.02em] [font-stretch:115%]">{t(group.title)}</h3>
                <p className="mt-1 max-w-xs text-[0.92rem] text-muted">{t(group.description)}</p>
              </div>
              <ul className="col-span-12 lg:col-span-9">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border-t border-ink/15 py-3 sm:grid-cols-[minmax(0,15rem)_9rem_1fr]"
                    style={{ ['--brand' as string]: brandHex(skill.icon) }}
                  >
                    <span className="flex items-center gap-3 font-semibold">
                      <span className="flex size-9 items-center justify-center border border-ink/15 bg-bone text-carbon transition-colors duration-300 group-hover:text-[var(--brand)]">
                        <BrandIcon name={skill.icon} size={18} />
                      </span>
                      {skill.name}
                    </span>
                    <span className="eyebrow flex items-center gap-2 text-[0.68rem] text-muted">
                      <span
                        aria-hidden
                        className={cn('size-2.5', skill.status === 'uso' ? 'bg-ink' : 'border border-ink')}
                      />
                      {t(skill.status === 'uso' ? ui.stack.inUse : ui.stack.learning)}
                    </span>
                    <span className="col-span-2 text-[0.92rem] text-muted sm:col-span-1">
                      <span className="sr-only">{t(ui.stack.usedInSr)}</span>
                      {skill.usedIn.map((u) => t(u)).join(' · ')}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
