import { useState } from 'react'
import { NewOrderModal } from '@/components/orders/NewOrderModal'
import { OrderCardAdmin } from '@/components/orders/OrderCardAdmin'
import { Sidebar } from '@/components/layout/Sidebar'
import { FirebaseBanner } from '@/components/layout/FirebaseBanner'
import { useOrders } from '@/context/OrdersContext'
import { useOrderAnnouncements } from '@/hooks/useOrderAnnouncements'
import { ADMIN_ACTIVE_STATUSES } from '@/utils/constants'
import { announcementEventForStatus } from '@/utils/announcements'
import type { Order, OrderInput, OrderStatus } from '@/types/order'

const columnMeta: Record<
  'preparing' | 'frying' | 'ready',
  { label: string; color: string }
> = {
  preparing: { label: 'Preparando', color: 'text-preparing' },
  frying: { label: 'Fritando', color: 'text-frying' },
  ready: { label: 'Pronto', color: 'text-ready' },
}

export function AdminPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const {
    firebaseReady,
    loading,
    getOrdersByStatus,
    createNewOrder,
    changeStatus,
    activeOrders,
  } = useOrders()
  const { announce } = useOrderAnnouncements()

  const handleStatus = async (order: Order, status: OrderStatus) => {
    const event = announcementEventForStatus(status)
    if (event) announce(event, order.orderNumber)
    await changeStatus(order.id, status)
  }

  const handleCreate = async (input: OrderInput) => {
    await createNewOrder(input)
    announce('created', input.orderNumber)
  }

  return (
    <div className="flex h-full min-h-screen">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {!firebaseReady && <FirebaseBanner />}

        <header className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-2xl font-black text-white">Painel da Cozinha</h2>
            <p className="text-sm text-zinc-500">
              {activeOrders.length} pedido(s) ativo(s)
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded-xl bg-preparing px-6 py-3 font-black text-black shadow-lg transition-all hover:bg-yellow-300 active:scale-95"
          >
            + Novo Pedido
          </button>
        </header>

        {loading ? (
          <div className="flex flex-1 items-center justify-center text-zinc-500">
            Carregando...
          </div>
        ) : (
          <main className="custom-scrollbar flex-1 overflow-auto p-4 md:p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {ADMIN_ACTIVE_STATUSES.map((status) => {
                const orders = getOrdersByStatus(status)
                const meta = columnMeta[status as keyof typeof columnMeta]
                return (
                  <section key={status}>
                    <h3
                      className={`mb-3 flex items-center gap-2 text-lg font-black uppercase tracking-wider ${meta.color}`}
                    >
                      {meta.label}
                      <span className="rounded-lg bg-white/5 px-2 py-0.5 text-sm text-white">
                        {orders.length}
                      </span>
                    </h3>
                    <div className="flex flex-col gap-3">
                      {orders.map((order) => (
                        <OrderCardAdmin
                          key={order.id}
                          order={order}
                          onStatusChange={(s) => handleStatus(order, s)}
                        />
                      ))}
                      {orders.length === 0 && (
                        <p className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-zinc-600">
                          Vazio
                        </p>
                      )}
                    </div>
                  </section>
                )
              })}
            </div>
          </main>
        )}
      </div>

      <NewOrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  )
}
