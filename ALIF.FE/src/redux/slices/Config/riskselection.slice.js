import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {  getRiskSelectionData } from "src/redux/async";

const initialState = {
    riskSelectionLoader: false,
    riskSelectionError: "",
    riskSelection_state: [],
};

export const riskSelectionSlice = createSlice({
  name: "RiskSelection",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getRiskSelectionData.pending), (state) => {
      state.riskSelectionLoader = true;
    });
    builder.addMatcher(isAnyOf(getRiskSelectionData.fulfilled), (state, action) => {
      state.riskSelectionLoader = false;
      state.riskSelection_state = action.payload;
      state.riskSelectionError = "";
    });
    builder.addMatcher(isAnyOf(getRiskSelectionData.rejected), (state, action) => {
      state.riskSelectionLoader = false;
      state.riskSelectionError = action.payload;
    });
  },
  reducers: {
    emptyRiskSelectionSlice: (state) => {
      state.riskSelectionLoader = false;
      state.riskSelectionError = "";
      state.riskSelection_state = [];
    },
  },
});

// export const { emptyNewsSlice } = otpSlice.actions;

export default riskSelectionSlice.reducer;
