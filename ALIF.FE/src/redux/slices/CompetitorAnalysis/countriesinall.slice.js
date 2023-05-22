import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getSuppliersByCountries } from "src/redux/async";

const initialState = {
  suppliersbycountriesLoader: false,
  suppliersbycountriesError: "",
  suppliersbycountries_state: [],
  suppliersbycountries_data : []
};

export const suppliersbycountriesSlice = createSlice({
  name: "SuppliersByCountries",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getSuppliersByCountries.pending), (state) => {
      state.suppliersbycountriesLoader = true;
    });
    builder.addMatcher(isAnyOf(getSuppliersByCountries.fulfilled), (state, action) => {
      // state.suppliersbycountriesLoader = false;
      state.suppliersbycountries_state = action.payload;
      state.suppliersbycountriesError = "";
    });
    builder.addMatcher(isAnyOf(getSuppliersByCountries.rejected), (state, action) => {
      state.suppliersbycountriesLoader = false;
      state.suppliersbycountriesError = action.payload;
    });
  },
  reducers: {
    AddSuppliersMap: (state, action) => {
      state.suppliersbycountries_data = action.payload;
      state.suppliersbycountriesLoader = false;

    },
  },
});

export const { AddSuppliersMap } = suppliersbycountriesSlice.actions;

export default suppliersbycountriesSlice.reducer;
