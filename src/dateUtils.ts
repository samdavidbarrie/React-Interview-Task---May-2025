import { startOfWeek, format, parse, addDays, isValid } from 'date-fns'
import { DATE_FORMAT_API, DATE_FORMAT_DISPLAY, WEEK_START_DAY } from './constants'

// date-fns type for weekStartsOn: 0 (Sunday) to 6 (Saturday)
type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6

export function getWeekStart(dateStr: string) {
  const date = parse(dateStr, DATE_FORMAT_API, new Date())
  return startOfWeek(date, { weekStartsOn: WEEK_START_DAY as Day })
}

export function formatDate(date: Date) {
  return format(date, DATE_FORMAT_DISPLAY)
}

export function getFriendlyWeekRange(weekStart: string) {
  const start = parse(weekStart, DATE_FORMAT_DISPLAY, new Date())
  if (!isValid(start)) return ''
  const end = addDays(start, 6)
  const startStr = format(start, 'MMM d')
  const endStr = format(end, 'MMM d, yyyy')
  return `${startStr} – ${endStr}`
}
