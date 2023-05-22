import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { getInventoryAsync } from 'src/redux/async'

const initialState = {
  InventoryLoader: false,
  Inventory: [],
  InventoryError: '',
}

export const InventorySlice = createSlice({
  name: 'Inventory Analysis',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getInventoryAsync.pending), (state) => {
      state.InventoryLoader = true
    })
    builder.addMatcher(isAnyOf(getInventoryAsync.fulfilled), (state, action) => {
      state.InventoryLoader = false
      state.Inventory = action.payload
    })
    builder.addMatcher(isAnyOf(getInventoryAsync.rejected), (state, action) => {
      state.InventoryLoader = false
      state.InventoryError = action.payload.message
    })
  },
})

export default InventorySlice.reducer
