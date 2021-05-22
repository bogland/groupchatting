import { createSlice } from "@reduxjs/toolkit";

export type UIState = {
  title: string;
};

const initialState: UIState = {
  title: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setHeader: (state, action) => ({ ...state, title: action.payload.title }),
  },
});

export default uiSlice.reducer;
export const { setHeader } = uiSlice.actions;
