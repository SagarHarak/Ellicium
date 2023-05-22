import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getCompetitorAnalysisFilters } from "src/redux/async";

const initialState = {
  cafiltersLoader: false,
  cafiltersError: "",
  cafiltersData: [],
};

export const competitorAnalysisFiltersSlice = createSlice({
  name: "CompetitorAnalysisFilters",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getCompetitorAnalysisFilters.pending), (state) => {
      state.cafiltersLoader = true;
    });
    builder.addMatcher(isAnyOf(getCompetitorAnalysisFilters.fulfilled), (state, action) => {
      state.cafiltersLoader = false;
      state.cafiltersData = action.payload;
      state.cafiltersError = "";
    });
    builder.addMatcher(isAnyOf(getCompetitorAnalysisFilters.rejected), (state, action) => {
      state.cafiltersLoader = false;
      state.cafiltersError = action.payload;
    });
  },
});

// export const { AddSuppliersMap } = suppliersbycountriesSlice.actions;

export default competitorAnalysisFiltersSlice.reducer;
