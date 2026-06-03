import { PLATFORMS } from '@/utils/constants'
import type { Platform } from '@/types/order'

interface PlatformBadgeProps {
  platform: Platform
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base font-bold',
}

export function PlatformBadge({ platform, size = 'md' }: PlatformBadgeProps) {
  const config = PLATFORMS.find((p) => p.id === platform)!

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: config.color }}
    >
      {config.label}
    </span>
  )
}
