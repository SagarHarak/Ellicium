import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getSuppliersByCountriesForDonut } from "src/redux/async";

const initialState = {
  topcountriesLoader: false,
  topcountriesError: "",
  topcountries_state: [],
};

export const topCountriesDonutSlice = createSlice({
  name: "TopCountriesDonut",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getSuppliersByCountriesForDonut.pending), (state) => {
      state.topcountriesLoader = true;
    });
    builder.addMatcher(isAnyOf(getSuppliersByCountriesForDonut.fulfilled), (state, action) => {
      state.topcountriesLoader = false;
      state.topcountries_state = action.payload;
      state.topcountriesError = "";
    });
    builder.addMatcher(isAnyOf(getSuppliersByCountriesForDonut.rejected), (state, action) => {
      state.topcountriesLoader = false;
      state.topcountriesError = action.payload;
    });
  },
});

export default topCountriesDonutSlice.reducer;