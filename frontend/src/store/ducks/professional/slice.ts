import { createSlice } from "@reduxjs/toolkit";

export const professionalSlice = createSlice({
  name: "professional",
  initialState: {
    data: {
      id: null,
      user_id: null,
      user: null,
      profession: null,
      RegistrationNumber: null,
      specialties: null,
      location: null,
      maximumDisplacement: null,
      created_at: null,
      updated_at: null,
    },
    list: [],
    loading: false,
    error: false,
    success: false,
  },
  reducers: {
    loadProfessional: (state, action) => {
      state.loading = true;
    },
    loadProfessionalSuccess: (state, action) => {
      console.log("entrou em loadProfessionalSuccess");

      state.loading = false;
      state.error = false;
      state.success = true;
      state.data = action.payload;
    },
    loadProfessionalFail: (state) => {
      console.log("entrou em loadProfessionalFail");

      state.loading = false;
      state.error = true;
      state.success = false;
      state.data = professionalSlice.getInitialState().data;
    },
    createProfessional: (state, action) => {
      state.loading = true;
    },
    createProfessionalSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.data = action.payload;
    },
    createProfessionalFails: (state) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.data = professionalSlice.getInitialState().data;
    },
    loadAllProfessionals: (state) => {
      state.loading = true;
    },
    loadAllProfessionalsSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.list = action.payload;
    },
    loadAllProfessionalsFail: (state) => {
      state.loading = false;
      state.error = true;
      state.success = false;
      state.list = professionalSlice.getInitialState().list;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loadProfessional,
  loadProfessionalFail,
  loadProfessionalSuccess,
  createProfessional,
  createProfessionalFails,
  createProfessionalSuccess,
  loadAllProfessionals,
  loadAllProfessionalsFail,
  loadAllProfessionalsSuccess,
} = professionalSlice.actions;

export default professionalSlice.reducer;
