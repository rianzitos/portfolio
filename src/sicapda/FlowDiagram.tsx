import { Cpu, Database, LineChart, MonitorSmartphone, Nfc, Server } from 'lucide-react'
import { sicapda } from '../content/sicapda'
import { cn } from '../lib/cn'
import { pad2 } from '../lib/format'
import { Reveal } from '../components/ui/Reveal'

const icons = {
  rfid: Nfc,
  esp32: Cpu,
  api: Server,
  db: Database,
  previsao: LineChart,
  painel: MonitorSmartphone,
} as const

/**
 * Do cartão ao painel, em seis passos. Um "pacote" amarelo percorre a linha
 * (só em telas grandes e sem "reduzir movimento").
 */
export function FlowDiagram({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const steps = sicapda.flow
  const dark = tone === 'dark'
  return (
    <div className="relative">
      {/* Linha e pacote (desktop) */}
      <div aria-hidden className="absolute top-[1.375rem] right-[8%] left-[8%] hidden [container-type:inline-size] lg:block">
        <div className={cn('h-px w-full', dark ? 'bg-paper/25' : 'bg-ink/25')} />
        <span
          className="absolute -top-[3px] left-0 block size-[7px] bg-sica motion-reduce:hidden"
          style={{ animation: 'travel 6s cubic-bezier(0.65,0,0.35,1) infinite', ['--travel' as string]: '100cqw' }}
        />
      </div>

      <ol className="relative grid gap-0 lg:grid-cols-6 lg:gap-4">
        {steps.map((step, i) => {
          const Icon = icons[step.id as keyof typeof icons]
          return (
            <li key={step.id} className="relative pb-8 last:pb-0 lg:pb-0">
              {/* Linha vertical (mobile) */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className={cn('absolute top-11 bottom-0 left-[1.375rem] w-px lg:hidden', dark ? 'bg-paper/20' : 'bg-ink/20')}
                />
              )}
              <Reveal delay={i * 0.07} className="flex gap-5 lg:block">
                <span
                  className={cn(
                    'relative z-10 flex size-11 shrink-0 items-center justify-center border lg:mx-auto',
                    dark ? 'border-paper/30 bg-ink text-paper' : 'border-ink bg-paper text-ink',
                    i === steps.length - 1 && 'border-sica bg-sica text-ink',
                  )}
                >
                  <Icon aria-hidden size={19} strokeWidth={1.6} />
                </span>
                <div className="lg:mt-5 lg:text-center">
                  <p className={cn('eyebrow tabular', dark ? 'text-muted-dark' : 'text-muted')}>{pad2(i + 1)}</p>
                  <h4 className="mt-1 text-[1.08rem] font-bold tracking-[-0.01em]">{step.title}</h4>
                  <p className={cn('mt-1.5 text-[0.92rem] leading-snug text-pretty', dark ? 'text-paper/75' : 'text-muted')}>
                    {step.text}
                  </p>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
