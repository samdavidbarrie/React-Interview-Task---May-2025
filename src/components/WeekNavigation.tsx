import type { FC } from 'react'

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
      className="rounded bg-gray-700 px-4 py-2 text-base font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
      onClick={onPrev}
      disabled={currentWeekIndex === 0}
    >
      Previous Week
    </button>
    <button
      className="rounded bg-gray-700 px-4 py-2 text-base font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
      onClick={onNext}
      disabled={currentWeekIndex === weeksCount - 1}
    >
      Next Week
    </button>
  </div>
)
