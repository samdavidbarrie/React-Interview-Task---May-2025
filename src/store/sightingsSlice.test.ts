import reducer, { setCurrentWeekIndex, fetchSightings } from './sightingsSlice'

// Tests for the sightingsSlice Redux logic.
// These tests ensure that our reducers and async thunks behave as expected, covering state transitions for week navigation and data fetching.
// This helps guarantee that our global state management is reliable, independent of the UI.

describe('sightingsSlice', () => {
  it('should handle setCurrentWeekIndex', () => {
    const initialState = {
      data: [],
      grouped: {},
      weeks: ['2025-06-16', '2025-06-23'],
      currentWeekIndex: 0,
      loading: false,
      error: null,
    }
    const nextState = reducer(initialState, setCurrentWeekIndex(1))
    expect(nextState.currentWeekIndex).toBe(1)
  })

  it('should handle fetchSightings.fulfilled', () => {
    const initialState = {
      data: [],
      grouped: {},
      weeks: [],
      currentWeekIndex: 0,
      loading: true,
      error: null,
    }
    const payload = [
      { date: '15/03/2019', sightings: 37 },
      { date: '16/03/2019', sightings: 27 },
    ]
    const nextState = reducer(initialState, fetchSightings.fulfilled(payload, ''))
    expect(nextState.data).toEqual(payload)
    expect(nextState.loading).toBe(false)
    expect(nextState.weeks.length).toBeGreaterThan(0)
    expect(nextState.grouped).toBeDefined()
  })
})
