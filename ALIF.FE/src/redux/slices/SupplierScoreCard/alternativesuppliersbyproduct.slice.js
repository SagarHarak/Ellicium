import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { alternativeSuppliersByProduct } from "src/redux/async";

const initialState = {
    alternativeSuppliersByProductLoader: false,
    alternativeSuppliersByProductError: "",
    alternativeSuppliersByProduct_state: [],
};

export const alternativeSuppliersByProductSlice = createSlice({
  name: "AlternativeSuppliersByProduct",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(alternativeSuppliersByProduct.pending), (state) => {
      state.alternativeSuppliersByProductLoader = true;
    });
    builder.addMatcher(isAnyOf(alternativeSuppliersByProduct.fulfilled), (state, action) => {
      state.alternativeSuppliersByProductLoader = false;
      state.alternativeSuppliersByProduct_state = action.payload;
      state.alternativeSuppliersByProductError = "";
    });
    builder.addMatcher(isAnyOf(alternativeSuppliersByProduct.rejected), (state, action) => {
      state.alternativeSuppliersByProductLoader = false;
      state.alternativeSuppliersByProductError = action.payload;
    });
  },
  reducers: {
    emptyalternativeSuppliersByProductSlice: (state) => {
      state.alternativeSuppliersByProductLoader = false;
      state.alternativeSuppliersByProductError = "";
      state.alternativeSuppliersByProduct_state = [];
    },
  },
});

// export const { emptyNewsSlice } = otpSlice.actions;

export default alternativeSuppliersByProductSlice.reducer;
