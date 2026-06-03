import { useCallback } from 'react'
import {
  getAnnouncementMessage,
  type AnnouncementEvent,
} from '@/utils/announcements'
import { speakAnnouncement } from '@/services/speechService'

export function useOrderAnnouncements() {
  const announce = useCallback((event: AnnouncementEvent, orderNumber: string) => {
    const message = getAnnouncementMessage(event, orderNumber)
    speakAnnouncement(message)
  }, [])

  return { announce }
}
