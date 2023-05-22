import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getInternalRoutingMapAsync } from "src/redux/async/digitaltwin.async";

const initialState = {
    internalRoutingMapLoader: false,
    internalRoutingMapError: "",
    internalRoutingMapData: [],
};

export const internalRoutingMapSlice = createSlice({
  name: "InternalRoutingKpi",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getInternalRoutingMapAsync.pending), (state) => {
      state.internalRoutingMapLoader = true;
    });
    builder.addMatcher(isAnyOf(getInternalRoutingMapAsync.fulfilled), (state, action) => {
      state.internalRoutingMapLoader = false;
      state.internalRoutingMapData = action.payload;
      state.internalRoutingMapError = "";
    });
    builder.addMatcher(isAnyOf(getInternalRoutingMapAsync.rejected), (state, action) => {
      state.internalRoutingMapLoader = false;
      state.internalRoutingMapError = action.payload;
    });
  }
});

export default internalRoutingMapSlice.reducer;
