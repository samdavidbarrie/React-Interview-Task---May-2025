import type { FC } from 'react'
import { NAV_BUTTON } from '../classNames'

interface WeekNavigationProps {
  currentWeekIndex: number
  weeksCount: number
  onPrev: () => void
  onNext: () => void
}

export const WeekNavigation: FC<WeekNavigationProps> = ({
  currentWeekIndex,
  weeksCount,
  onPrev,
  onNext,
}) => (
  <div className="flex justify-center items-center space-x-4">
    <button
      className={NAV_BUTTON}
      onClick={onPrev}
      disabled={currentWeekIndex === 0}
    >
      Previous Week
    </button>
    <button
      className={NAV_BUTTON}
      onClick={onNext}
      disabled={currentWeekIndex === weeksCount - 1}
    >
      Next Week
    </button>
  </div>
)
