import { createSlice } from "@reduxjs/toolkit";

export const testSettingsSlice = createSlice({
  name: "testSettings",
  initialState: {
    option: "words",
    count: 10,
    time: 30,
  },
  reducers: {
    setOption: (state, action) => {
      state.option = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { setOption, setCount, setTime } = testSettingsSlice.actions;
export default testSettingsSlice.reducer;
