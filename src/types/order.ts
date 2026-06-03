export type Platform = 'ifood' | '99food' | 'keeta'

export type OrderStatus =
  | 'preparing'
  | 'frying'
  | 'ready'
  | 'delivered'
  | 'cancelled'

export interface Order {
  id: string
  orderNumber: string
  platform: Platform
  items: string[]
  status: OrderStatus
  createdAt: number
  updatedAt: number
}

export type OrderInput = Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'> & {
  status?: OrderStatus
}
