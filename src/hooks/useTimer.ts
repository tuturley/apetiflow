import { useEffect, useState } from 'react'
import { formatElapsed } from '@/utils/format'

/** Atualiza o timer a cada segundo a partir de createdAt */
export function useTimer(createdAt: number): string {
  const [elapsed, setElapsed] = useState(() => formatElapsed(Date.now() - createdAt))

  useEffect(() => {
    const tick = () => setElapsed(formatElapsed(Date.now() - createdAt))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [createdAt])

  return elapsed
}
