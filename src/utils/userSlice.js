import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "service",
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = userSlice.actions;
export default userSlice.reducer;