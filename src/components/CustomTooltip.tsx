import { daysOfWeek, DATE_FORMAT_API, DATE_FORMAT_DISPLAY } from '../constants'
import { addDays, format, parse } from 'date-fns'
import type { WeekData } from '../types'

interface TooltipPayload {
  payload: WeekData
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
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
    // Inline style ensures tooltip always visible
    return (
      <div
        style={{
          backgroundColor: '#1e293b',
          opacity: 1,
          pointerEvents: 'auto',
          borderRadius: '0.5rem', // matches Tailwind's rounded-lg
          padding: '0.75rem 1.5rem', // matches Tailwind's px-6 py-3
        }}
        className="text-white shadow-lg text-sm flex flex-col space-y-1 min-w-[120px]"
      >
        <div className="font-semibold">{payload[0].payload.day}</div>
        <div className="text-xs text-gray-400">{fullDate}</div>
        <div>
          <span className="text-gray-300">Sightings:</span>{' '}
          <span className="font-bold">{payload[0].payload.sightings}</span>
        </div>
      </div>
    )
  }
  return null
}
