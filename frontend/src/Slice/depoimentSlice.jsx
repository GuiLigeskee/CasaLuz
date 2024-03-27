import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import depoimentService from "../Service/depoimentService";

const initialState = {
  depoiments: [],
  depoiment: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Publish an user's depoiment
export const publishDepoiment = createAsyncThunk(
  "depoiment/publish",
  async (depoiment, thunkAPI) => {
    const token = thunkAPI.getState().auth.admin.token;

    const data = await depoimentService.publishDepoiment(depoiment, token);

    console.log(data.errors);
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Get all depoiments
export const getDepoiments = createAsyncThunk("depoiment/getall", async () => {
  const data = await depoimentService.getDepoiments();

  return data;
});

// Get depoiment details
export const getDepoimentDetails = createAsyncThunk(
  "depoiment/get",
  async (id) => {
    const data = await depoimentService.getDepoimentDetails(id);
    return data;
  }
);

export const depoimentSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishDepoiment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishDepoiment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.depoiment = action.payload;
        state.depoiments.unshift(state.depoiments);
        state.message = "Anúncio publicado com sucesso!";
      })
      .addCase(publishDepoiment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = null;
      })
      .addCase(getDepoiments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepoiments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.depoiments = action.payload;
      })
      .addCase(getDepoimentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepoimentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.depoiments = action.payload;
      });
  },
});

export const { resetMessage } = depoimentSlice.actions;
export default depoimentSlice.reducer;
