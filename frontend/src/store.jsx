import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import adsReducer from "./Slice/adsSlice";
import depoimentReducer from "./Slice/depoimentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ads: adsReducer,
    depoiments: depoimentReducer,
  },
});
