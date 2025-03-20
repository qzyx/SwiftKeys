import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../features/Settings/SettingsSlice";
import testSettingsReducer from "../features/Test/TestSettingsSlice";
import userStatsReducer from "../features/UserStatsSlice/UserStatsSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Using localStorage for web

// Persist config
const persistConfig = {
  key: "settings",
  storage,
};

// Wrap your settings reducer with persistReducer
const persistedSettingsReducer = persistReducer(persistConfig, settingsReducer);
// Wrap your settings reducer with persistReducer
// Import the testSettingsReducer

const persistedTestSettingsReducer = persistReducer(
  persistConfig,
  testSettingsReducer
);

const persistedUserStatsReducer = persistReducer(
  persistConfig,
  userStatsReducer
);
// Configure store
export const store = configureStore({
  reducer: {
    settings: persistedSettingsReducer,
    testSettings: persistedTestSettingsReducer,
    userStats: persistedUserStatsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["register", "rehydrate"], // Ignore non-serializable fields
      },
    }),
});

// Persistor
export const persistor = persistStore(store);
