import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "service",
  initialState: {
    items: [],
    settings:[]
  },
  reducers: {
    setItemEvent: (state, action) => {
      state.items = action.payload;
    },
    setItemSetting:(state, action)=>{
      state.settings = action.payload;
    }
  },
});

export const { setItemEvent, setItemSetting } = userSlice.actions;
export default userSlice.reducer;