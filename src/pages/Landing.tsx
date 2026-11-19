import { CheckSquare, BookOpen, Sparkles, Heart, Calendar, Timer, Check, Crown, Zap, Users, Shield, Download, Smartphone, Monitor, Laptop } from 'lucide-react'
import { Reveal, Divider, Section, Logo } from '../components/ui'
import { useActiveUsers } from '../lib/firebase'
import { APK_URL, WIN_URL, MAC_URL, CONTACT_EMAIL } from '../lib/config'

const muted = { color: 'var(--text-muted)' }

const basics = [
  { icon: Users, title: 'Бо забони тоҷикӣ', text: 'Тамоми интерфейс бо алифбои кириллии тоҷикӣ.' },
  { icon: Zap, title: 'Бе интернет низ кор мекунад', text: 'Маълумот аввал дар дастгоҳи шумо нигоҳ дошта мешавад.' },
  { icon: Shield, title: 'Омори беном', text: 'Омори умумӣ бе ном, почта ва рақами телефон ҷамъ мешавад.' },
]

const features = [
  { icon: CheckSquare, color: 'var(--warm)', title: 'Вазифаҳо', text: 'Корҳои рӯзона ва муҳимро бо мӯҳлат ва гурӯҳбандӣ ба тартиб дароред.' },
  { icon: BookOpen, color: 'var(--teal)', title: 'Дониш', text: 'Маълумотро бо такрори фосилавӣ (1, 3, 5, 7, 14, 30 рӯз) мустаҳкам кунед.' },
  { icon: Sparkles, color: 'var(--coral)', title: 'AI Маслиҳатчӣ', text: 'Ёвари ҳушманд, ки ҳисоботи рӯз ва ҳафтаро омода мекунад ва маслиҳат медиҳад.' },
  { icon: Heart, color: 'var(--teal)', title: 'Пайгирҳо', text: 'Нӯшидани об, хоб ва кайфияти худро ҳар рӯз сабт кунед.' },
  { icon: Calendar, color: 'var(--warm)', title: 'Тақвим', text: 'Ҳамаи рӯзҳо ва вазифаҳоро дар намои моҳона якҷо бинед.' },
  { icon: Timer, color: 'var(--coral)', title: 'Таймер', text: 'Усули Помодоро 25/5 ва 50/10 барои тамаркузи амиқ.' },
]

const free = ['Вазифаҳо, Дониш ва Ёддошт', 'Пайгирҳо, Тақвим ва Таймер', 'AI Маслиҳатчӣ бо маҳдудияти рӯзона (5 савол)', 'Кор бе интернет']
const premium = ['Ҳамаи имкониятҳои Ройгон', 'Маҳдудияти баландтар барои ҳар бахш', 'AI Маслиҳатчӣ бо маҳдудияти васеътар (100 савол)', 'Пуштибонии афзалиятнок']

const downloads = [
  { icon: Smartphone, name: 'Android', note: 'APK файл (15 MB)', url: APK_URL },
  { icon: Monitor, name: 'Windows', note: 'Installer (45 MB)', url: WIN_URL },
  { icon: Laptop, name: 'macOS', note: 'DMG файл (50 MB)', url: MAC_URL },
]

const community = [
  { icon: Timer, title: 'Вақти худро', text: 'Барои чизҳои муҳим сарф кунед.' },
  { icon: BookOpen, title: 'Дониши худро', text: 'Ҳар рӯз мустаҳкам кунед.' },
  { icon: Heart, title: 'Саломатии худро', text: 'Назорат кунед.' },
]

/** Телефон рамкаи ҳақиқӣ: экрани барнома /public/app-screen.png-ро нишон медиҳад */
function PhoneFrame() {
  return (
    <div className="phone-float">
      <div className="phone">
        <div className="phone-notch" aria-hidden="true" />
        <div className="phone-screen">
          <img
            src="/app-screen.png"
            alt="Экрани барнома"
            onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
          />
        </div>
      </div>
    </div>
  )
}

export default function Landing() {
  const { value, state } = useActiveUsers()

  return (
    <main id="top">
      {/* 1. Hero */}
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-5 pb-8 pt-12 sm:pt-20 md:flex-row md:items-center md:justify-between">
        <Reveal className="md:flex-1">
          <h1 className="font-serif text-[2.25rem] font-bold leading-tight sm:text-5xl">Интизоми Мақсаднок</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed" style={muted}>
            Мақсадҳоятонро ба одатҳои ҳаррӯза табдил диҳед. Вазифа, дониш ва саломатӣ — дар як ҷой, бо забони модарӣ.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#download" className="btn btn-warm">Зеркашӣ кунед</a>
            <a href="#basics" className="btn btn-ghost">Маълумоти бештар</a>
          </div>
        </Reveal>
        <Reveal index={2} className="shrink-0 self-center"><PhoneFrame /></Reveal>
      </section>

      <Divider />

      {/* 2. 3 asosiy xususiyat */}
      <section id="basics" className="mx-auto max-w-6xl px-5 py-6">
        <div className="grid gap-4 md:grid-cols-3">
          {basics.map((b, i) => (
            <Reveal key={b.title} index={i}>
              <div className="card flex h-full gap-4" style={{ padding: 20 }}>
                <b.icon size={24} className="mt-1 shrink-0" style={{ color: 'var(--warm)' }} aria-hidden="true" />
                <div>
                  <h3 className="text-lg">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={muted}>{b.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* 3. 6 feature */}
      <Section id="features" title="Ҳама чиз барои рӯзи шумо">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} index={i}>
              <article className="card h-full">
                <f.icon size={32} style={{ color: f.color }} aria-hidden="true" />
                <h3 className="mt-4 text-xl">{f.title}</h3>
                <p className="mt-2 leading-relaxed" style={muted}>{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Divider />

      {/* 4. Narxlar */}
      <Section id="pricing" title="Нархҳо">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="card h-full">
              <h3 className="text-2xl">Ройгон</h3>
              <p className="mt-3 font-serif text-5xl font-bold">0 <span className="font-sans text-lg font-normal" style={muted}>сомонӣ/моҳ</span></p>
              <ul className="mt-6 space-y-3">
                {free.map((x) => <li key={x} className="flex gap-3" style={muted}><Check size={24} className="shrink-0" style={{ color: 'var(--teal)' }} aria-hidden="true" />{x}</li>)}
              </ul>
            </div>
          </Reveal>
          <Reveal index={1}>
            <div className="card h-full" style={{ borderColor: 'rgba(242,184,75,.5)' }}>
              <h3 className="flex items-center gap-2 text-2xl" style={{ color: 'var(--warm)' }}><Crown size={24} aria-hidden="true" />Премиум</h3>
              <p className="mt-3 font-serif text-5xl font-bold">29 <span className="font-sans text-lg font-normal" style={muted}>сомонӣ/моҳ</span></p>
              <ul className="mt-6 space-y-3">
                {premium.map((x) => <li key={x} className="flex gap-3" style={muted}><Check size={24} className="shrink-0" style={{ color: 'var(--warm)' }} aria-hidden="true" />{x}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal><p className="mt-6 text-center" style={muted}>Премиум тарифро фаъол кардан барои барномаро зеркашӣ кунед ва дар дохили он бахши «Тарифҳо»-ро кушоед.</p></Reveal>
      </Section>

      <Divider />

      {/* 5. Zerkashi */}
      <Section id="download" title="Зеркашӣ кунед">
        <div className="grid gap-5 md:grid-cols-3">
          {downloads.map((d, i) => (
            <Reveal key={d.name} index={i}>
              <div className="card flex h-full flex-col items-center text-center">
                <d.icon size={32} style={{ color: 'var(--warm)' }} aria-hidden="true" />
                <h3 className="mt-4 text-xl">{d.name}</h3>
                <p className="mb-6 mt-1 text-sm" style={muted}>{d.note}</p>
                {d.url
                  ? <a href={d.url} download className="btn btn-warm mt-auto w-full"><Download size={24} aria-hidden="true" />Зеркашӣ кардан</a>
                  : <button disabled className="btn btn-warm mt-auto w-full"><Download size={24} aria-hidden="true" />Ба зудӣ</button>}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Divider />

      {/* 6. Statistika */}
      <Section id="stats" title="Ҷомеаи мо">
        <Reveal>
          <div className="card flex flex-col items-center gap-2 py-12 text-center">
            <Users size={32} style={{ color: 'var(--teal)' }} aria-hidden="true" />
            <div className="font-serif text-6xl font-bold sm:text-7xl" style={{ color: 'var(--warm)' }} aria-live="polite">
              {state === 'ok' && value !== null ? value.toLocaleString('ru-RU') : '—'}
            </div>
            <p className="text-lg" style={muted}>Истифодабарандагони фаъол (30 рӯз)</p>
          </div>
        </Reveal>
      </Section>

      <Divider />

      {/* 7. Baroi jamoa */}
      <Section id="community" title="Барои ҷомеа">
        <div className="grid gap-5 md:grid-cols-3">
          {community.map((c, i) => (
            <Reveal key={c.title} index={i}>
              <div className="card h-full text-center">
                <c.icon size={32} className="mx-auto" style={{ color: 'var(--warm)' }} aria-hidden="true" />
                <h3 className="mt-4 text-xl">{c.title}</h3>
                <p className="mt-2" style={muted}>{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Divider />

      {/* 8. Footer */}
      <footer className="mx-auto max-w-6xl px-5 pb-12 pt-4">
        <details className="card mb-8">
          <summary className="cursor-pointer font-serif text-lg font-bold">Сиёсати махфият</summary>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed" style={muted}>
            <li>Вазифаҳо, ёддоштҳо ва молияи шумо аввал дар дастгоҳи худатон нигоҳ дошта мешавад.</li>
            <li>Ҳангоми воридшавӣ ба ҳисоб, нусхаи маълумот барои синхронизатсия дар Firebase (Google) нигоҳ дошта мешавад.</li>
            <li>Омори умумӣ беном ҷамъ мешавад: шумораи фаъолон, вазифаҳо ва шаҳр. Ном, почта ва нишондиҳандаи ҳисоб сабт намешавад.</li>
            <li>Ҳангоми истифодаи AI Маслиҳатчӣ матни дархост ва хулосаи зарурӣ ба хидмати Groq фиристода мешавад.</li>
          </ul>
        </details>
        <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row" style={muted}>
          <Logo />
          {CONTACT_EMAIL ? <a className="hover:text-white" href={`mailto:${CONTACT_EMAIL}`}>Тамос: {CONTACT_EMAIL}</a> : <span>Тамос: ба зудӣ</span>}
        </div>
      </footer>
    </main>
  )
}
