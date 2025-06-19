import { render, screen, fireEvent, within } from '@testing-library/react'
import { WeekPicker } from './WeekPicker'
import { getFriendlyWeekRange } from '../dateUtils'
import type { Sighting } from '../types'

// Tests for the WeekPicker component.
// These tests check that the week picker dropdown renders, lists weeks, and handles selection.

describe('WeekPicker', () => {
  const weeks = ['10/06/2025', '17/06/2025']
  const grouped = {
    '10/06/2025': [
      { date: '10/06/2025', sightings: 2 },
      { date: '11/06/2025', sightings: 3 },
    ],
    '17/06/2025': [
      { date: '17/06/2025', sightings: 5 },
      { date: '18/06/2025', sightings: 7 },
    ],
  } as Record<string, Sighting[]>
  const onSelect = jest.fn()

  it('renders the current week in the trigger button', () => {
    render(
      <WeekPicker
        weeks={weeks}
        grouped={grouped}
        currentWeekIndex={0}
        onSelect={onSelect}
      />,
    )
    const trigger = screen.getByRole('button', {
      name: new RegExp(getFriendlyWeekRange(weeks[0]), 'i'),
    })
    expect(trigger).toBeInTheDocument()
  })

  it('shows dropdown and lists all weeks with totals', () => {
    render(
      <WeekPicker
        weeks={weeks}
        grouped={grouped}
        currentWeekIndex={0}
        onSelect={onSelect}
      />,
    )
    fireEvent.click(screen.getByRole('button'))
    const dropdown = screen.getByRole('list')
    weeks.forEach((week) => {
      expect(
        within(dropdown).getAllByText(getFriendlyWeekRange(week))[0],
      ).toBeInTheDocument()
    })
    expect(within(dropdown).getByText('(5 sightings)')).toBeInTheDocument()
    expect(within(dropdown).getByText('(12 sightings)')).toBeInTheDocument()
  })

  it('calls onSelect when a week is clicked', () => {
    render(
      <WeekPicker
        weeks={weeks}
        grouped={grouped}
        currentWeekIndex={0}
        onSelect={onSelect}
      />,
    )
    // Open dropdown
    fireEvent.click(screen.getByRole('button'))
    const dropdown = screen.getByRole('list')
    const weekLis = within(dropdown).getAllByRole('listitem')
    // Click the second week option (index 1)
    fireEvent.click(weekLis[1])
    expect(onSelect).toHaveBeenCalledWith(1)
  })
})
