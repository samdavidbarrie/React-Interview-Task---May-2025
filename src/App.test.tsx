import { render, screen } from '@testing-library/react'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'

// Integration tests for the main App component.
// These tests cover the overall user flow, including data fetching, error handling, and UI integration.

// polyfill for Jest (jsdom)
class MockResponse {
  ok: boolean
  status: number
  headers: Record<string, string>
  private _body: string
  constructor(
    body: string,
    init: { status: number; headers: Record<string, string> },
  ) {
    this._body = body
    this.status = init.status
    this.headers = init.headers
    this.ok = this.status >= 200 && this.status < 300
  }
  async json() {
    return JSON.parse(this._body)
  }
}

global.Response = MockResponse as any

describe('App', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve(
        new MockResponse(
          JSON.stringify([
            { date: '15/03/2019', sightings: 37 },
            { date: '16/03/2019', sightings: 27 },
            { date: '17/03/2019', sightings: 2 },
            { date: '18/03/2019', sightings: 1 },
            { date: '19/03/2019', sightings: 5 },
            { date: '20/03/2019', sightings: 13 },
            { date: '21/03/2019', sightings: 8 },
          ]),
          {
            status: 200,
            headers: { 'Content-type': 'application/json' },
          },
        ),
      ),
    ) as unknown as typeof fetch
  })
  afterEach(() => {
    // @ts-ignore
    global.fetch.mockRestore && global.fetch.mockRestore()
  })
  it('renders loading state initially', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })
  it('renders dashboard after fetch', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )
    expect(
      await screen.findByText(/ufo sightings dashboard/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /select week/i }),
    ).toBeInTheDocument()
  })
  it('renders an error message if fetch fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        headers: { 'Content-type': 'application/json' },
        json: async () => ({}),
      }),
    ) as unknown as typeof fetch

    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )
    expect(await screen.findByText(/failed to fetch data/i)).toBeInTheDocument()
  })
})
