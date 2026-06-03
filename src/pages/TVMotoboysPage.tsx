import { OrderCardTV } from '@/components/orders/OrderCardTV'
import { StatusColumn } from '@/components/orders/StatusColumn'
import { useOrders } from '@/context/OrdersContext'
import { TV_COLUMNS } from '@/utils/constants'

type TVColumnStatus = 'preparing' | 'frying' | 'ready'

const columnStyles: Record<
  TVColumnStatus,
  { title: string; accent: string; glow: string }
> = {
  preparing: {
    title: 'Preparando',
    accent: 'border-preparing/40 bg-preparing/10 text-preparing',
    glow: 'shadow-[0_0_30px_rgba(250,204,21,0.15)]',
  },
  frying: {
    title: 'Fritando',
    accent: 'border-frying/40 bg-frying/10 text-frying',
    glow: 'shadow-[0_0_30px_rgba(249,115,22,0.15)]',
  },
  ready: {
    title: 'Pronto',
    accent: 'border-ready/40 bg-ready/10 text-ready',
    glow: 'shadow-[0_0_30px_rgba(34,197,94,0.2)]',
  },
}

export function TVMotoboysPage() {
  const { getOrdersByStatus, loading } = useOrders()

  return (
    <div className="flex h-full min-h-screen flex-col bg-surface">
      <header className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4 md:px-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-preparing to-frying text-2xl font-black text-black">
            A
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white md:text-4xl">
              APETIFLOW
            </h1>
            <p className="text-sm text-zinc-500 md:text-base">
              Painel Motoboys — Garagem
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-zinc-500">Ao vivo</p>
          <p className="flex items-center justify-end gap-2 text-sm font-semibold text-ready">
            <span className="h-2 w-2 animate-pulse rounded-full bg-ready" />
            Sincronizado
          </p>
        </div>
      </header>

      {loading ? (
        <div className="flex flex-1 items-center justify-center text-zinc-500">
          Carregando pedidos...
        </div>
      ) : (
        <main className="grid flex-1 grid-cols-1 gap-6 overflow-hidden p-4 md:grid-cols-3 md:p-6 lg:p-8">
          {TV_COLUMNS.map((status) => {
            const orders = getOrdersByStatus(status)
            const style = columnStyles[status as TVColumnStatus]
            return (
              <StatusColumn
                key={status}
                title={style.title}
                status={status}
                count={orders.length}
                accentClass={style.accent}
                headerGlow={style.glow}
              >
                {orders.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-border py-12 text-center text-zinc-600">
                    Nenhum pedido
                  </p>
                ) : (
                  orders.map((order) => (
                    <OrderCardTV key={order.id} order={order} />
                  ))
                )}
              </StatusColumn>
            )
          })}
        </main>
      )}
    </div>
  )
}
