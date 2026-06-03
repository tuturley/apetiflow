import {
  ref,
  push,
  set,
  update,
  onValue,
  off,
  type DatabaseReference,
} from 'firebase/database'
import { database, isFirebaseConfigured } from '@/config/firebase'
import type { Order, OrderInput, OrderStatus } from '@/types/order'

const ORDERS_PATH = 'orders'

function ordersRef() {
  if (!database) throw new Error('Firebase não configurado')
  return ref(database, ORDERS_PATH)
}

function parseOrders(data: Record<string, Omit<Order, 'id'>> | null): Order[] {
  if (!data) return []
  return Object.entries(data)
    .map(([id, order]) => ({ ...order, id }))
    .sort((a, b) => b.createdAt - a.createdAt)
}

export function subscribeOrders(callback: (orders: Order[]) => void): () => void {
  if (!isFirebaseConfigured || !database) {
    callback([])
    return () => undefined
  }

  const dbRef = ordersRef()
  onValue(dbRef, (snapshot) => {
    callback(parseOrders(snapshot.val()))
  })

  return () => off(dbRef)
}

export async function createOrder(input: OrderInput): Promise<string> {
  if (!database) throw new Error('Firebase não configurado')

  const now = Date.now()
  const newRef = push(ordersRef())
  const id = newRef.key!

  const order: Omit<Order, 'id'> = {
    orderNumber: input.orderNumber.trim(),
    platform: input.platform,
    items: input.items,
    status: input.status ?? 'preparing',
    createdAt: now,
    updatedAt: now,
  }

  await set(newRef, order)
  return id
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<void> {
  if (!database) throw new Error('Firebase não configurado')

  const orderRef: DatabaseReference = ref(database, `${ORDERS_PATH}/${orderId}`)
  await update(orderRef, {
    status,
    updatedAt: Date.now(),
  })
}
