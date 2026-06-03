import { NavLink } from 'react-router-dom'
import { SpeechToggle } from '@/components/layout/SpeechToggle'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
    isActive
      ? 'bg-white/10 text-white'
      : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'
  }`

export function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface-elevated p-4">
      <div className="mb-8 px-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-preparing">
          APETIFLOW
        </p>
        <h1 className="text-xl font-black text-white">Cozinha</h1>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        <NavLink to="/" end className={navLinkClass}>
          <span aria-hidden>🍳</span>
          Painel Admin
        </NavLink>
        <NavLink to="/tv" className={navLinkClass}>
          <span aria-hidden>📺</span>
          TV Motoboys
        </NavLink>
      </nav>

      <div className="mb-3">
        <SpeechToggle />
      </div>

      <p className="mt-auto px-2 text-xs text-zinc-600">
        v1.0 — Tempo real
      </p>
    </aside>
  )
}
