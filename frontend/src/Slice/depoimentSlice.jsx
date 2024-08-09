import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import depoimentService from "../Service/depoimentService.jsx";

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

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const deleteDepoiment = createAsyncThunk(
  "depoiment/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.admin.token;

    const data = await depoimentService.deleteDepoiment(id, token);

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
    reset: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
      state.message = null;
      console.log("RESET DO REDUX (DEPOIMENTO)");
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
        state.message = "Depoimento publicado com sucesso!";
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
        state.depoiment = action.payload;
      })
      .addCase(deleteDepoiment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepoiment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.depoiments = state.depoiments.filter((depoiment) => {
          return depoiment._id !== action.payload.id;
        });

        state.message = action.payload.message;
      })
      .addCase(deleteDepoiment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.depoiment = null;
      });
  },
});

export const { reset } = depoimentSlice.actions;
export default depoimentSlice.reducer;
