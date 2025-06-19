import type { FC } from 'react'
import { WeekPicker } from './WeekPicker'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCurrentWeekIndex } from '../store/sightingsSlice'

export const WeekPickerRow: FC = () => {
  const dispatch = useAppDispatch()
  const { weeks, grouped, currentWeekIndex } = useAppSelector(
    (state) => state.sightings,
  )
  return (
    <div className="mb-4 text-gray-300 text-base sm:text-lg flex flex-row items-center justify-center gap-2 sm:gap-4 relative">
      <span role="img" aria-label="calendar" className="mb-1 sm:mb-0">
        📅
      </span>
      <WeekPicker
        weeks={weeks}
        grouped={grouped}
        currentWeekIndex={currentWeekIndex}
        onSelect={(idx) => dispatch(setCurrentWeekIndex(idx))}
      />
    </div>
  )
}
