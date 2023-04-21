import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { commodityPriceForcastAsync } from '../../async'

const initialState = {
  commodityforcastLoader: false,
  commodityforcast: [],
}

export const commodityforcastSlice = createSlice({
  name: 'Commodity Forcast',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(commodityPriceForcastAsync.pending), (state) => {
      state.commodityforcastLoader = true
    })
    builder.addMatcher(isAnyOf(commodityPriceForcastAsync.fulfilled), (state, action) => {
      state.commodityforcastLoader = false
      state.commodityforcast = action.payload.data
    })
    builder.addMatcher(isAnyOf(commodityPriceForcastAsync.rejected), (state, action) => {
      state.commodityforcastLoader = false
    })
  },
})

export default commodityforcastSlice.reducer
