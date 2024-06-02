import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import zipCodeService from "../Service/zipCodeService";

const initialState = {
  zipCodeApi: null,
  errorZipCodeApi: null,
  loading: false,
};

// Get CEP
export const getZipCode = createAsyncThunk(
  "zipCode/getZipCode",
  async (zipCode) => {
    try {
      const data = await zipCodeService.searchZipCode(zipCode);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const zipCodeSlice = createSlice({
  name: "zipCode",
  initialState,
  reducers: {
    resetZipCode: (state) => {
      state.zipCodeApi = null;
      state.errorZipCodeApi = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getZipCode.pending, (state) => {
        state.loading = true;
        state.errorZipCodeApi = null;
      })
      .addCase(getZipCode.fulfilled, (state, action) => {
        state.loading = false;
        state.errorZipCodeApi = null;
        state.zipCodeApi = action.payload;
      })
      .addCase(getZipCode.rejected, (state, action) => {
        state.loading = false;
        state.errorZipCodeApi = action.error;
        state.zipCodeApi = null;
      });
  },
});

export const selectZipCodeApi = (state) => state.zipCode.zipCodeApi;
export const selectZipCodeError = (state) => state.zipCode.errorZipCodeApi;

export const { resetZipCode } = zipCodeSlice.actions;

export default zipCodeSlice.reducer;
