import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { getProductsAsync } from 'src/redux/async/vcn/vcn.async'

const initialState = {
  productsLoader: false,
  productsData: [],
  productsError: '',
}

export const productSlice = createSlice({
  name: 'Products',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getProductsAsync.pending), (state) => {
      state.productsLoader = true
    })
    builder.addMatcher(isAnyOf(getProductsAsync.fulfilled), (state, action) => {
      state.productsLoader = false
      state.productsData = action.payload
    })
    builder.addMatcher(isAnyOf(getProductsAsync.rejected), (state, action) => {
      state.productsLoader = false
      state.productsError = action.payload.message
    })
  },
})

export default productSlice.reducer
