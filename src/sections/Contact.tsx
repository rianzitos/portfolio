import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { useState } from 'react'
import { BrandIcon } from '../components/ui/BrandIcon'
import { RevealLines, Reveal } from '../components/ui/Reveal'
import { SectionHead } from '../components/ui/SectionHead'
import { sectionNumber } from '../content/navigation'
import { profile } from '../content/profile'
import { ui } from '../content/ui'
import { useLang, useT } from '../i18n'

const rowBase = 'group relative items-center gap-4 overflow-hidden py-6 sm:gap-x-8 sm:py-8'
const rowFill =
  'absolute inset-0 origin-left scale-x-0 bg-signal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100'
const rowTitle =
  'relative text-[clamp(1.6rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.035em] transition-colors [font-stretch:125%] group-hover:text-carbon group-focus-visible:text-carbon'
const rowValue =
  'eyebrow relative text-muted-dark transition-colors group-hover:text-carbon group-focus-visible:text-carbon'

export function Contact() {
  const { t, lang } = useLang()
  const { links, email } = profile
  const [first, second] = t(ui.contact.title)
  return (
    <section id="contato" data-theme="dark" className="relative bg-ink pt-24 pb-16 text-paper sm:pt-32">
      <div className="shell">
        <SectionHead index={sectionNumber('contato')} label={t(ui.contact.label)} tone="dark" aside={t(profile.availability)} />

        <div className="grid-12 mt-12 gap-y-10 sm:mt-16">
          <div className="col-span-12 lg:col-span-8">
            <RevealLines
              key={lang}
              className="display text-[clamp(2.4rem,12.3vw,3rem)] leading-[0.86] sm:text-[clamp(3rem,8vw,8rem)]"
              lines={[
                first,
                <>
                  {second}
                  <span className="text-signal">?</span>
                </>,
              ]}
            />
          </div>
          <Reveal className="col-span-12 self-end lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-[1.15rem] leading-relaxed text-pretty text-paper/85">
              {t(ui.contact.text)} {t(email ? ui.contact.replyBoth : ui.contact.replyLinkedin)}
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-b border-paper/15">
          {email && <EmailRow email={email} />}
          <ContactRow
            href={links.linkedin.url}
            label="LinkedIn"
            value={links.linkedin.handle}
            icon={<BrandIcon name="linkedin" size={22} />}
          />
          <ContactRow href={links.github.url} label="GitHub" value={links.github.handle} icon={<BrandIcon name="github" size={22} />} />
        </ul>
      </div>
    </section>
  )
}

function ContactRow({ href, label, value, icon }: { href: string; label: string; value: string; icon: React.ReactNode }) {
  const t = useT()
  return (
    <li className="border-t border-paper/15">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${rowBase} grid grid-cols-[auto_1fr_auto] sm:grid-cols-[3rem_auto_1fr_auto]`}
      >
        <span aria-hidden className={rowFill} />
        <span className="relative text-paper transition-colors group-hover:text-carbon group-focus-visible:text-carbon">{icon}</span>
        <span className={rowTitle}>{label}</span>
        <span className={`${rowValue} hidden sm:block`}>{value}</span>
        <ArrowUpRight
          aria-hidden
          size={28}
          className="relative transition-[transform,color] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-carbon group-focus-visible:text-carbon"
        />
        <span className="sr-only">{t(ui.common.newTab)}</span>
      </a>
    </li>
  )
}

function EmailRow({ email }: { email: string }) {
  const t = useT()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }
  return (
    <li className="flex items-center gap-3 border-t border-paper/15">
      <a
        href={`mailto:${email}`}
        className={`${rowBase} grid min-w-0 flex-1 grid-cols-[auto_1fr] sm:grid-cols-[3rem_auto_1fr]`}
      >
        <span aria-hidden className={rowFill} />
        <Mail aria-hidden size={22} className="relative transition-colors group-hover:text-carbon group-focus-visible:text-carbon" />
        <span className={rowTitle}>{t(ui.common.email)}</span>
        <span className={`${rowValue} col-span-2 min-w-0 break-all normal-case tracking-normal sm:col-span-1`}>{email}</span>
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={t(ui.contact.copyAria)}
        className="eyebrow inline-flex min-h-11 shrink-0 items-center gap-2 border border-paper/25 px-3 transition-colors hover:bg-paper hover:text-ink"
      >
        {copied ? <Check aria-hidden size={14} /> : <Copy aria-hidden size={14} />}
        <span aria-live="polite">{copied ? t(ui.contact.copied) : t(ui.contact.copy)}</span>
      </button>
    </li>
  )
}
