import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { getFiltersAsync } from 'src/redux/async/vcn/vcn.async'

const initialState = {
  filtersLoader: false,
  filtersData: [],
  filtersError: '',
}

export const FilterSlice = createSlice({
  name: 'Filters',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getFiltersAsync.pending), (state) => {
      state.filtersLoader = true
    })
    builder.addMatcher(isAnyOf(getFiltersAsync.fulfilled), (state, action) => {
      state.filtersLoader = false
      state.filtersData = action.payload
    })
    builder.addMatcher(isAnyOf(getFiltersAsync.rejected), (state, action) => {
      state.filtersLoader = false
      state.filtersError = action.payload.message
    })
  },
})

export default FilterSlice.reducer
