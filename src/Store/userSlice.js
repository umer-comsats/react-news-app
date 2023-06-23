// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// we have four states that will be used all over the website
const initialState = {
  user: null, // store user email
  token: null, // jwt token
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // clear all states when user logs out
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, clearUser } = userSlice.actions;
export default userSlice.reducer;
