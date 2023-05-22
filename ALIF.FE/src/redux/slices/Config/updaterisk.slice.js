import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {  getupdateRiskData } from "src/redux/async";

const initialState = {
    updateRiskLoader: false,
    updateRiskError: "",
    updateRisk_state: [],
};

export const updateRiskSlice = createSlice({
  name: "updateRisk",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getupdateRiskData.pending), (state) => {
      state.updateRiskLoader = true;
    });
    builder.addMatcher(isAnyOf(getupdateRiskData.fulfilled), (state, action) => {
      state.updateRiskLoader = false;
      state.updateRisk_state = action.payload;
      state.updateRiskError = "";
    });
    builder.addMatcher(isAnyOf(getupdateRiskData.rejected), (state, action) => {
      state.updateRiskLoader = false;
      state.updateRiskError = action.payload;
    });
  },
  reducers: {
    emptyupdateRiskSlice: (state) => {
      state.updateRiskLoader = false;
      state.updateRiskError = "";
      state.updateRisk_state = [];
    },
  },
});

// export const { emptyNewsSlice } = otpSlice.actions;

export default updateRiskSlice.reducer;
