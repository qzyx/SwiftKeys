import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../features/Settings/SettingsSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
});
