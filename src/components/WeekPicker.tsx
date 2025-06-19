import { useRef, useEffect, useState } from 'react'
import { getFriendlyWeekRange } from '../dateUtils'
import type { Sighting } from '../types'
import { useIsMobile } from '../useIsMobile'
import { DROPDOWN_BTN, DROPDOWN_LIST, DROPDOWN_ITEM } from '../classNames'

interface WeekPickerProps {
  weeks: string[]
  grouped: Record<string, Sighting[]>
  currentWeekIndex: number
  onSelect: (idx: number) => void
}

export function WeekPicker({
  weeks,
  grouped,
  currentWeekIndex,
  onSelect,
}: WeekPickerProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLUListElement | null>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      dropdownRef.current.focus()
    }
  }, [showDropdown])

  return (
    <div className="relative">
      <button
        className={DROPDOWN_BTN}
        onClick={() => setShowDropdown((v) => !v)}
        tabIndex={0}
        aria-label="Select week"
      >
        {getFriendlyWeekRange(weeks[currentWeekIndex])}
        <span
          className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>
      {showDropdown && (
        <ul
          ref={dropdownRef}
          tabIndex={-1}
          className={`${DROPDOWN_LIST} ${isMobile ? 'right-0 left-auto min-w-[160px]' : ''}`}
          onBlur={() => setShowDropdown(false)}
        >
          {weeks.map((week: string, idx: number) => {
            const totalSightings = (grouped[week] || []).reduce(
              (sum: number, s: Sighting) => sum + s.sightings,
              0,
            )
            return (
              <li
                key={week}
                className={`${DROPDOWN_ITEM} ${
                  idx === currentWeekIndex
                    ? 'bg-blue-900 text-green-300 font-bold'
                    : ''
                } ${isMobile ? 'flex flex-col items-start' : ''}`}
                onClick={() => {
                  onSelect(idx)
                  setShowDropdown(false)
                }}
              >
                <span>{getFriendlyWeekRange(week)}</span>
                {!isMobile && (
                  <span className="ml-2 text-xs text-gray-400">
                    ({totalSightings} sightings)
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
