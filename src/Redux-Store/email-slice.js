import { createSlice } from '@reduxjs/toolkit';

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    emailContent: [],
    recepientEmail: null,
    authorEmail: null,
    recipientData: [],
    totalUnreadEmails: 0,
  },
  reducers: {
    addEmail: (state, action) => {
      state.emailContent = action.payload;
      console.log(state.emailContent);
      console.log('email content is calling');
    },
    recipientData: (state, action) => {
      state.recipientData = action.payload;
      console.log('recipient data from email-slice', state.recipientData);
    },
    addRecipientEmail: (state, action) => {
      state.recepientEmail = action.payload;
    },
    // totalUnread:(state,action) => {
    //   state.totalUnreadEmails = action.payload
    // }
  },
});

export const emailActions = emailSlice.actions;

export default emailSlice.reducer;
