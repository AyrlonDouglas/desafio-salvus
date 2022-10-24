import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    data: {
      email: "",
      password: false,
      user: {
        id: null as null | string,
        username: "",
        token: "",
      },
    },
    loading: false,
    error: false,
    success: false,
    userCreated: false,
  },
  reducers: {
    loginRequest: (state, action) => {
      state.loading = true;
      state.userCreated = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userCreated = false;

      state.data = {
        email: action.payload.email,
        password: action.payload.password,
        user: {
          id: action.payload.id,
          token: action.payload.access_token,
          username: action.payload.username,
        },
      };
    },
    loginFail: (state) => {
      state.data = loginSlice.getInitialState().data;
      state.loading = false;
      state.error = true;
    },
    signUpRequest: (state, action) => {
      state = {
        ...loginSlice.getInitialState(),
        loading: true,
      };
      state.userCreated = false;
    },
    signUpSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.userCreated = true;
    },
    signUpFail: (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.userCreated = false;
    },
    resetSignUp: (state) => {
      state.userCreated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginFail,
  loginSuccess,
  loginRequest,
  signUpFail,
  signUpRequest,
  signUpSuccess,
  resetSignUp,
} = loginSlice.actions;

export default loginSlice.reducer;
