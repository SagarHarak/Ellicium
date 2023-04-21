import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  company: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    // setCompany: (state, action) => {
    //   state.company = action.payload;
    // },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.company = null;
    },
  },
});

export const { login, setCompany, setUser, logout } = loginSlice.actions;

export default loginSlice.reducer;