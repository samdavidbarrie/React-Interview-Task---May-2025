import { useMediaQuery } from './useMediaQuery'

/**
 * useIsMobile - returns true if the screen is <= 640px (Tailwind's sm breakpoint)
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 640px)')
}
