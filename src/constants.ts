import { parse, isValid } from 'date-fns'
import { formatDate, getMonday } from './dateUtils'
import type { Sighting } from './types'

export const DATE_FORMAT_API = 'dd/MM/yyyy'
export const DATE_FORMAT_DISPLAY = 'yyyy-MM-dd'
export const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function groupByWeek(data: Sighting[]) {
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