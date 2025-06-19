import { render } from '@testing-library/react'
import { CustomTooltip } from './CustomTooltip'

// Tests for the CustomTooltip component.
// These tests verify that the tooltip displays correct information for each day and week, ensuring accurate data presentation in the chart.
// This helps prevent regressions in the tooltip UI.

describe('CustomTooltip', () => {
  it('renders nothing when inactive', () => {
    const { container } = render(
      <CustomTooltip
        active={false}
        weeks={['2025-06-16']}
        currentWeekIndex={0}
      />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders tooltip when active and payload present', () => {
    const payload = [{ payload: { day: 'Mon', sightings: 5 } }]
    const { container, getByText } = render(
      <CustomTooltip
        active={true}
        payload={payload}
        weeks={['2019-06-17']}
        currentWeekIndex={0}
      />,
    )
    expect(container.firstChild).not.toBeNull()
    expect(getByText(/mon/i)).toBeInTheDocument()
    expect(getByText(/sightings/i)).toBeInTheDocument()
  })
})

export {}
