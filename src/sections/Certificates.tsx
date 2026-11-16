import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText, ShieldCheck } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CloseButton, Dialog } from '../components/ui/Dialog'
import { Reveal } from '../components/ui/Reveal'
import { SectionHead } from '../components/ui/SectionHead'
import {
  certificateAreas,
  certificateFiles,
  certificates,
  verifyUrl,
  type Certificate,
  type CertificateArea,
} from '../content/certificates'
import { sectionNumber } from '../content/navigation'
import { cn } from '../lib/cn'
import { formatDate, formatMonthYear, pad2 } from '../lib/format'

const areaStyle: Record<CertificateArea, { bar: string; dot: string }> = {
  Tecnologia: { bar: 'bg-signal', dot: 'bg-signal' },
  'Gestão e negócios': { bar: 'bg-ink', dot: 'bg-ink group-hover:bg-paper group-focus-visible:bg-paper' },
  Sustentabilidade: { bar: 'bg-muted', dot: 'bg-muted group-hover:bg-muted-dark group-focus-visible:bg-muted-dark' },
  'Segurança do trabalho': {
    bar: 'bg-[repeating-linear-gradient(135deg,var(--color-ink)_0_1.5px,transparent_1.5px_5px)]',
    dot: 'border border-ink bg-[repeating-linear-gradient(135deg,var(--color-ink)_0_1px,transparent_1px_3px)] group-hover:border-paper group-hover:bg-paper group-focus-visible:border-paper group-focus-visible:bg-paper',
  },
}

/** Mais recentes primeiro. */
const sorted = [...certificates].sort((a, b) => b.end.localeCompare(a.end) || a.title.localeCompare(b.title))
const totalHours = certificates.reduce((sum, c) => sum + c.hours, 0)
const firstStart = certificates.map((c) => c.start).sort()[0]
const lastEnd = certificates.map((c) => c.end).sort().at(-1) ?? firstStart

const byArea = certificateAreas
  .map((area) => {
    const items = certificates.filter((c) => c.area === area)
    return { area, count: items.length, hours: items.reduce((s, c) => s + c.hours, 0) }
  })
  .filter((a) => a.count > 0)

export function Certificates() {
  const [filter, setFilter] = useState<CertificateArea | 'Todos'>('Todos')
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const list = useMemo(() => (filter === 'Todos' ? sorted : sorted.filter((c) => c.area === filter)), [filter])

  const close = useCallback(() => setOpenSlug(null), [])

  return (
    <section id="cursos" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHead index={sectionNumber('cursos')} label="Cursos e certificados" aside="SENAI-SP · Educação a distância" />

        <div className="grid-12 mt-12 gap-y-10 sm:mt-16">
          <Reveal className="col-span-12 lg:col-span-8">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              <Stat value={String(certificates.length)} label="cursos concluídos" />
              <Stat value={String(totalHours)} unit="h" label="de carga horária" />
              <Stat value={String(byArea.length)} label="áreas de estudo" className="col-span-2 sm:col-span-1" />
            </dl>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-[1.05rem] leading-relaxed text-pretty">
              Cursos livres a distância do SENAI-SP, feitos entre {formatMonthYear(firstStart)} e {formatMonthYear(lastEnd)}. Cada
              certificado pode ser aberto em PDF e conferido no site do SENAI pelo código de autenticação.
            </p>
          </Reveal>
        </div>

        {/* Horas por área */}
        <Reveal className="mt-14">
          <p className="eyebrow mb-3 text-muted">Horas por área</p>
          <div className="flex h-3 w-full gap-[3px]" role="img" aria-label={byArea.map((a) => `${a.area}: ${a.hours} horas`).join(', ')}>
            {byArea.map((a) => (
              <span
                key={a.area}
                className={cn('h-full transition-opacity duration-300', areaStyle[a.area].bar, filter !== 'Todos' && filter !== a.area && 'opacity-25')}
                style={{ width: `${(a.hours / totalHours) * 100}%` }}
              />
            ))}
          </div>
        </Reveal>

        {/* Filtros */}
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar por área">
          {(['Todos', ...byArea.map((a) => a.area)] as const).map((area) => {
            const info = byArea.find((a) => a.area === area)
            const count = info ? info.count : certificates.length
            const active = filter === area
            return (
              <button
                key={area}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(area)}
                className={cn(
                  'inline-flex min-h-11 items-center gap-2.5 border px-3.5 text-[0.92rem] font-medium transition-colors',
                  active ? 'border-ink bg-ink text-paper' : 'border-ink/20 hover:border-ink',
                )}
              >
                {info && <span aria-hidden className={cn('size-2', areaStyle[info.area].dot)} />}
                {area}
                <span className={cn('eyebrow tabular', active ? 'text-paper/60' : 'text-muted')}>
                  {info ? `${info.hours} h` : `${count}`}
                </span>
              </button>
            )
          })}
        </div>

        <CertificateList list={list} onOpen={setOpenSlug} />

        <p className="eyebrow mt-8 max-w-3xl leading-relaxed normal-case tracking-normal text-muted">
          Nas versões publicadas aqui, o número do documento de identidade foi coberto. Os certificados originais podem ser
          conferidos no site do SENAI-SP pelo código de autenticação de cada um.
        </p>
      </div>

      <CertificateViewer list={list} slug={openSlug} onNavigate={setOpenSlug} onClose={close} />
    </section>
  )
}

function Stat({ value, unit, label, className }: { value: string; unit?: string; label: string; className?: string }) {
  return (
    <div className={cn('border-t border-ink pt-3', className)}>
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="display tabular block text-[clamp(3.25rem,7vw,6.5rem)] leading-[0.85]">
          {value}
          {unit && <span className="ml-1 align-top text-[0.42em] text-signal">{unit}</span>}
        </span>
        <span aria-hidden className="eyebrow mt-3 block text-muted">
          {label}
        </span>
      </dd>
    </div>
  )
}

function CertificateList({ list, onOpen }: { list: Certificate[]; onOpen: (slug: string) => void }) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState<string | null>(null)
  const [canHover, setCanHover] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sy = useSpring(y, { stiffness: 320, damping: 32, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const preview = hovered ? certificateFiles(hovered).thumb : null
  const showPreview = canHover && !reduce

  return (
    <div
      className="relative mt-8"
      onPointerMove={(e) => {
        // A prévia fica numa coluna fixa (entre o título e a área) e só acompanha o cursor na vertical,
        // para não cobrir os nomes dos cursos.
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(rect.left + rect.width * 0.455)
        y.set(e.clientY)
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <div className="eyebrow hidden grid-cols-[3rem_1fr_12rem_5rem_7rem_2.75rem] gap-4 border-b border-ink pb-3 text-muted lg:grid">
        <span>Nº</span>
        <span>Curso</span>
        <span>Área</span>
        <span className="text-right">Carga</span>
        <span className="text-right">Conclusão</span>
        <span />
      </div>
      <ol>
        {list.map((c, i) => (
          <motion.li
            key={c.slug}
            layout={!reduce}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="border-b border-ink/15"
          >
            <button
              type="button"
              onClick={() => onOpen(c.slug)}
              onPointerEnter={() => setHovered(c.slug)}
              onFocus={() => setHovered(null)}
              className="group grid w-full grid-cols-[2.25rem_1fr_2.75rem] items-center gap-x-4 gap-y-1 py-4 text-left transition-colors duration-200 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper lg:grid-cols-[3rem_1fr_12rem_5rem_7rem_2.75rem] lg:py-5"
            >
              <span className="eyebrow self-start pt-1 pl-1 tabular text-muted group-hover:text-muted-dark group-focus-visible:text-muted-dark lg:self-center lg:pt-0">
                {pad2(i + 1)}
              </span>
              <span className="min-w-0">
                <span className="block text-[1.05rem] leading-snug font-semibold tracking-[-0.01em] text-pretty lg:text-[1.15rem]">
                  {c.title}
                </span>
                <span className="eyebrow mt-1.5 flex flex-wrap gap-x-3 text-[0.68rem] text-muted group-hover:text-muted-dark group-focus-visible:text-muted-dark lg:hidden">
                  <span>{c.area}</span>
                  <span>{c.hours} h</span>
                  <span>{formatMonthYear(c.end)}</span>
                </span>
              </span>
              <span className="hidden items-center gap-2 text-[0.92rem] lg:flex">
                <span aria-hidden className={cn('size-2', areaStyle[c.area].dot)} />
                {c.area}
              </span>
              <span className="hidden text-right font-mono text-[0.92rem] tabular lg:block">{c.hours} h</span>
              <span className="hidden text-right font-mono text-[0.92rem] tabular lg:block">{formatMonthYear(c.end)}</span>
              <span className="flex justify-end pr-1">
                <ArrowUpRight
                  aria-hidden
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only">Ver certificado</span>
              </span>
            </button>
          </motion.li>
        ))}
      </ol>

      {showPreview && (
        <AnimatePresence>
          {preview && (
            <motion.div
              key="preview"
              aria-hidden
              className="pointer-events-none fixed top-0 left-0 z-30 w-48 border border-ink/20 bg-paper shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)]"
              style={{ x, y: sy, translateY: '-50%' }}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={preview} alt="" className="aspect-[1240/1754] w-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

function CertificateViewer({
  list,
  slug,
  onNavigate,
  onClose,
}: {
  list: Certificate[]
  slug: string | null
  onNavigate: (slug: string) => void
  onClose: () => void
}) {
  const index = slug ? list.findIndex((c) => c.slug === slug) : -1
  const cert = index >= 0 ? list[index] : null
  const files = cert ? certificateFiles(cert.slug) : null

  const go = (dir: 1 | -1) => {
    if (index < 0) return
    onNavigate(list[(index + dir + list.length) % list.length].slug)
  }

  return (
    <Dialog
      open={Boolean(cert)}
      onClose={onClose}
      label={cert ? `Certificado: ${cert.title}` : 'Certificado'}
      className="w-[min(96vw,72rem)]"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
    >
      {cert && files && (
        <div className="grid max-h-[92dvh] overflow-y-auto border border-paper/15 bg-ink md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:overflow-hidden">
          <div className="relative flex items-center justify-center bg-ink-2 p-4 sm:p-6 md:max-h-[92dvh]">
            {files.image ? (
              <img
                key={cert.slug}
                src={files.image}
                alt={`Certificado do curso ${cert.title}, emitido pelo ${cert.institution}`}
                className="max-h-[60dvh] w-auto max-w-full bg-white object-contain shadow-[0_20px_50px_-20px_rgb(0_0_0/0.7)] md:max-h-[84dvh]"
              />
            ) : (
              <p className="eyebrow py-20 text-muted-dark">Imagem não disponível. Abra o PDF.</p>
            )}
          </div>

          <div className="flex flex-col p-6 sm:p-8 md:overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow pt-3 text-muted-dark tabular">
                Certificado {pad2(index + 1)} de {pad2(list.length)}
              </p>
              <CloseButton onClick={onClose} />
            </div>
            <h3 className="mt-4 text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance [font-stretch:115%]">
              {cert.title}
            </h3>

            <dl className="mt-6 border-b border-paper/15 text-[0.95rem]">
              {[
                ['Instituição', cert.institution],
                ['Unidade', cert.unit],
                ['Modalidade', cert.modality],
                ['Carga horária', `${cert.hours} horas`],
                ['Período', `${formatDate(cert.start)} a ${formatDate(cert.end)}`],
                ['Área', cert.area],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-paper/15 py-2.5">
                  <dt className="eyebrow pt-[0.2em] text-muted-dark">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <p className="eyebrow mt-6 text-muted-dark">Conteúdo</p>
            <ul className="mt-2 space-y-1.5 text-[0.95rem] text-paper/85">
              {cert.topics.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6em] size-1 shrink-0 bg-signal" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {files.pdf && (
                <a
                  href={files.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2.5 bg-signal px-4 font-semibold text-ink transition-colors hover:bg-paper"
                >
                  <FileText aria-hidden size={17} /> Abrir PDF
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              )}
              {cert.verifyCode && (
                <a
                  href={verifyUrl(cert.verifyCode)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2.5 border border-paper/25 px-4 font-semibold transition-colors hover:bg-paper hover:text-ink"
                >
                  <ShieldCheck aria-hidden size={17} /> Verificar no SENAI
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              )}
            </div>
            {cert.verifyCode && <p className="eyebrow mt-3 text-[0.65rem] text-muted-dark">Código {cert.verifyCode}</p>}

            <div className="mt-auto flex items-center justify-between gap-4 pt-8">
              <button
                type="button"
                onClick={() => go(-1)}
                className="eyebrow inline-flex min-h-11 items-center gap-2 text-muted-dark transition-colors hover:text-paper"
              >
                <ArrowLeft aria-hidden size={15} /> Anterior
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="eyebrow inline-flex min-h-11 items-center gap-2 text-muted-dark transition-colors hover:text-paper"
              >
                Próximo <ArrowRight aria-hidden size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
}
