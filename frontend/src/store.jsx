import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
