import { useState, useEffect } from 'react'
import { startOfWeek, addDays, isValid, parse, format } from 'date-fns'
import './App.css'
import { Container } from './layout'
import { SightingsChart } from './components/SightingsChart'
import { WeekNavigation } from './components/WeekNavigation'
import { DATE_FORMAT_API, DATE_FORMAT_DISPLAY, daysOfWeek } from './constants'
import type { Sighting, WeekData } from './types'

const API_URL =
  'https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings/ufoSightings'

function getMonday(dateStr: string) {
  const date = parse(dateStr, DATE_FORMAT_API, new Date())
  return startOfWeek(date, { weekStartsOn: 1 })
}
function formatDate(date: Date) {
  return format(date, DATE_FORMAT_DISPLAY)
}
function groupByWeek(data: Sighting[]) {
  const weeks: Record<string, Sighting[]> = {}
  data.forEach((item) => {
    if (!item.date) return
    const dateObj = parse(item.date, DATE_FORMAT_API, new Date())
    if (!isValid(dateObj)) return
    const monday = formatDate(getMonday(item.date))
    if (!weeks[monday]) weeks[monday] = []
    weeks[monday].push(item)
  })
  return weeks
}
function getWeekRange(monday: string) {
  const start = parse(monday, DATE_FORMAT_DISPLAY, new Date())
  if (!isValid(start)) return ''
  const end = addDays(start, 6)
  return `${formatDate(start)} to ${formatDate(end)}`
}

function App() {
  const [data, setData] = useState<Sighting[]>([])
  const [weeks, setWeeks] = useState<string[]>([])
  const [weekData, setWeekData] = useState<WeekData[]>([])
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        const res = await fetch(API_URL)
        let json = null
        let errorMsg = ''
        try {
          json = await res.json()
        } catch {
          errorMsg = 'Invalid JSON response'
        }
        if (!res.ok) {
          setError(errorMsg || `Network error: ${res.status}`)
          setLoading(false)
          return
        }
        if (!json) {
          setError(errorMsg || 'No data received')
          setLoading(false)
          return
        }
        setData(json)
        const grouped = groupByWeek(json)
        const weekKeys = Object.keys(grouped).sort()
        setWeeks(weekKeys)
        setCurrentWeekIndex(weekKeys.length - 1) // show latest week
        setLoading(false)
      } catch (err) {
        setError(
          (err instanceof Error && err.message) || 'Failed to fetch data',
        )
        setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    if (!weeks.length) return
    const week = weeks[currentWeekIndex]
    const weekStart = parse(week, DATE_FORMAT_DISPLAY, new Date())
    if (!week || !isValid(weekStart)) {
      setWeekData([])
      return
    }
    const grouped = groupByWeek(data)
    const weekSightings = grouped[week] || []
    const daily: Record<string, number> = {}
    weekSightings.forEach((item) => {
      if (!item.date) return
      daily[item.date] = (daily[item.date] || 0) + item.sightings
    })
    const chartData = Array.from({ length: 7 }).map((_, idx) => {
      const d = addDays(weekStart, idx)
      const origDateStr = format(d, DATE_FORMAT_API)
      return {
        day: daysOfWeek[idx],
        sightings: daily[origDateStr] || 0,
      }
    })
    setWeekData(chartData)
  }, [weeks, currentWeekIndex, data])

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
      <div className="mb-4 text-gray-300">
        Week: {getWeekRange(weeks[currentWeekIndex])}
      </div>
      <SightingsChart
        weekData={weekData}
        weeks={weeks}
        currentWeekIndex={currentWeekIndex}
      />
      <WeekNavigation
        currentWeekIndex={currentWeekIndex}
        weeksCount={weeks.length}
        onPrev={() => setCurrentWeekIndex((i) => i - 1)}
        onNext={() => setCurrentWeekIndex((i) => i + 1)}
      />
    </Container>
  )
}

export default App
