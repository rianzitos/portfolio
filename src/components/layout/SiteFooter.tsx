import { ArrowUp } from 'lucide-react'
import { profile } from '../../content/profile'
import { ui } from '../../content/ui'
import { useT } from '../../i18n'
import { useLocalTime } from '../../lib/useLocalTime'
import { TextLink } from '../ui/ButtonLink'
import { useRef } from 'react'
import { useScrub } from '../../lib/useScrub'

export function SiteFooter({ topHref = '#topo' }: { topHref?: string }) {
  const t = useT()
  const time = useLocalTime(profile.location.timeZone)
  const year = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)
  useScrub(nameRef, { from: { yPercent: 55 }, to: { yPercent: 0 }, trigger: footerRef, start: 'top bottom', end: 'bottom bottom' })

  return (
    <footer ref={footerRef} data-theme="dark" className="relative overflow-hidden bg-ink text-paper">
      <div className="shell">
        <div className="grid-12 gap-y-8 border-t border-paper/15 py-10">
          <div className="eyebrow col-span-12 text-muted-dark sm:col-span-6 lg:col-span-4">
            <p className="text-paper">
              © {year} {profile.name}
            </p>
            <p className="mt-2">{t(ui.footer.madeWith)}</p>
          </div>
          <div className="eyebrow col-span-6 text-muted-dark lg:col-span-3">
            <p>
              {profile.location.city}, {profile.location.state}
            </p>
            <p className="mt-2 tabular text-paper">{time} BRT</p>
          </div>
          <ul className="eyebrow col-span-6 flex flex-col gap-2 sm:col-span-6 lg:col-span-3">
            <li>
              <TextLink href={profile.links.github.url}>GitHub</TextLink>
            </li>
            <li>
              <TextLink href={profile.links.linkedin.url}>LinkedIn</TextLink>
            </li>
            {profile.email && (
              <li>
                <a href={`mailto:${profile.email}`} className="link-underline">
                  {t(ui.common.email)}
                </a>
              </li>
            )}
          </ul>
          <div className="col-span-12 flex sm:col-span-6 lg:col-span-2 lg:justify-end">
            <a href={topHref} className="eyebrow group inline-flex min-h-11 items-center gap-2 self-start">
              {t(ui.common.backToTop)}
              <ArrowUp aria-hidden size={14} className="transition-transform duration-300 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
      <div aria-hidden className="shell select-none [container-type:inline-size]">
        <p ref={nameRef} className="display -mb-[0.18em] whitespace-nowrap text-[12.6cqw] text-paper/[0.07]">
          {profile.name}
          <span className="text-signal/60">.</span>
        </p>
      </div>
    </footer>
  )
}
