import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../Service/authService";

const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
  admin: admin ? admin : null,
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Register a admin
export const register = createAsyncThunk(
  "auth/register",
  async (adminData, thunkAPI) => {
    const token = thunkAPI.getState().auth.admin.token;

    const data = await authService.register(adminData, token);

    return data;
  }
);

// Logout a admin
export const logout = createAsyncThunk("auth/logout", () => {
  authService.logout();
});

// Sing in a admin
export const login = createAsyncThunk("auth/login", async (admin, thunkAPI) => {
  const data = await authService.login(admin);

  // Check for errors
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = "Administrador criado com sucesso.";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.admin = null;
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.admin = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.admin = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
