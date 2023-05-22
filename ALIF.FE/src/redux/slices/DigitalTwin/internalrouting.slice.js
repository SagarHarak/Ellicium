import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getInternalRoutingKpiAsync } from "src/redux/async/digitaltwin.async";

const initialState = {
    internalRoutingKpiLoader: false,
    internalRoutingKpiError: "",
    internalRoutingKpiData: [],
};

export const internalRoutingKpiSlice = createSlice({
  name: "InternalRoutingKpi",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getInternalRoutingKpiAsync.pending), (state) => {
      state.internalRoutingKpiLoader = true;
    });
    builder.addMatcher(isAnyOf(getInternalRoutingKpiAsync.fulfilled), (state, action) => {
      state.internalRoutingKpiLoader = false;
      state.internalRoutingKpiData = action.payload;
      state.internalRoutingKpiError = "";
    });
    builder.addMatcher(isAnyOf(getInternalRoutingKpiAsync.rejected), (state, action) => {
      state.internalRoutingKpiLoader = false;
      state.internalRoutingKpiError = action.payload;
    });
  }
});

export default internalRoutingKpiSlice.reducer;
