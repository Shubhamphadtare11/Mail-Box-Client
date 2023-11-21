import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');
const initialEmail = localStorage.getItem('authorEmail');

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    isLoggedIn: !!initialToken,
    authorEmail: initialEmail,
    idToken: initialToken,
  },
  reducers: {
    login: (state, action) => {
      const idToken = action.payload.idToken;
      state.idToken = idToken;
      state.isLoggedIn = !!idToken;
      localStorage.setItem('token', idToken);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('authorEmail');
    },
    authorEmail: (state, action) => {
      const authorEmail = action.payload.email;
      state.authorEmail = authorEmail;
      console.log(state.authorEmail);
      localStorage.setItem('authorEmail', authorEmail);
    },
  },
});

export default authSlice.reducer;

export const authAction = authSlice.actions;
