import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getExternalRoutingMapAsync } from "src/redux/async/digitaltwin.async";

const initialState = {
    externalRoutingMapLoader: false,
    externalRoutingMapError: "",
    externalRoutingMapData: [],
};

export const externalRoutingMapSlice = createSlice({
  name: "ExternalRoutingMap",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getExternalRoutingMapAsync.pending), (state) => {
      state.externalRoutingMapLoader = true;
    });
    builder.addMatcher(isAnyOf(getExternalRoutingMapAsync.fulfilled), (state, action) => {
      state.externalRoutingMapLoader = false;
      state.externalRoutingMapData = action.payload;
      state.externalRoutingMapError = "";
    });
    builder.addMatcher(isAnyOf(getExternalRoutingMapAsync.rejected), (state, action) => {
      state.externalRoutingMapLoader = false;
      state.externalRoutingMapError = action.payload;
    });
  }
});

export default externalRoutingMapSlice.reducer;
