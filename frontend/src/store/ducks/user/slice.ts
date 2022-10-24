import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      id: null,
      name: "",
      username: "",
      email: "",
      is_active: "",
      telephone: "",
      gender: "",
      created_at: null,
      updated_at: null,
      professional_id: null,
      professional: null,
    },
    loading: false,
    error: false,
    success: false,
  },
  reducers: {
    loadUser: (state, action) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.data = action.payload;
    },
    loadUserFail: (state) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.data = userSlice.getInitialState().data;
    },
    changePass: (state, action) => {
      state.loading = true;
    },
    changePassSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    },
    changePassFail: (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
    deleteUser: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    },
    deleteUserFail: (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loadUser,
  loadUserFail,
  loadUserSuccess,
  changePass,
  changePassFail,
  changePassSuccess,
  deleteUser,
  deleteUserFail,
  deleteUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
