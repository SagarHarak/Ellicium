import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getDrillDownData } from "src/redux/async";

const initialState = {
    drillDownTableLoader: false,
    drillDownTableError: "",
    drillDownTable_state: [],
};

export const drillDownTableSlice = createSlice({
  name: "DrillDownTableSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getDrillDownData.pending), (state) => {
      state.drillDownTableLoader = true;
    });
    builder.addMatcher(isAnyOf(getDrillDownData.fulfilled), (state, action) => {
      state.drillDownTableLoader = false;
      state.drillDownTable_state = action.payload;
      state.drillDownTableError = "";
    });
    builder.addMatcher(isAnyOf(getDrillDownData.rejected), (state, action) => {
      state.drillDownTableLoader = false;
      state.drillDownTableError = action.payload;
    });
  },
  reducers: {
    emptydrillDownTableSlice: (state) => {
      state.drillDownTableLoader = false;
      state.drillDownTableError = "";
      state.drillDownTable_state = [];
    },
  },
});

// export const { emptyNewsSlice } = otpSlice.actions;

export default drillDownTableSlice.reducer;
