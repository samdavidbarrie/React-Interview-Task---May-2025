import { SightingsChart } from './SightingsChart'
import { WeekNavigation } from './WeekNavigation'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCurrentWeekIndex } from '../store/sightingsSlice'
import { ChartSkeleton } from './ChartSkeleton'
import type { WeekData } from '../types'

export function MainContent({ weekData }: { weekData: WeekData[] }) {
  const dispatch = useAppDispatch()
  const { currentWeekIndex, weeks, error, loading } = useAppSelector((state) => state.sightings)
  return (
    <>
      {loading ? (
        <ChartSkeleton loading />
      ) : error ? (
        <ChartSkeleton error={error} />
      ) : weeks.length === 0 ? (
        <ChartSkeleton empty />
      ) : (
        <SightingsChart
          weekData={weekData}
          weeks={weeks}
          currentWeekIndex={currentWeekIndex}
        />
      )}
      <WeekNavigation
        currentWeekIndex={currentWeekIndex}
        weeksCount={weeks.length}
        onPrev={() => dispatch(setCurrentWeekIndex(currentWeekIndex - 1))}
        onNext={() => dispatch(setCurrentWeekIndex(currentWeekIndex + 1))}
      />
    </>
  )
}
