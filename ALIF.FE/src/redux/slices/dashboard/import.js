import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { getImportAsync } from 'src/redux/async'

const initialState = {
  ImportLoader: false,
  Import: [],
  ImportError: '',
}

export const ImportSlice = createSlice({
  name: 'Import Analysis',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getImportAsync.pending), (state) => {
      state.ImportLoader = true
    })
    builder.addMatcher(isAnyOf(getImportAsync.fulfilled), (state, action) => {
      state.ImportLoader = false
      state.Import = action.payload
    })
    builder.addMatcher(isAnyOf(getImportAsync.rejected), (state, action) => {
      state.ImportLoader = false
      state.ImportError = action.payload.message
    })
  },
})

export default ImportSlice.reducer
