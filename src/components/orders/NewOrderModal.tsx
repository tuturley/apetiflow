import { useMemo, useState } from 'react'
import { PLATFORMS, QUICK_ITEMS } from '@/utils/constants'
import type { OrderInput, Platform } from '@/types/order'

interface NewOrderModalProps {
  open: boolean
  onClose: () => void
  onCreate: (input: OrderInput) => Promise<void>
}

export function NewOrderModal({ open, onClose, onCreate }: NewOrderModalProps) {
  const [orderNumber, setOrderNumber] = useState('')
  const [platform, setPlatform] = useState<Platform>('ifood')
  const [items, setItems] = useState<string[]>([])
  const [customItem, setCustomItem] = useState('')
  const [saving, setSaving] = useState(false)

  const summary = useMemo(() => items.join(' • '), [items])

  if (!open) return null

  const toggleItem = (item: string) => {
    setItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    )
  }

  const addCustomItem = () => {
    const trimmed = customItem.trim()
    if (!trimmed || items.includes(trimmed)) return
    setItems((prev) => [...prev, trimmed])
    setCustomItem('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim() || items.length === 0) return

    setSaving(true)
    try {
      await onCreate({ orderNumber, platform, items })
      setOrderNumber('')
      setItems([])
      setPlatform('ifood')
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-order-title"
    >
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto custom-scrollbar rounded-2xl border border-border bg-surface-elevated p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="new-order-title" className="text-2xl font-black text-white">
            Novo Pedido
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            ✕
          </button>
        </div>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-zinc-400">
            Número do pedido
          </span>
          <input
            type="text"
            inputMode="numeric"
            autoFocus
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Ex: 4521"
            className="w-full rounded-xl border border-border bg-surface-card px-4 py-3 text-2xl font-bold text-white outline-none focus:border-preparing"
          />
        </label>

        <fieldset className="mb-4">
          <legend className="mb-2 text-sm font-medium text-zinc-400">
            Plataforma
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatform(p.id)}
                className={`rounded-xl border-2 py-3 text-sm font-bold transition-all ${
                  platform === p.id
                    ? 'border-white text-white'
                    : 'border-border text-zinc-500 hover:border-zinc-600'
                }`}
                style={
                  platform === p.id
                    ? { backgroundColor: p.color, borderColor: p.color }
                    : undefined
                }
              >
                {p.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-zinc-400">
            Itens rápidos (toque para adicionar)
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleItem(item)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                  items.includes(item)
                    ? 'bg-preparing text-black'
                    : 'bg-surface-card text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={customItem}
            onChange={(e) => setCustomItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomItem())}
            placeholder="Item personalizado"
            className="flex-1 rounded-xl border border-border bg-surface-card px-3 py-2 text-white outline-none focus:border-preparing"
          />
          <button
            type="button"
            onClick={addCustomItem}
            className="rounded-xl bg-zinc-700 px-4 py-2 font-semibold text-white hover:bg-zinc-600"
          >
            +
          </button>
        </div>

        {items.length > 0 && (
          <div className="mb-6 rounded-xl border border-border bg-surface-card p-4">
            <p className="mb-1 text-xs uppercase text-zinc-500">Resumo</p>
            <p className="font-medium text-zinc-200">{summary}</p>
            <p className="mt-1 text-sm text-zinc-500">{items.length} item(ns)</p>
          </div>
        )}

        <button
          type="submit"
          disabled={saving || !orderNumber.trim() || items.length === 0}
          className="w-full rounded-xl bg-ready py-4 text-lg font-black text-white transition-all hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
        >
          {saving ? 'Criando...' : 'Criar Pedido'}
        </button>
      </form>
    </div>
  )
}
