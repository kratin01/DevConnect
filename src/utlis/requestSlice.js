import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addRequest: (state, action) => action.payload.requests,
    removeRequest: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
