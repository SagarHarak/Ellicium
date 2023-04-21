import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getChartDataLeftChart, getProductBySupplier, getSuppilerDetailsandExposures } from "src/redux/async";

const initialState = {
    productBySuppliersLoader: false,
    productBySuppliersError: "",
    productBySuppliers_state: [],
};

export const productBySuppliersSlice = createSlice({
  name: "ProductBySuppliers",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getProductBySupplier.pending), (state) => {
      state.productBySuppliersLoader = true;
    });
    builder.addMatcher(isAnyOf(getProductBySupplier.fulfilled), (state, action) => {
      state.productBySuppliersLoader = false;
      state.productBySuppliers_state = action.payload;
      state.productBySuppliersError = "";
    });
    builder.addMatcher(isAnyOf(getProductBySupplier.rejected), (state, action) => {
      state.productBySuppliersLoader = false;
      state.productBySuppliersError = action.payload;
    });
  },
  reducers: {
    emptyproductBySuppliersSlice: (state) => {
      state.productBySuppliersLoader = false;
      state.productBySuppliersError = "";
      state.productBySuppliers_state = [];
    },
  },
});

// export const { emptyNewsSlice } = otpSlice.actions;

export default productBySuppliersSlice.reducer;
