import { render } from '@testing-library/react'
import { SightingsChart } from './SightingsChart'

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
})

export {}
