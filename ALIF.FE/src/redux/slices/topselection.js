import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { getTopSelectionSupplier } from '../async'

const initialState = {
  topselectionsupplierLoader: false,
  topselectionsupplierData: [],
  topselectionsupplierError: '',
}

export const topselectionsupplierSlice = createSlice({
  name: 'Top Selection',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getTopSelectionSupplier.pending), (state) => {
      state.topselectionsupplierLoader = true
    })
    builder.addMatcher(isAnyOf(getTopSelectionSupplier.fulfilled), (state, action) => {
      state.topselectionsupplierLoader = false
      state.topselectionsupplierData = action.payload
    })
    builder.addMatcher(isAnyOf(getTopSelectionSupplier.rejected), (state, action) => {
      state.topselectionsupplierLoader = false
      state.topselectionsupplierError = action.payload.message
    })
  },
})

export default topselectionsupplierSlice.reducer
