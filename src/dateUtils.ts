import { startOfWeek, format, parse, addDays, isValid } from 'date-fns'
import { DATE_FORMAT_API, DATE_FORMAT_DISPLAY } from './constants'

export function getMonday(dateStr: string) {
  const date = parse(dateStr, DATE_FORMAT_API, new Date())
  return startOfWeek(date, { weekStartsOn: 1 })
}

export function formatDate(date: Date) {
  return format(date, DATE_FORMAT_DISPLAY)
}

export function getFriendlyWeekRange(monday: string) {
  const start = parse(monday, DATE_FORMAT_DISPLAY, new Date())
  if (!isValid(start)) return ''
  const end = addDays(start, 6)
  const startStr = format(start, 'MMM d')
  const endStr = format(end, 'MMM d, yyyy')
  return `${startStr} – ${endStr}`
}
