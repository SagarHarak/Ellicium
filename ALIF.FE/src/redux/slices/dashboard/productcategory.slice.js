import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getChartDataLeftChart, getProductBySupplier, getProductCategory, getSuppilerDetailsandExposures } from "src/redux/async";

const initialState = {
    productByCategoryLoader: false,
    productByCategoryError: "",
    productByCategory_state: [],
};

export const productByCategorySlice = createSlice({
  name: "ProductByCategory",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getProductCategory.pending), (state) => {
      state.productByCategoryLoader = true;
    });
    builder.addMatcher(isAnyOf(getProductCategory.fulfilled), (state, action) => {
      state.productByCategoryLoader = false;
      state.productByCategory_state = action.payload;
      state.productByCategoryError = "";
    });
    builder.addMatcher(isAnyOf(getProductCategory.rejected), (state, action) => {
      state.productByCategoryLoader = false;
      state.productByCategoryError = action.payload;
    });
  },
  reducers: {
    emptyproductByCategorySlice: (state) => {
      state.productByCategoryLoader = false;
      state.productByCategoryError = "";
      state.productByCategory_state = [];
    },
  },
});

// export const { emptyNewsSlice } = otpSlice.actions;

export default productByCategorySlice.reducer;
