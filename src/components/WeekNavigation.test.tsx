import { render, screen } from '@testing-library/react'
import { WeekNavigation } from './WeekNavigation'

describe('WeekNavigation', () => {
  it('renders navigation buttons', () => {
    render(
      <WeekNavigation
        currentWeekIndex={0}
        weeksCount={2}
        onPrev={() => {}}
        onNext={() => {}}
      />,
    )
    expect(screen.getByText(/previous week/i)).toBeInTheDocument()
    expect(screen.getByText(/next week/i)).toBeInTheDocument()
  })
})

export {}
