import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetAction } from "./mainSlice";
import { API_URL } from "../util/functions";

export type AuthState = {
  isAuthenticated?: boolean;
  user?: string;
  password?: string;
  token?: string;
};

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      // if (action.payload.token) {
      //   state.isAuthenticated = true;
      //   state.token = action.payload.token;
      // }
      console.log(action.payload);
    });
  },
});

// First, create the thunk
export const loginThunk = createAsyncThunk<AuthState, any>(
  "auth",
  async (body) => {
    const { username, password } = body;
    console.log("username: ", username);
    console.log("password: ", password);

    const response = await fetch(API_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = response.json();
    return data;
  }
);

export default authSlice.reducer;
