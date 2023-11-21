import React, { useEffect } from 'react';
import axios from 'axios';
import { emailActions } from '../Redux-Store/email-slice';
import { uiActions } from '../Redux-Store/ui-slice';
import { useDispatch } from 'react-redux';
const useFetch = (authorEmail, userType) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllMails = async () => {
      console.log('fecthing recipient from email action');
      const response = await axios.get(
        `https://mailbox-client-51299-default-rtdb.firebaseio.com/${userType}/${authorEmail}.json`
      );
      // console.log(authorEmail)

      console.log('after fetching recipient data is here', response.data);
      let loadedData = [];
      if (userType === 'recipient') {
        for (const key in response.data) {
          loadedData.push({
            id: key,
            authorEmail: response.data[key].authorEmail,
            content: response.data[key].emailContent.content,
            subject: response.data[key].emailContent.subject,
            blue: response.data[key].emailContent.blue,
          });
        }
        dispatch(emailActions.recipientData(loadedData));
      } else {
        for (const key in response.data) {
          loadedData.push({
            id: key,
            toEmail: response.data[key].recipientEmail,
            content: response.data[key].emailContent.content,
            subject: response.data[key].emailContent.subject,
            blue: response.data[key].emailContent.blue,
          });
        }
        dispatch(emailActions.addEmail(loadedData));
      }
      console.log('recipient array is here', loadedData);
    };
    try {
      fetchAllMails();
    } catch (error) {
      dispatch(uiActions.errorMessage({ message: error.message }));
      console.log(error);
      console.log('error from the fetching emails');
    }
  }, [authorEmail, userType]);
  return null;
};

export default useFetch;
