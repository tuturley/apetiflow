import { useTimer } from '@/hooks/useTimer'

interface TimerDisplayProps {
  createdAt: number
  variant?: 'tv' | 'admin'
  urgent?: boolean
}

export function TimerDisplay({
  createdAt,
  variant = 'admin',
  urgent = false,
}: TimerDisplayProps) {
  const elapsed = useTimer(createdAt)

  const base =
    variant === 'tv'
      ? 'font-mono text-3xl font-black tracking-wider'
      : 'font-mono text-lg font-bold'

  const color = urgent
    ? 'text-red-400'
    : variant === 'tv'
      ? 'text-white/90'
      : 'text-zinc-400'

  return (
    <span className={`${base} ${color}`} aria-label={`Tempo: ${elapsed}`}>
      {elapsed}
    </span>
  )
}
