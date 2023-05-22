import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { getSupplierDetailsAsync } from 'src/redux/async/vcn/vcn.async'

const initialState = {
  supplierDetailsLoader: false,
  supplierDetailsData: [],
  supplierDetailsError: '',
}

export const supplierDetailsSlice = createSlice({
  name: 'Supplier Details',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getSupplierDetailsAsync.pending), (state) => {
      state.supplierDetailsLoader = true
    })
    builder.addMatcher(isAnyOf(getSupplierDetailsAsync.fulfilled), (state, action) => {
      state.supplierDetailsLoader = false
      state.supplierDetailsData = action.payload
    })
    builder.addMatcher(isAnyOf(getSupplierDetailsAsync.rejected), (state, action) => {
      state.supplierDetailsLoader = false
      state.supplierDetailsError = action.payload.message
    })
  },
})

export default supplierDetailsSlice.reducer
