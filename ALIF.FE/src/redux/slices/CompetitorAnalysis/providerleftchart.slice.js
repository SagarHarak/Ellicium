import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getChartDataLeftChart } from "src/redux/async";

const initialState = {
    providerLeftChartLoader: false,
    providerLeftChartError: "",
  providerLeftChart_state: [],
};

export const providerLeftChartSlice = createSlice({
  name: "ProviderLeftChart",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getChartDataLeftChart.pending), (state) => {
      state.providerLeftChartLoader = true;
    });
    builder.addMatcher(isAnyOf(getChartDataLeftChart.fulfilled), (state, action) => {
      state.providerLeftChartLoader = false;
      state.providerLeftChart_state = action.payload;
      state.providerLeftChartError = "";
    });
    builder.addMatcher(isAnyOf(getChartDataLeftChart.rejected), (state, action) => {
      state.providerLeftChartLoader = false;
      state.providerLeftChartError = action.payload;
    });
  },
  reducers: {
    emptyProviderLeftChartSlice: (state) => {
      state.providerLeftChartLoader = false;
      state.providerLeftChartError = "";
      state.providerLeftChart_state = [];
    },
  },
});

// export const { emptyNewsSlice } = otpSlice.actions;

export default providerLeftChartSlice.reducer;
