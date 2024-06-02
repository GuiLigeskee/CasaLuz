import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import adsReducer from "./Slice/adsSlice";
import depoimentReducer from "./Slice/depoimentSlice";
import zipCodeReducer from "./Slice/zipCodeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ads: adsReducer,
    depoiments: depoimentReducer,
    zipCode: zipCodeReducer,
  },
});
