import { PlatformBadge } from '@/components/ui/PlatformBadge'
import { TimerDisplay } from '@/components/ui/TimerDisplay'
import type { Order, OrderStatus } from '@/types/order'

interface OrderCardAdminProps {
  order: Order
  onStatusChange: (status: OrderStatus) => void
}

const URGENT_MS = 12 * 60 * 1000

const statusBorder: Record<string, string> = {
  preparing: 'border-l-preparing',
  frying: 'border-l-frying',
  ready: 'border-l-ready',
}

export function OrderCardAdmin({ order, onStatusChange }: OrderCardAdminProps) {
  const isUrgent = Date.now() - order.createdAt > URGENT_MS

  return (
    <article
      className={`animate-slide-up rounded-xl border border-border border-l-4 bg-surface-card p-4 shadow-lg transition-all hover:border-zinc-600 ${statusBorder[order.status]}`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">Pedido</p>
          <p className="text-3xl font-black text-white">#{order.orderNumber}</p>
        </div>
        <PlatformBadge platform={order.platform} size="sm" />
      </div>

      <ul className="mb-3 max-h-28 space-y-1 overflow-y-auto custom-scrollbar">
        {order.items.map((item, i) => (
          <li key={`${item}-${i}`} className="text-sm text-zinc-300">
            {item}
          </li>
        ))}
      </ul>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-zinc-500">Tempo</span>
        <TimerDisplay createdAt={order.createdAt} urgent={isUrgent} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {order.status === 'preparing' && (
          <ActionButton
            label="Fritando"
            className="bg-frying hover:bg-orange-600"
            onClick={() => onStatusChange('frying')}
          />
        )}
        {order.status === 'frying' && (
          <ActionButton
            label="Pronto"
            className="bg-ready hover:bg-green-600"
            onClick={() => onStatusChange('ready')}
          />
        )}
        {order.status === 'ready' && (
          <ActionButton
            label="Entregue"
            className="col-span-2 bg-emerald-700 hover:bg-emerald-600"
            onClick={() => onStatusChange('delivered')}
          />
        )}
        <ActionButton
          label="Cancelar"
          className="border border-red-500/40 bg-transparent text-red-400 hover:bg-red-500/10"
          onClick={() => onStatusChange('cancelled')}
        />
      </div>
    </article>
  )
}

function ActionButton({
  label,
  className,
  onClick,
}: {
  label: string
  className: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-2.5 text-sm font-bold text-white transition-all active:scale-95 ${className}`}
    >
      {label}
    </button>
  )
}
