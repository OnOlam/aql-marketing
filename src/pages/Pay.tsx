import { useEffect, useState, type FormEvent } from 'react'
import { Crown, Lock, Copy, Check, ArrowLeft, Shield } from 'lucide-react'
import { Logo } from '../components/ui'

/**
 * НАМОИШӢ (демо): пули ҳақиқӣ гирифта намешавад, маълумоти корта ҳеҷ ҷо фиристода ё нигоҳ дошта намешавад.
 * Майдонҳо бо рақами санҷишӣ пур шудаанд, то касе рақами ҳақиқии худро ворид накунад.
 */
const TOKEN_RE = /^[A-Za-z0-9._-]{16,512}$/
const VERIFY_URL: string = import.meta.env.VITE_TOKEN_VERIFY_URL || ''
const RETURN_URL: string = import.meta.env.VITE_RETURN_URL || ''
const BRANDS = ['Humo', 'UzCard', 'Visa', 'Mastercard']
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

async function verifyToken(token: string): Promise<boolean> {
  if (!TOKEN_RE.test(token)) return false
  if (!VERIFY_URL) return true // сервери санҷиш нест: танҳо формат санҷида мешавад (амният нест)
  try {
    const r = await fetch(VERIFY_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) })
    const d = await r.json()
    return r.ok && d.valid === true
  } catch { return false }
}

function luhn(num: string) {
  let sum = 0
  for (let i = 0; i < num.length; i++) {
    let d = Number(num[num.length - 1 - i])
    if (i % 2) { d *= 2; if (d > 9) d -= 9 }
    sum += d
  }
  return num.length === 16 && sum % 10 === 0
}

function makeCode() {
  const a = new Uint32Array(8)
  crypto.getRandomValues(a)
  const s = Array.from(a, (n) => ALPHABET[n % ALPHABET.length]).join('')
  return `AQL-${s.slice(0, 4)}-${s.slice(4)}`
}

const fmtCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
const fmtExp = (v: string) => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d }

export default function Pay() {
  const [ready, setReady] = useState(false)
  const [brand, setBrand] = useState('Visa')
  const [card, setCard] = useState('4242 4242 4242 4242')
  const [exp, setExp] = useState('12/30')
  const [cvv, setCvv] = useState('123')
  const [name, setName] = useState('TEST USER')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.title = 'Премиум тариф — Интизоми Мақсаднок'
    const m = document.createElement('meta')
    m.name = 'robots'; m.content = 'noindex,nofollow'
    document.head.appendChild(m)

    const token = new URLSearchParams(window.location.search).get('token') || ''
    window.history.replaceState(null, '', '/pay') // токенро аз сатри нишонӣ тоза мекунем
    verifyToken(token).then((ok) => { if (ok) setReady(true); else window.location.replace('/') })
    return () => { m.remove() }
  }, [])

  function submit(e: FormEvent) {
    e.preventDefault()
    const digits = card.replace(/\s/g, '')
    const [mm, yy] = exp.split('/').map(Number)
    const expOk = mm >= 1 && mm <= 12 && yy >= 0 && new Date(2000 + yy, mm, 1) > new Date()
    if (!luhn(digits)) return setErr('Рақами корта нодуруст аст.')
    if (!expOk) return setErr('Муҳлати корта нодуруст аст.')
    if (cvv.length !== 3) return setErr('CVV бояд аз 3 рақам иборат бошад.')
    if (!name.trim()) return setErr('Номи соҳиби кортаро ворид кунед.')
    setErr(''); setBusy(true)
    setTimeout(() => {
      const c = makeCode()
      try { localStorage.setItem('aql_pay_code', JSON.stringify({ code: c, at: Date.now() })) } catch { /* ignore */ }
      setCard(''); setExp(''); setCvv(''); setName('') // маълумоти корта фавран тоза мешавад
      setCode(c); setBusy(false)
    }, 1200)
  }

  async function copy() {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* ignore */ }
  }

  function back() {
    if (RETURN_URL) window.location.href = RETURN_URL
    else if (window.history.length > 1) window.history.back()
    else window.close()
  }

  if (!ready) return <div className="grid min-h-screen place-items-center text-white/60">Санҷида истодааст…</div>

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col px-5 py-8">
      <div className="mb-6 flex justify-center"><Logo /></div>

      <div className="mb-4 rounded-lg px-4 py-3 text-sm" style={{ background: 'rgba(238,106,88,.12)', border: '1px solid rgba(238,106,88,.4)', color: 'var(--coral)' }} role="note">
        Намоишӣ (тест): пули ҳақиқӣ гирифта намешавад ва маълумоти корта нигоҳ дошта намешавад. Рақами корти ҳақиқии худро ворид накунед.
      </div>

      {!code ? (
        <form onSubmit={submit} className="card space-y-5" noValidate>
          <h1 className="flex items-center gap-2 text-2xl"><Crown size={24} style={{ color: 'var(--warm)' }} aria-hidden="true" />Премиум тариф — 29 сомонӣ</h1>

          <fieldset>
            <legend className="mb-2 text-sm" style={{ color: 'var(--text-muted)' }}>Навъи корта</legend>
            <div className="grid grid-cols-2 gap-2">
              {BRANDS.map((b) => (
                <button type="button" key={b} aria-pressed={brand === b} onClick={() => setBrand(b)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold"
                  style={{ border: `1px solid ${brand === b ? 'var(--warm)' : 'var(--border)'}`, background: brand === b ? 'rgba(242,184,75,.12)' : 'var(--card)' }}>{b}</button>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-1 block text-sm" style={{ color: 'var(--text-muted)' }}>Рақами корта</span>
            <input className="field" inputMode="numeric" autoComplete="off" placeholder="**** **** **** ****" value={card} onChange={(e) => setCard(fmtCard(e.target.value))} />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1 block text-sm" style={{ color: 'var(--text-muted)' }}>Муддат</span>
              <input className="field" inputMode="numeric" autoComplete="off" placeholder="MM/YY" value={exp} onChange={(e) => setExp(fmtExp(e.target.value))} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm" style={{ color: 'var(--text-muted)' }}>CVV</span>
              <input className="field" inputMode="numeric" autoComplete="off" type="password" placeholder="***" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-sm" style={{ color: 'var(--text-muted)' }}>Номи соҳиби корта</span>
            <input className="field" autoComplete="off" placeholder="KARTA SOHIBI" value={name} onChange={(e) => setName(e.target.value.toUpperCase())} />
          </label>

          <div className="flex items-center justify-between rounded-lg px-4 py-3" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Сумма</span>
            <strong className="font-serif text-xl">29 сомонӣ</strong>
          </div>

          <p role="alert" className="min-h-[1.25rem] text-sm" style={{ color: 'var(--coral)' }}>{err}</p>
          <button type="submit" disabled={busy} className="btn btn-warm w-full"><Lock size={24} aria-hidden="true" />{busy ? 'Коркард…' : 'Пардохт кардан'}</button>
        </form>
      ) : (
        <div className="card space-y-5 text-center">
          <Shield size={32} className="mx-auto" style={{ color: 'var(--teal)' }} aria-hidden="true" />
          <h1 className="text-2xl">Коди шумо</h1>
          <div className="rounded-xl px-4 py-5 font-serif text-3xl font-bold tracking-widest sm:text-4xl" style={{ background: 'rgba(242,184,75,.1)', border: '1px dashed var(--warm)', color: 'var(--warm)' }}>{code}</div>
          <button onClick={copy} className="btn btn-ghost">{copied ? <Check size={24} aria-hidden="true" /> : <Copy size={24} aria-hidden="true" />}{copied ? 'Нусха шуд' : 'Нусха кардан'}</button>
          <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Ин кодро дар барномаи бахши «Тарифҳо» ворид кунед. Шумо 24 соат Премиум истифода мебаред. Баъд аз тасдиқи бонк, 1 моҳ Премиум фаъол мешавад.
          </p>
          <p className="text-xs" style={{ color: 'var(--coral)' }}>Ин саҳифаи намоишӣ аст: код ҳоло дар барнома тасдиқ намешавад.</p>
          <button onClick={back} className="btn btn-warm w-full"><ArrowLeft size={24} aria-hidden="true" />Барнома баргаштан</button>
        </div>
      )}
    </div>
  )
}
