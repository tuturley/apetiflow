import type { OrderStatus } from '@/types/order'

export type AnnouncementEvent =
  | 'created'
  | 'frying'
  | 'ready'
  | 'delivered'
  | 'cancelled'

/** Status que disparam voz na TV (garagem / motoboys) */
export const TV_ANNOUNCE_STATUSES: OrderStatus[] = [
  'frying',
  'ready',
  'delivered',
]

export function announcementEventForStatus(
  status: OrderStatus,
): AnnouncementEvent | null {
  switch (status) {
    case 'frying':
      return 'frying'
    case 'ready':
      return 'ready'
    case 'delivered':
      return 'delivered'
    case 'cancelled':
      return 'cancelled'
    default:
      return null
  }
}

const DIGIT_WORDS: Record<string, string> = {
  '0': 'zero',
  '1': 'um',
  '2': 'dois',
  '3': 'três',
  '4': 'quatro',
  '5': 'cinco',
  '6': 'seis',
  '7': 'sete',
  '8': 'oito',
  '9': 'nove',
}

/** Fala dígito a dígito — mais claro em cozinha barulhenta (4521 ≠ "quatro mil...") */
export function spellOrderNumber(orderNumber: string): string {
  const digits = orderNumber.replace(/\D/g, '').split('')
  if (digits.length === 0) return orderNumber
  return digits.map((d) => DIGIT_WORDS[d] ?? d).join(', ')
}

export function getAnnouncementMessage(
  event: AnnouncementEvent,
  orderNumber: string,
): string {
  const spoken = spellOrderNumber(orderNumber)

  switch (event) {
    case 'created':
      return `Novo pedido. Pedido ${spoken}.`
    case 'frying':
      return `Pedido ${spoken}, começou a fritar.`
    case 'ready':
      return `Pedido ${spoken}, está pronto.`
    case 'delivered':
      return `Pedido ${spoken}, saiu para entrega.`
    case 'cancelled':
      return `Pedido ${spoken}, cancelado.`
  }
}
