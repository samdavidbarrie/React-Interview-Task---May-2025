import { useEffect } from 'react'
import { addDays, parse, format } from 'date-fns'
import './App.css'
import { Container } from './layout'
import { SightingsChart } from './components/SightingsChart'
import { WeekNavigation } from './components/WeekNavigation'
import { DATE_FORMAT_API, DATE_FORMAT_DISPLAY, daysOfWeek } from './constants'
import type { WeekData } from './types'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchSightings, setCurrentWeekIndex } from './store/sightingsSlice'
import { WeekPicker } from './components/WeekPicker'

function App() {
  const dispatch = useAppDispatch()
  const { weeks, grouped, currentWeekIndex, loading, error } = useAppSelector(
    (state) => state.sightings,
  )

  useEffect(() => {
    dispatch(fetchSightings())
  }, [dispatch])

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentWeekIndex > 0) {
        dispatch(setCurrentWeekIndex(currentWeekIndex - 1))
        e.preventDefault()
      } else if (
        e.key === 'ArrowRight' &&
        currentWeekIndex < weeks.length - 1
      ) {
        dispatch(setCurrentWeekIndex(currentWeekIndex + 1))
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [currentWeekIndex, weeks.length, dispatch])

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
      <div className="mb-4 text-gray-300 text-lg flex items-center justify-center gap-4 relative">
        <span role="img" aria-label="calendar">
          📅
        </span>
        <WeekPicker
          weeks={weeks}
          grouped={grouped}
          currentWeekIndex={currentWeekIndex}
          onSelect={(idx) => dispatch(setCurrentWeekIndex(idx))}
        />
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
      <div className="flex justify-center mt-2 mb-4">
        <span className="text-gray-400 text-sm flex items-center gap-1 select-none">
          <span className="font-bold text-green-300">Pssst…</span>
          <span>Use arrow keys</span>
          <span role="img" aria-label="left arrow">
            ⬅️
          </span>
          <span role="img" aria-label="right arrow">
            ➡️
          </span>
          <span>to change week</span>
        </span>
      </div>
    </Container>
  )
}

export default App
