import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getExternalRoutingKpiAsync } from "src/redux/async/digitaltwin.async";

const initialState = {
    externalRoutingKpiLoader: false,
    externalRoutingKpiError: "",
    externalRoutingKpiData: [],
};

export const externalRoutingKpiSlice = createSlice({
  name: "ExternalRoutingKpi",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getExternalRoutingKpiAsync.pending), (state) => {
      state.externalRoutingKpiLoader = true;
    });
    builder.addMatcher(isAnyOf(getExternalRoutingKpiAsync.fulfilled), (state, action) => {
      state.externalRoutingKpiLoader = false;
      state.externalRoutingKpiData = action.payload;
      state.externalRoutingKpiError = "";
    });
    builder.addMatcher(isAnyOf(getExternalRoutingKpiAsync.rejected), (state, action) => {
      state.externalRoutingKpiLoader = false;
      state.externalRoutingKpiError = action.payload;
    });
  }
});

// export const { emptyNewsSlice } = otpSlice.actions;

export default externalRoutingKpiSlice.reducer;
