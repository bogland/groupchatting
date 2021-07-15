import { createSlice } from '@reduxjs/toolkit';

export type AuthState = {
  token: string | null;
};

const initialState: AuthState = {
  token: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => ({ ...state, token: action.payload.token })
  }
});

export default authSlice.reducer;
export const { setAuth } = authSlice.actions;
