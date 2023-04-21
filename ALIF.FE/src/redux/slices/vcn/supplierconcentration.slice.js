import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { getSupplierConcentrationAsync } from 'src/redux/async/vcn/vcn.async'

const initialState = {
  supplierConcentrationLoader: false,
  supplierConcentrationData: [],
  supplierConcentrationError: '',
}

export const supplierConcentrationSlice = createSlice({
  name: 'Supplier Concentration',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getSupplierConcentrationAsync.pending), (state) => {
      state.supplierConcentrationLoader = true
    })
    builder.addMatcher(isAnyOf(getSupplierConcentrationAsync.fulfilled), (state, action) => {
      state.supplierConcentrationLoader = false
      state.supplierConcentrationData = action.payload
    })
    builder.addMatcher(isAnyOf(getSupplierConcentrationAsync.rejected), (state, action) => {
      state.supplierConcentrationLoader = false
      state.supplierConcentrationError = action.payload.message
    })
  },
})

export default supplierConcentrationSlice.reducer
