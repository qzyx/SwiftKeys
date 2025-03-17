import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../features/Settings/SettingsSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Using localStorage for web

// Persist config
const persistConfig = {
  key: "settings",
  storage,
};

// Wrap your settings reducer with persistReducer
const persistedSettingsReducer = persistReducer(persistConfig, settingsReducer);

// Configure store
export const store = configureStore({
  reducer: {
    settings: persistedSettingsReducer,
  },
});

// Persistor
export const persistor = persistStore(store);
