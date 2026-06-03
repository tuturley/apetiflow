import { PlatformBadge } from '@/components/ui/PlatformBadge'
import { TimerDisplay } from '@/components/ui/TimerDisplay'
import type { Order } from '@/types/order'

interface OrderCardTVProps {
  order: Order
}

const URGENT_MS = 15 * 60 * 1000

export function OrderCardTV({ order }: OrderCardTVProps) {
  const isUrgent = Date.now() - order.createdAt > URGENT_MS
  const isReady = order.status === 'ready'

  return (
    <article
      className={`animate-slide-up rounded-2xl border border-white/10 bg-surface-card p-5 shadow-xl transition-all duration-300 hover:scale-[1.01] ${
        isReady ? 'animate-ready-pulse border-ready/50' : ''
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Pedido
          </p>
          <p className="text-5xl font-black leading-none text-white">
            #{order.orderNumber}
          </p>
        </div>
        <PlatformBadge platform={order.platform} size="lg" />
      </div>

      <ul className="mb-4 space-y-1.5">
        {order.items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="text-xl font-semibold text-zinc-200 md:text-2xl"
          >
            • {item}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-sm text-zinc-500">Tempo</span>
        <TimerDisplay
          createdAt={order.createdAt}
          variant="tv"
          urgent={isUrgent}
        />
      </div>
    </article>
  )
}
