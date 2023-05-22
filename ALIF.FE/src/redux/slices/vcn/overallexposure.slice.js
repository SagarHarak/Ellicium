import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { getOverallExposureAsync } from 'src/redux/async/vcn/vcn.async'

const initialState = {
  overallExposureLoader: false,
  overallExposureData: [],
  overallExposureError: '',
}

export const overallExposureSlice = createSlice({
  name: 'Overall Exposure',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getOverallExposureAsync.pending), (state) => {
      state.overallExposureLoader = true
    })
    builder.addMatcher(isAnyOf(getOverallExposureAsync.fulfilled), (state, action) => {
      state.overallExposureLoader = false
      state.overallExposureData = action.payload
    })
    builder.addMatcher(isAnyOf(getOverallExposureAsync.rejected), (state, action) => {
      state.overallExposureLoader = false
      state.overallExposureError = action.payload.message
    })
  },
})

export default overallExposureSlice.reducer
