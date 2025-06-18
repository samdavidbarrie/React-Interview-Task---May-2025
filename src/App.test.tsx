import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  beforeAll(() => {
    global.fetch = jest.fn(
      () => new Promise(() => {}), // never resolves, keeps loading
    )
  })
  afterAll(() => {
    // @ts-ignore
    global.fetch.mockRestore && global.fetch.mockRestore()
  })
  it('renders loading state initially', () => {
    render(<App />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })
})
