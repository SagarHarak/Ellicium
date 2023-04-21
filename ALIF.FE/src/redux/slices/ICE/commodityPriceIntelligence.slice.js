import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { commodityPriceIntelligenceAsync } from '../../async'

const initialState = {
  commodityPriceIntelligenceLoader: false,
  commodityPriceIntelligence: [],
}

export const commodityPriceIntelligenceSlice = createSlice({
  name: 'commodityPriceIntelligence',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(commodityPriceIntelligenceAsync.pending), (state) => {
      state.commodityPriceIntelligenceLoader = true
    })
    builder.addMatcher(isAnyOf(commodityPriceIntelligenceAsync.fulfilled), (state, action) => {
      // const listMatch = []
      // for (let ev of action.payload.data) {
      //   const splitdate = ev.date.split('-')
      //   if (Number(splitdate[2]) > 2019) {
      //     listMatch.push(ev)
      //   }
      // }
      state.commodityPriceIntelligenceLoader = false
      state.commodityPriceIntelligence = action.payload.data
    })
    builder.addMatcher(isAnyOf(commodityPriceIntelligenceAsync.rejected), (state, action) => {
      state.commodityPriceIntelligenceLoader = false
    })
  },
})

export default commodityPriceIntelligenceSlice.reducer
