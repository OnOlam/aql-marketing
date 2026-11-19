import { useEffect, useState } from 'react'

const cfg = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
}

/** Охирин 30 рӯзи analytics_daily/{YYYY-MM-DD}: майдони `active`-ро ҷамъ мекунад. Калид набошад → null. */
export async function getActiveUsers30Days(): Promise<number | null> {
  if (!cfg.apiKey || !cfg.projectId) return null
  const [{ initializeApp }, fs] = await Promise.all([import('firebase/app'), import('firebase/firestore')])
  const app = initializeApp(cfg)

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
  if (siteKey) {
    const ac = await import('firebase/app-check')
    ac.initializeAppCheck(app, { provider: new ac.ReCaptchaEnterpriseProvider(siteKey), isTokenAutoRefreshEnabled: true })
  }

  const db = fs.getFirestore(app)
  const days = [...Array(30)].map((_, i) => {
    const x = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4)
    x.setDate(x.getDate() - 29 + i)
    return x.toISOString().slice(0, 10)
  })
  const snaps = await Promise.all(days.map((d) => fs.getDoc(fs.doc(db, 'analytics_daily', d))))
  return snaps.reduce((sum, s) => sum + (s.exists() ? Number(s.data().active) || 0 : 0), 0)
}

export function useActiveUsers() {
  const [value, setValue] = useState<number | null>(null)
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading')
  useEffect(() => {
    let alive = true
    getActiveUsers30Days()
      .then((v) => { if (!alive) return; setValue(v); setState(v === null ? 'error' : 'ok') })
      .catch(() => { if (alive) setState('error') })
    return () => { alive = false }
  }, [])
  return { value, state }
}
