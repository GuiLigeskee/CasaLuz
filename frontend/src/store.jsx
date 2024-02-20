import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import adsReducer from "./Slice/adsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ads: adsReducer,
  },
});
