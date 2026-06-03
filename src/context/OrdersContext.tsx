import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { isFirebaseConfigured } from '@/config/firebase'
import {
  createOrder,
  subscribeOrders,
  updateOrderStatus,
} from '@/services/ordersService'
import type { Order, OrderInput, OrderStatus } from '@/types/order'

interface OrdersContextValue {
  orders: Order[]
  activeOrders: Order[]
  loading: boolean
  firebaseReady: boolean
  createNewOrder: (input: OrderInput) => Promise<void>
  changeStatus: (orderId: string, status: OrderStatus) => Promise<void>
  getOrdersByStatus: (status: OrderStatus) => Order[]
}

const OrdersContext = createContext<OrdersContextValue | null>(null)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeOrders((nextOrders) => {
      setOrders(nextOrders)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const activeOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.status !== 'delivered' && o.status !== 'cancelled',
      ),
    [orders],
  )

  const getOrdersByStatus = useCallback(
    (status: OrderStatus) =>
      activeOrders
        .filter((o) => o.status === status)
        .sort((a, b) => a.createdAt - b.createdAt),
    [activeOrders],
  )

  const createNewOrder = useCallback(async (input: OrderInput) => {
    await createOrder(input)
  }, [])

  const changeStatus = useCallback(
    async (orderId: string, status: OrderStatus) => {
      await updateOrderStatus(orderId, status)
    },
    [],
  )

  const value = useMemo(
    () => ({
      orders,
      activeOrders,
      loading,
      firebaseReady: isFirebaseConfigured,
      createNewOrder,
      changeStatus,
      getOrdersByStatus,
    }),
    [
      orders,
      activeOrders,
      loading,
      createNewOrder,
      changeStatus,
      getOrdersByStatus,
    ],
  )

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  )
}

export function useOrders() {
  const ctx = useContext(OrdersContext)
  if (!ctx) {
    throw new Error('useOrders deve ser usado dentro de OrdersProvider')
  }
  return ctx
}
