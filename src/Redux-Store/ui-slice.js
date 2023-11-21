import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    show: false,
    errorMessage: null,
    showStatus: false,
    statusMessage: null,
    menuBar: false,
  },
  reducers: {
    showToggle: (state, action) => {
      state.show = action.payload;
      console.log('show toggle from slice');
    },
    errorMessage: (state, action) => {
      const errorMessage = action.payload.message;
      state.errorMessage = errorMessage;
    },
    statusNotificationToggle: (state) => {
      console.log('status notification running');
      state.showStatus = !state.showStatus;
      console.log(state.showStatus);
    },
    statusMessage: (state, action) => {
      state.statusMessage = action.payload.statusMessage;
      console.log('status message is here ', state.statusMessage);
    },
    showMenuBar: (state, action) => {
      state.menuBar = action.payload;
    },
    toggleMenuBar: (state) => {
      console.log('toggle menubar calling from slice');
      state.menuBar = !state.menuBar;
      console.log('current state of menubar from slice', state.menuBar);
    },
  },
});

export default uiSlice.reducer;

export const uiActions = uiSlice.actions;
