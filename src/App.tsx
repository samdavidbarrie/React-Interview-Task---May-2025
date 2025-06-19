import { useEffect } from 'react'
import { addDays, parse, format } from 'date-fns'
import './App.css'
import { Container } from './layout'
import { Header } from './components/Header'
import { WeekPickerRow } from './components/WeekPickerRow'
import { ArrowKeyTip } from './components/ArrowKeyTip'
import { MainContent } from './components/MainContent'
import { LoadingState, ErrorState, EmptyState } from './components/States'
import { DATE_FORMAT_API, DATE_FORMAT_DISPLAY, daysOfWeek } from './constants'
import type { WeekData } from './types'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchSightings, setCurrentWeekIndex } from './store/sightingsSlice'

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

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />
  if (!weeks.length) return <EmptyState />
  return (
    <Container>
      <Header />
      <WeekPickerRow />
      <MainContent weekData={weekData} />
      <ArrowKeyTip />
    </Container>
  )
}

export default App
