import Landing from './pages/Landing'
import Pay from './pages/Pay'
import { Logo } from './components/ui'

// Router нест: /pay ҳамчун ҳолати алоҳида, ҳама чизи дигар — як саҳифаи scroll.
export default function App() {
  if (window.location.pathname.replace(/\/+$/, '') === '/pay') return <Pay />
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-bg/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" aria-label="Интизоми Мақсаднок"><Logo /></a>
          <nav className="flex items-center gap-5 text-sm sm:text-base">
            <a href="#pricing" className="text-white/70 hover:text-white">Нархҳо</a>
            <a href="#download" className="text-white/70 hover:text-white">Зеркашӣ</a>
          </nav>
        </div>
      </header>
      <Landing />
    </>
  )
}
