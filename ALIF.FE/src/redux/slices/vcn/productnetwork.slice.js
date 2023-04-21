import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { getProductNetworkAsync } from 'src/redux/async/vcn/vcn.async'

const initialState = {
  productNetworkLoader: false,
  productNetworkData: [],
  productNetworkError: '',
}

export const productNetworkSlice = createSlice({
  name: 'Product Network',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getProductNetworkAsync.pending), (state) => {
      state.productNetworkLoader = true
    })
    builder.addMatcher(isAnyOf(getProductNetworkAsync.fulfilled), (state, action) => {
      state.productNetworkLoader = false
      state.productNetworkData = action.payload
    })
    builder.addMatcher(isAnyOf(getProductNetworkAsync.rejected), (state, action) => {
      state.productNetworkLoader = false
      state.productNetworkError = action.payload.message
    })
  },
})

export default productNetworkSlice.reducer
