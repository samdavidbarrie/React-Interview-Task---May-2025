import { daysOfWeek, DATE_FORMAT_API, DATE_FORMAT_DISPLAY } from '../constants'
import { addDays, format, parse } from 'date-fns'

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  weeks: string[]
  currentWeekIndex: number
}

export function CustomTooltip({
  active,
  payload,
  weeks,
  currentWeekIndex,
}: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const idx = daysOfWeek.indexOf(payload[0].payload.day)
    const week = weeks[currentWeekIndex]
    const weekStart = parse(week, DATE_FORMAT_DISPLAY, new Date())
    const d = addDays(weekStart, idx)
    const fullDate = format(d, DATE_FORMAT_API)
    return (
      <div className="bg-[#1e293b] text-white rounded-lg px-4 py-2 shadow-lg text-sm">
        <div className="font-semibold mb-1">
          {payload[0].payload.day}{' '}
          <span className="text-xs text-gray-400">({fullDate})</span>
        </div>
        <div>
          Sightings:{' '}
          <span className="font-bold">{payload[0].payload.sightings}</span>
        </div>
      </div>
    )
  }
  return null
}
