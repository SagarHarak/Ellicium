import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { getCountryList } from '../async'

const initialState = {
  countrylistLoader: false,
  countrylistData: [],
  countrylistError: '',
}

export const countrylistSlice = createSlice({
  name: 'Country List',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getCountryList.pending), (state) => {
      state.countrylistLoader = true
    })
    builder.addMatcher(isAnyOf(getCountryList.fulfilled), (state, action) => {
      state.countrylistLoader = false
      state.countrylistData = action.payload
    })
    builder.addMatcher(isAnyOf(getCountryList.rejected), (state, action) => {
      state.countrylistLoader = false
      state.countrylistError = action.payload.message
    })
  },
})

export default countrylistSlice.reducer
