import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetAction } from "./mainSlice";
import { API_URL } from "../util/functions";

export type AuthState = {
  isAuthenticated: boolean;
  user?: string;
  password?: string;
};

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(isLoginThunk.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload;
    });
  },
});

// First, create the thunk
export const isLoginThunk = createAsyncThunk("isLogin", async () => {
  //   const response = await fetch(API_URL + "isLogin", {
  //     method: "GET",
  //   });
  //   const data = response.json();
  return true;
});

export default authSlice.reducer;
