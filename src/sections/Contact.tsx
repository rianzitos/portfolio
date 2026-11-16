import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { useState } from 'react'
import { BrandIcon } from '../components/ui/BrandIcon'
import { RevealLines, Reveal } from '../components/ui/Reveal'
import { SectionHead } from '../components/ui/SectionHead'
import { sectionNumber } from '../content/navigation'
import { profile } from '../content/profile'

export function Contact() {
  const { links, email } = profile
  return (
    <section id="contato" data-theme="dark" className="relative bg-ink pt-24 pb-16 text-paper sm:pt-32">
      <div className="shell">
        <SectionHead index={sectionNumber('contato')} label="Contato" tone="dark" aside={profile.availability} />

        <div className="grid-12 mt-12 gap-y-10 sm:mt-16">
          <div className="col-span-12 lg:col-span-8">
            <RevealLines
              className="display text-[clamp(3rem,8vw,8rem)] leading-[0.86]"
              lines={['Vamos', <>conversar<span className="text-signal">?</span></>]}
            />
          </div>
          <Reveal className="col-span-12 self-end lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-[1.15rem] leading-relaxed text-pretty text-paper/85">
              Procuro estágio ou uma primeira oportunidade em desenvolvimento. Se você tem uma vaga, um projeto ou quer saber mais
              sobre o SICAPDA, pode me chamar. Respondo pelo LinkedIn{email ? ' ou por e-mail' : ''}.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-b border-paper/15">
          <ContactRow
            href={links.linkedin.url}
            label="LinkedIn"
            value={links.linkedin.handle}
            icon={<BrandIcon name="linkedin" size={22} />}
          />
          <ContactRow href={links.github.url} label="GitHub" value={links.github.handle} icon={<BrandIcon name="github" size={22} />} />
          {email && <EmailRow email={email} />}
        </ul>
      </div>
    </section>
  )
}

function ContactRow({ href, label, value, icon }: { href: string; label: string; value: string; icon: React.ReactNode }) {
  return (
    <li className="border-t border-paper/15">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden py-6 sm:grid-cols-[3rem_auto_1fr_auto] sm:gap-x-8 sm:py-8"
      >
        <span
          aria-hidden
          className="absolute inset-0 origin-left scale-x-0 bg-signal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
        <span className="relative text-paper transition-colors group-hover:text-ink">{icon}</span>
        <span className="relative text-[clamp(1.6rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.035em] transition-colors [font-stretch:125%] group-hover:text-ink">
          {label}
        </span>
        <span className="eyebrow relative hidden text-muted-dark transition-colors group-hover:text-ink sm:block">{value}</span>
        <ArrowUpRight
          aria-hidden
          size={28}
          className="relative transition-[transform,color] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
        />
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    </li>
  )
}

function EmailRow({ email }: { email: string }) {
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
    <li className="grid grid-cols-[1fr_auto] items-center gap-3 border-t border-paper/15">
      <a href={`mailto:${email}`} className="group relative grid grid-cols-[auto_1fr] items-center gap-4 overflow-hidden py-6 sm:grid-cols-[3rem_auto_1fr] sm:gap-x-8 sm:py-8">
        <span
          aria-hidden
          className="absolute inset-0 origin-left scale-x-0 bg-signal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
        <Mail aria-hidden size={22} className="relative transition-colors group-hover:text-ink" />
        <span className="relative text-[clamp(1.6rem,4vw,3rem)] leading-none font-extrabold tracking-[-0.035em] transition-colors [font-stretch:125%] group-hover:text-ink">
          E-mail
        </span>
        <span className="eyebrow relative col-span-2 break-all text-muted-dark normal-case transition-colors group-hover:text-ink sm:col-span-1">
          {email}
        </span>
      </a>
      <button
        type="button"
        onClick={copy}
        className="eyebrow inline-flex min-h-11 items-center gap-2 border border-paper/25 px-3 transition-colors hover:bg-paper hover:text-ink"
      >
        {copied ? <Check aria-hidden size={14} /> : <Copy aria-hidden size={14} />}
        <span aria-live="polite">{copied ? 'Copiado' : 'Copiar'}</span>
      </button>
    </li>
  )
}
