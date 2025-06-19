import { TITLE } from '../classNames'
import { useIsMobile } from '../hooks/useIsMobile'
import type { RootState } from '../store'
import { useAppSelector } from '../store/hooks'
import type { FC } from 'react'

export const Header: FC = () => {
  const isMobile = useIsMobile()
  const { weeks, grouped, currentWeekIndex } = useAppSelector(
    (state: RootState) => state.sightings,
  )
  return (
    <header className="flex flex-col items-center justify-center mt-4 mb-2">
      <h1 className={TITLE}>
        UFO Sightings <span className="hidden sm:inline">Dashboard</span>
      </h1>
      {!isMobile && weeks.length > 0 && grouped[weeks[currentWeekIndex]] && (
        <span className="mt-2 text-xs text-gray-400 block font-normal">
          {grouped[weeks[currentWeekIndex]].reduce(
            (sum, s) => sum + s.sightings,
            0,
          )}{' '}
          sightings this week
        </span>
      )}
    </header>
  )
}
