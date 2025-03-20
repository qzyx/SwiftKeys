import { createSlice } from "@reduxjs/toolkit";

export const UserStatsSlice = createSlice({
  name: "userStats",
  initialState: {
    userStats: {
      total: 0,
      completed: 0,
      topWpm: 0,
    },
  },
  reducers: {
    setTopWpm: (state, action) => {
      state.userStats.topWpm = action.payload;
    },
    setTotal: (state, action) => {
      state.userStats.total = action.payload;
    },
    setCompleted: (state, action) => {
      state.userStats.completed = action.payload;
    },
  },
});
export const { setTopWpm, setTotal, setCompleted } = UserStatsSlice.actions;
export default UserStatsSlice.reducer;
