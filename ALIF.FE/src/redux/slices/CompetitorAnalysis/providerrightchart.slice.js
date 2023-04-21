import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getChartDataRightChart } from "src/redux/async";

const initialState = {
    providerRightChartLoader: false,
    providerRightChartError: "",
  providerRightChart_state: [],
};

export const providerRightChartSlice = createSlice({
  name: "ProviderRightChart",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getChartDataRightChart.pending), (state) => {
      state.providerRightChartLoader = true;
    });
    builder.addMatcher(isAnyOf(getChartDataRightChart.fulfilled), (state, action) => {
      state.providerRightChartLoader = false;
      state.providerRightChart_state = action.payload;
      state.providerRightChartError = "";
    });
    builder.addMatcher(isAnyOf(getChartDataRightChart.rejected), (state, action) => {
      state.providerRightChartLoader = false;
      state.providerRightChartError = action.payload;
    });
  },
  reducers: {
    emptyProviderRightChartSlice: (state) => {
      state.providerRightChartLoader = false;
      state.providerRightChartError = "";
      state.providerRightChart_state = [];
    },
  },
});

// export const { emptyNewsSlice } = otpSlice.actions;

export default providerRightChartSlice.reducer;
