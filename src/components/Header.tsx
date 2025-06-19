import { TITLE } from '../classNames'
import { useIsMobile } from '../useIsMobile'
import type { RootState } from '../store'
import { useAppSelector } from '../store/hooks'

export function Header() {
  const isMobile = useIsMobile()
  const { weeks, grouped, currentWeekIndex } = useAppSelector(
    (state: RootState) => state.sightings,
  )
  return (
    <div className="flex flex-col items-center">
      <h1 className={TITLE}>UFO Sightings{!isMobile && ' Dashboard'}</h1>
      {!isMobile && weeks.length > 0 && grouped[weeks[currentWeekIndex]] && (
        <span className="mt-2 text-xs text-gray-400 block font-normal">
          {grouped[weeks[currentWeekIndex]].reduce(
            (sum, s) => sum + s.sightings,
            0,
          )}{' '}
          sightings this week
        </span>
      )}
    </div>
  )
}
