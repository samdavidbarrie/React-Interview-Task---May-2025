import { render, screen, fireEvent } from '@testing-library/react'
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

  it('calls onPrev and onNext when buttons are clicked', () => {
    const onPrev = jest.fn()
    const onNext = jest.fn()
    render(
      <WeekNavigation
        currentWeekIndex={1}
        weeksCount={3}
        onPrev={onPrev}
        onNext={onNext}
      />,
    )
    fireEvent.click(screen.getByText(/previous week/i))
    fireEvent.click(screen.getByText(/next week/i))
    expect(onPrev).toHaveBeenCalled()
    expect(onNext).toHaveBeenCalled()
  })
})

export {}
