import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { uploadProductsDataFromExcel } from "src/redux/async";

const initialState = {
  exceluploadloader: false,
  exceluploaderror: "",
  exceluploadconfirm: "",
};

export const excelUploadSlice = createSlice({
  name: "ExcelUpload",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(uploadProductsDataFromExcel.pending), (state) => {
      state.exceluploadloader = true;
    });
    builder.addMatcher(isAnyOf(uploadProductsDataFromExcel.fulfilled), (state, action) => {
      state.exceluploadloader = false;
      state.exceluploadconfirm = action.payload
    });
    builder.addMatcher(isAnyOf(uploadProductsDataFromExcel.rejected), (state, action) => {
      state.exceluploadloader = false;
      state.exceluploaderror = action.payload;
    });
  },
    reducers: {
    reset: () => initialState
    }
});

export const { reset } = excelUploadSlice.actions

export default excelUploadSlice.reducer;