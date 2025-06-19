import React, { useRef, useEffect, useState } from 'react'
import { getFriendlyWeekRange } from '../dateUtils'
import type { Sighting } from '../types'

interface WeekPickerProps {
  weeks: string[]
  grouped: Record<string, Sighting[]>
  currentWeekIndex: number
  onSelect: (idx: number) => void
}

export const WeekPicker: React.FC<WeekPickerProps> = ({
  weeks,
  grouped,
  currentWeekIndex,
  onSelect,
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      dropdownRef.current.focus()
    }
  }, [showDropdown])

  return (
    <div className="relative">
      <button
        className="font-semibold text-green-300 bg-transparent border-none cursor-pointer p-2 rounded flex items-center gap-2 transition-colors duration-150 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setShowDropdown((v) => !v)}
        tabIndex={0}
        aria-label="Select week"
      >
        {getFriendlyWeekRange(weeks[currentWeekIndex])}
        <span className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} aria-hidden="true">
          ▼
        </span>
      </button>
      {showDropdown && (
        <ul
          ref={dropdownRef}
          tabIndex={-1}
          className="absolute left-0 top-full mt-1 bg-gray-800 text-white rounded shadow-lg border border-gray-600 z-10 w-max min-w-[220px] max-h-60 overflow-y-auto py-1"
          onBlur={() => setShowDropdown(false)}
        >
          {weeks.map((week: string, idx: number) => {
            const totalSightings = (grouped[week] || []).reduce(
              (sum: number, s: { sightings: number }) => sum + s.sightings,
              0
            )
            return (
              <li
                key={week}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-600 text-left justify-start w-full ${
                  idx === currentWeekIndex
                    ? 'bg-blue-900 text-green-300 font-bold'
                    : ''
                }`}
                onClick={() => {
                  onSelect(idx)
                  setShowDropdown(false)
                }}
              >
                <span>{getFriendlyWeekRange(week)}</span>
                <span className="ml-2 text-xs text-gray-400">({totalSightings} sightings)</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
