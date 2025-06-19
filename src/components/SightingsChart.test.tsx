import { render } from '@testing-library/react'
import { SightingsChart } from './SightingsChart'
import type { WeekData } from '../types'

// Tests for the SightingsChart component.
// These tests ensure the chart renders correctly with various data, is responsive, and handles edge cases.

describe('SightingsChart', () => {
  it('renders with empty data', () => {
    const { container } = render(
      <SightingsChart
        weekData={[]}
        weeks={['2025-06-16']}
        currentWeekIndex={0}
      />,
    )

    expect(
      container.querySelector('.recharts-responsive-container'),
    ).toBeTruthy()
  })

  it('renders chart container with week data', () => {
    const weekData: WeekData[] = [
      { day: 'Mon', sightings: 10 },
      { day: 'Tue', sightings: 20 },
      { day: 'Wed', sightings: 0 },
      { day: 'Thu', sightings: 5 },
      { day: 'Fri', sightings: 0 },
      { day: 'Sat', sightings: 2 },
      { day: 'Sun', sightings: 1 },
    ]
    const { container } = render(
      <SightingsChart
        weekData={weekData}
        weeks={['2025-06-16']}
        currentWeekIndex={0}
      />,
    )
    expect(
      container.querySelector('.recharts-responsive-container'),
    ).toBeTruthy()
  })
})

export {}
