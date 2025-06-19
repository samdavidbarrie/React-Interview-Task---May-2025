import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Sighting } from '../types'
import { groupByWeek } from '../constants'
import { fetchSightingsApi } from '../api'

export interface SightingsState {
  data: Sighting[]
  grouped: Record<string, Sighting[]>
  weeks: string[]
  currentWeekIndex: number
  loading: boolean
  error: string | null
}

const initialState: SightingsState = {
  data: [],
  grouped: {},
  weeks: [],
  currentWeekIndex: 0,
  loading: false,
  error: null,
}

export const fetchSightings = createAsyncThunk(
  'sightings/fetchSightings',
  async () => fetchSightingsApi()
)

const sightingsSlice = createSlice({
  name: 'sightings',
  initialState,
  reducers: {
    setCurrentWeekIndex(state, action: PayloadAction<number>) {
      state.currentWeekIndex = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSightings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSightings.fulfilled, (state, action) => {
        state.data = action.payload
        state.grouped = groupByWeek(action.payload)
        state.weeks = Object.keys(state.grouped).sort()
        state.currentWeekIndex = state.weeks.length - 1
        state.loading = false
      })
      .addCase(fetchSightings.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch data'
      })
  },
})

export const { setCurrentWeekIndex } = sightingsSlice.actions
export default sightingsSlice.reducer
