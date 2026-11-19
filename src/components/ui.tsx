import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Scroll'da: opacity 0→1, translateY(20px→0), 0.6s ease-out, stagger index*60ms */
export function Reveal({ children, index = 0, className = '' }: { children: ReactNode; index?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: on ? 1 : 0, transform: on ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity .6s ease-out, transform .6s ease-out', transitionDelay: `${index * 60}ms` }}
    >
      {children}
    </div>
  )
}

export const Divider = () => <div className="divider" aria-hidden="true">◆◆◆◆◆</div>

export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3l11 13-11 13L5 16z" fill="#f2b84b" />
        <path d="M16 10l5.5 6-5.5 6-5.5-6z" fill="#0a1628" />
      </svg>
      <span className="font-serif text-lg font-bold">Интизоми Мақсаднок</span>
    </span>
  )
}

export function Section({ id, title, lead, children }: { id: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <Reveal className="mb-8 max-w-2xl">
        <h2 className="font-serif text-3xl font-bold sm:text-4xl">{title}</h2>
        {lead && <p className="mt-3 text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>{lead}</p>}
      </Reveal>
      {children}
    </section>
  )
}

/** Телефон макети — тамом CSS/JSX, расм нест */
export function PhoneMock() {
  const tasks = [
    { t: 'Мутолиаи 30 дақиқа', done: true },
    { t: 'Такрори калимаҳо', done: true },
    { t: 'Варзиш', done: true },
    { t: 'Нақшаи ҳафта', done: false },
    { t: 'Нӯшидани об', done: false },
  ]
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-[260px] rounded-[2.5rem] border border-white/15 p-3"
      style={{ background: '#0d1d36', boxShadow: '0 30px 80px rgba(0,0,0,.5), 0 0 80px rgba(242,184,75,.12)' }}
    >
      <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-black/60" />
      <div className="rounded-[1.8rem] p-4" style={{ background: 'var(--bg)' }}>
        <p className="font-serif text-lg font-bold">Имрӯз</p>
        <p className="mt-1 text-xs text-white/60">3 аз 5 вазифа иҷро шуд</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-3/5 rounded-full bg-warm" /></div>
        <ul className="mt-4 space-y-2">
          {tasks.map((x) => (
            <li key={x.t} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${x.done ? 'border-teal bg-teal text-bg' : 'border-white/30'}`}>
                {x.done && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#0a1628" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </span>
              <span className={x.done ? 'text-white/50 line-through' : 'text-white/90'}>{x.t}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-2 text-[10px]">
          <span className="rounded-full px-2 py-1" style={{ background: 'rgba(47,209,168,.15)', color: 'var(--teal)' }}>Об</span>
          <span className="rounded-full px-2 py-1" style={{ background: 'rgba(242,184,75,.15)', color: 'var(--warm)' }}>Хоб</span>
          <span className="rounded-full px-2 py-1" style={{ background: 'rgba(238,106,88,.15)', color: 'var(--coral)' }}>Кайфият</span>
        </div>
      </div>
    </div>
  )
}
