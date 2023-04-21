import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { getSupplierNetworkAsync } from 'src/redux/async/vcn/vcn.async'

const initialState = {
  supplierNetworkLoader: false,
  supplierNetworkData: [],
  supplierNetworkError: '',
}

export const supplierNetworkSlice = createSlice({
  name: 'Supplier Network',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getSupplierNetworkAsync.pending), (state) => {
      state.supplierNetworkLoader = true
    })
    builder.addMatcher(isAnyOf(getSupplierNetworkAsync.fulfilled), (state, action) => {
      state.supplierNetworkLoader = false
      state.supplierNetworkData = action.payload
    })
    builder.addMatcher(isAnyOf(getSupplierNetworkAsync.rejected), (state, action) => {
      state.supplierNetworkLoader = false
      state.supplierNetworkError = action.payload.message
    })
  },
})

export default supplierNetworkSlice.reducer
