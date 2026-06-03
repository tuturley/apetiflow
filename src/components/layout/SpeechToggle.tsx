import { useEffect, useState } from 'react'
import {
  isSpeechEnabled,
  isSpeechSupported,
  setSpeechEnabled,
  warmupSpeechVoices,
} from '@/services/speechService'

interface SpeechToggleProps {
  variant?: 'sidebar' | 'compact'
}

export function SpeechToggle({ variant = 'sidebar' }: SpeechToggleProps) {
  const [enabled, setEnabled] = useState(isSpeechEnabled)
  const supported = isSpeechSupported()

  useEffect(() => {
    warmupSpeechVoices()
    setEnabled(isSpeechEnabled())
  }, [])

  if (!supported) {
    return (
      <p className="px-2 text-xs text-zinc-600">
        Voz não suportada neste navegador.
      </p>
    )
  }

  const compact = variant === 'compact'

  return (
    <button
      type="button"
      onClick={() => {
        const next = !enabled
        setSpeechEnabled(next)
        setEnabled(next)
      }}
      title={enabled ? 'Desligar voz' : 'Ligar voz'}
      className={
        compact
          ? `flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
              enabled
                ? 'border-ready/40 bg-ready/10 text-ready'
                : 'border-border bg-white/5 text-zinc-500'
            }`
          : `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              enabled
                ? 'bg-ready/15 text-ready'
                : 'bg-white/5 text-zinc-500 hover:text-zinc-300'
            }`
      }
    >
      <span aria-hidden>{enabled ? '🔊' : '🔇'}</span>
      {enabled ? 'Voz ligada' : 'Voz desligada'}
    </button>
  )
}
