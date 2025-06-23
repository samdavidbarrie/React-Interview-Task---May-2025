import { parse, isValid, format, addDays } from 'date-fns'
import { formatDate, getWeekStart } from './dateUtils'
import type { Sighting } from './types'

/**
 * DayOfWeek and WEEK_START_DAY use date-fns convention: 0=Sunday, 1=Monday, ... 6=Saturday
 * WEEK_START_DAY is the single source of truth for week start throughout the app.
 */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
export const WEEK_START_DAY: DayOfWeek = 1 // 1=Monday

export const DATE_FORMAT_API = 'dd/MM/yyyy'
export const DATE_FORMAT_DISPLAY = 'yyyy-MM-dd'

function generateDaysOfWeek(startDay: DayOfWeek): string[] {
  const base = new Date(2025, 5, 22) // Any Monday (2025-06-23)
  return Array.from({ length: 7 }, (_, i) => {
    const day = addDays(base, (i + startDay) % 7)
    return format(day, 'EEE')
  })
}

export const daysOfWeek = generateDaysOfWeek(WEEK_START_DAY)

export function groupByWeek(data: Sighting[]) {
  const weeks: Record<string, Sighting[]> = {}
  data.forEach((item) => {
    if (!item.date) return
    const dateObj = parse(item.date, DATE_FORMAT_API, new Date())
    if (!isValid(dateObj)) return
    const weekStart = formatDate(getWeekStart(item.date))
    if (!weeks[weekStart]) weeks[weekStart] = []
    weeks[weekStart].push(item)
  })
  return weeks
}