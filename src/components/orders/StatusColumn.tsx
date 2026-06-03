import type { OrderStatus } from '@/types/order'
import type { ReactNode } from 'react'

interface StatusColumnProps {
  title: string
  status: OrderStatus
  count: number
  accentClass: string
  headerGlow: string
  children: ReactNode
}

export function StatusColumn({
  title,
  count,
  accentClass,
  headerGlow,
  children,
}: StatusColumnProps) {
  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <header
        className={`mb-4 flex items-center justify-between rounded-2xl border px-5 py-4 ${accentClass} ${headerGlow}`}
      >
        <h2 className="text-2xl font-black uppercase tracking-widest md:text-3xl">
          {title}
        </h2>
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/30 text-2xl font-black">
          {count}
        </span>
      </header>
      <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
        {children}
      </div>
    </section>
  )
}
