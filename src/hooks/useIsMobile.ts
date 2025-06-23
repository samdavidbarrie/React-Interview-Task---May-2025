import { useMediaQuery } from './useMediaQuery'
import { BREAKPOINT_SM } from '../classNames'

/**
 * useIsMobile - returns true if the screen is <= 640px (Tailwind's sm breakpoint)
 */
export function useIsMobile(): boolean {
  // Use centralized BREAKPOINT_SM
  return useMediaQuery(`(max-width: ${BREAKPOINT_SM}px)`)
}
