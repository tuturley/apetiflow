import { useEffect, useRef } from 'react'
import { useOrders } from '@/context/OrdersContext'
import { useOrderAnnouncements } from '@/hooks/useOrderAnnouncements'
import {
  announcementEventForStatus,
  TV_ANNOUNCE_STATUSES,
} from '@/utils/announcements'
import type { Order } from '@/types/order'

type OrderSnapshot = Pick<Order, 'status' | 'orderNumber'>

/**
 * Escuta mudanças vindas do Firebase e anuncia na TV.
 * Quando a cozinha clica no Admin, o status muda no banco e a TV fala sozinha.
 */
export function useTVOrderAnnouncements() {
  const { orders, loading } = useOrders()
  const { announce } = useOrderAnnouncements()
  const snapshotRef = useRef<Map<string, OrderSnapshot>>(new Map())
  const isFirstLoad = useRef(true)

  useEffect(() => {
    if (loading) return

    const previous = snapshotRef.current
    const next = new Map<string, OrderSnapshot>()

    for (const order of orders) {
      next.set(order.id, {
        status: order.status,
        orderNumber: order.orderNumber,
      })

      if (isFirstLoad.current) continue

      const before = previous.get(order.id)

      if (!before) {
        if (TV_ANNOUNCE_STATUSES.includes(order.status)) {
          const event = announcementEventForStatus(order.status)
          if (event) announce(event, order.orderNumber)
        }
        continue
      }

      if (before.status !== order.status) {
        if (!TV_ANNOUNCE_STATUSES.includes(order.status)) continue
        const event = announcementEventForStatus(order.status)
        if (event) announce(event, order.orderNumber)
      }
    }

    snapshotRef.current = next
    isFirstLoad.current = false
  }, [orders, loading, announce])
}
