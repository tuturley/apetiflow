import type { OrderStatus, Platform } from '@/types/order'

export const PLATFORMS: { id: Platform; label: string; color: string }[] = [
  { id: 'ifood', label: 'iFood', color: '#ea1d2c' },
  { id: '99food', label: '99Food', color: '#ffcc00' },
  { id: 'keeta', label: 'Keeta', color: '#00d4aa' },
]

export const STATUS_LABELS: Record<OrderStatus, string> = {
  preparing: 'Preparando',
  frying: 'Fritando',
  ready: 'Pronto',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
}

export const TV_COLUMNS: OrderStatus[] = ['preparing', 'frying', 'ready']

export const ADMIN_ACTIVE_STATUSES: OrderStatus[] = [
  'preparing',
  'frying',
  'ready',
]

export const QUICK_ITEMS = [
  'Coxinha',
  'Bolinha de queijo',
  'Kibe',
  'Pastel de carne',
  'Pastel de frango',
  'Esfiha',
  'Empada',
  'Risole',
  'Enroladinho',
  'Combo 10 un',
  'Combo 20 un',
]
