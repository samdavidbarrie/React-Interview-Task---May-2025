import { startOfWeek, format, parse } from 'date-fns'
import { DATE_FORMAT_API, DATE_FORMAT_DISPLAY } from './constants'

export function getMonday(dateStr: string) {
  const date = parse(dateStr, DATE_FORMAT_API, new Date())
  return startOfWeek(date, { weekStartsOn: 1 })
}

export function formatDate(date: Date) {
  return format(date, DATE_FORMAT_DISPLAY)
}
