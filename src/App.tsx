import { useEffect } from 'react'
import { addDays, isValid, parse, format } from 'date-fns'
import './App.css'
import { Container } from './layout'
import { SightingsChart } from './components/SightingsChart'
import { WeekNavigation } from './components/WeekNavigation'
import { DATE_FORMAT_API, DATE_FORMAT_DISPLAY, daysOfWeek } from './constants'
import { formatDate } from './dateUtils'
import type { WeekData } from './types'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchSightings, setCurrentWeekIndex } from './store/sightingsSlice'

function getWeekRange(monday: string) {
  const start = parse(monday, DATE_FORMAT_DISPLAY, new Date())
  if (!isValid(start)) return ''
  const end = addDays(start, 6)
  return `${formatDate(start)} to ${formatDate(end)}`
}

function getFriendlyWeekRange(monday: string) {
  const start = parse(monday, DATE_FORMAT_DISPLAY, new Date())
  if (!isValid(start)) return ''
  const end = addDays(start, 6)
  const startStr = format(start, 'MMM d')
  const endStr = format(end, 'MMM d, yyyy')
  return `${startStr} – ${endStr}`
}

function App() {
  const dispatch = useAppDispatch()
  const { weeks, grouped, currentWeekIndex, loading, error } = useAppSelector(
    (state) => state.sightings,
  )

  useEffect(() => {
    dispatch(fetchSightings())
  }, [dispatch])

  let weekData: WeekData[] = []
  if (weeks.length) {
    const week = weeks[currentWeekIndex]
    const weekStart = parse(week, DATE_FORMAT_DISPLAY, new Date())
    const weekSightings = grouped[week] || []
    const daily: Record<string, number> = {}
    weekSightings.forEach((item) => {
      if (!item.date) return
      daily[item.date] = (daily[item.date] || 0) + item.sightings
    })
    weekData = Array.from({ length: 7 }).map((_, idx) => {
      const d = addDays(weekStart, idx)
      const origDateStr = format(d, DATE_FORMAT_API)
      return {
        day: daysOfWeek[idx],
        sightings: daily[origDateStr] || 0,
      }
    })
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    )
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    )
  if (!weeks.length)
    return (
      <div className="flex items-center justify-center h-screen">
        No data available
      </div>
    )

  return (
    <Container>
      <h1 className="text-4xl font-bold mb-2 leading-tight">
        UFO Sightings Dashboard
      </h1>
      <div className="mb-4 text-gray-300 text-lg flex items-center justify-center gap-2">
        <span role="img" aria-label="calendar">
          📅{' '}
        </span>
        <span className="font-semibold text-green-300">
          {getFriendlyWeekRange(weeks[currentWeekIndex])}
        </span>
      </div>
      <SightingsChart
        weekData={weekData}
        weeks={weeks}
        currentWeekIndex={currentWeekIndex}
      />
      <WeekNavigation
        currentWeekIndex={currentWeekIndex}
        weeksCount={weeks.length}
        onPrev={() => dispatch(setCurrentWeekIndex(currentWeekIndex - 1))}
        onNext={() => dispatch(setCurrentWeekIndex(currentWeekIndex + 1))}
      />
    </Container>
  )
}

export default App
