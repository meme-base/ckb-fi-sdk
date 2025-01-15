/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { eventEmitter } from '@/utils/events'

export function useEvent(
  eventName: string,
  eventListener: (...args: any[]) => void
) {
  useEffect(() => {
    eventEmitter.on(eventName, eventListener)
    return () => {
      eventEmitter.off(eventName, eventListener)
    }
  }, [eventListener, eventName])
}
