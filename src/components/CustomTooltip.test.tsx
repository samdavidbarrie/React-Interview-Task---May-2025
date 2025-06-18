import { render } from '@testing-library/react'
import { CustomTooltip } from './CustomTooltip'

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
})

export {}
