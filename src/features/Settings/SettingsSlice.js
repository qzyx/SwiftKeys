import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    theme: "Default",
    quick_start: "Tab",
    max_line_width: 80,
    font_size: "md",
    smooth_scrolling: false,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setQuickStart: (state, action) => {
      state.quick_start = action.payload;
    },
    setMaxLineWidth: (state, action) => {
      state.max_line_width = action.payload;
    },
    setFontSize: (state, action) => {
      state.font_size = action.payload;
    },
    setSmoothScrolling: (state, action) => {
      state.smooth_scrolling = action.payload;
    },
  },
});
export const {
  setTheme,
  setQuickStart,
  setMaxLineWidth,
  setFontSize,
  setSmoothScrolling,
} = settingsSlice.actions;
export default settingsSlice.reducer;
