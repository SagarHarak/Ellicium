import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getChartDataLeftChart, getSuppilerDetailsandExposures } from "src/redux/async";

const initialState = {
    supplierDetailsAndExposuresLoader: false,
    supplierDetailsAndExposuresError: "",
    supplierDetailsAndExposures_state: [],
};

export const supplierDetailsAndExposuresSlice = createSlice({
  name: "SupplierDetailsAndExposures",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getSuppilerDetailsandExposures.pending), (state) => {
      state.supplierDetailsAndExposuresLoader = true;
    });
    builder.addMatcher(isAnyOf(getSuppilerDetailsandExposures.fulfilled), (state, action) => {
      state.supplierDetailsAndExposuresLoader = false;
      state.supplierDetailsAndExposures_state = action.payload;
      state.supplierDetailsAndExposuresError = "";
    });
    builder.addMatcher(isAnyOf(getSuppilerDetailsandExposures.rejected), (state, action) => {
      state.supplierDetailsAndExposuresLoader = false;
      state.supplierDetailsAndExposuresError = action.payload;
    });
  },
  reducers: {
    emptysupplierDetailsAndExposuresSlice: (state) => {
      state.supplierDetailsAndExposuresLoader = false;
      state.supplierDetailsAndExposuresError = "";
      state.supplierDetailsAndExposures_state = [];
    },
  },
});

// export const { emptyNewsSlice } = otpSlice.actions;

export default supplierDetailsAndExposuresSlice.reducer;
