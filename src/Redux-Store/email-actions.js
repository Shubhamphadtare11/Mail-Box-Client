import { emailActions } from './email-slice';
import { uiActions } from './ui-slice';
import axios from 'axios';

let baseUrl = 'https://mailbox-client-51299-default-rtdb.firebaseio.com/';

// let loginEmail = localStorage.getItem("authorEmail")
// let authorEmail = loginEmail?.split(".").join("")

// export const fetchRecipient = (authorEmail) => {
//   return async(dispatch) => {

//     const fetchAllRecipientMails = async() => {
//       console.log('author email from recipient',authorEmail)
//       console.log("fecthing recipient from email action")
//       const response = await axios.get(`${baseUrl}recipient/${authorEmail}.json`)
//       // console.log(authorEmail)

//    console.log('after fetching recipient data is here',response.data)
//    let loadedRecipientData = []
//    for(const key in response.data ) {
//      loadedRecipientData.push({
//        id:key,
//        authorEmail:response.data[key].authorEmail,
//        content:response.data[key].emailContent.content,
//        subject:response.data[key].emailContent.subject,
//        blue:response.data[key].emailContent.blue
//      })
//    }

//    console.log('recipient array is here',loadedRecipientData)
//    dispatch(emailActions.recipientData(loadedRecipientData))
//     }
//       try {

//     await fetchAllRecipientMails()

//   }catch(error) {
//     dispatch(uiActions.errorMessage({message:error.message}))
//     console.log(error)
//     console.log('error from the fetching of recipient')
//   }
// }
// }

// export  const fetchAuthor =  (authorEmail) => {

//       return async(dispatch) => {

//         const fetchAllAuthorMails = async() => {
//           const response = await axios.get(`${baseUrl}author/${authorEmail}.json`)

//           console.log(response.data)
//           let loadedAuthorData = []
//           for(const key in response.data ) {
//             loadedAuthorData.push({
//               id:key,
//               toEmail:response.data[key].recipientEmail,
//               content:response.data[key].emailContent.content,
//               subject:response.data[key].emailContent.subject,
//               blue:response.data[key].emailContent.blue
//             })
//           }

//           console.log(loadedAuthorData)
//           dispatch(emailActions.addEmail(loadedAuthorData))
//         }
//        try {

//         await fetchAllAuthorMails()

//     }catch(error) {
//       dispatch(uiActions.errorMessage({message:error.message}))
//       console.log(error)
//       console.log('error from the fetching of author')

//     }
//     }
//     }

export const sendEmail = (emailContent, recipientEmail, currentUserEmail) => {
  console.log(recipientEmail);
  let cleanRecipientEmail = recipientEmail.split('.').join('');
  let cleanCurrentUserEmail = currentUserEmail.split('.').join('');
  return async (dispatch) => {
    dispatch(uiActions.statusNotificationToggle());
    dispatch(uiActions.statusMessage({ statusMessage: 'Mail is sending ' }));
    const postData = async () => {
      const response = await axios.post(
        `${baseUrl}recipient/${cleanRecipientEmail}.json`,
        {
          emailContent: emailContent,
          recipientEmail: recipientEmail,
          authorEmail: currentUserEmail,
        }
      );

      // console.log('from post author',authorEmail)
      await axios.post(`${baseUrl}author/${cleanCurrentUserEmail}.json`, {
        emailContent: emailContent,
        recipientEmail: recipientEmail,
        authorEmail: currentUserEmail,
      });

      console.log(response.data);
      return response.data;
    };
    try {
      await postData();
      dispatch(uiActions.statusMessage({ statusMessage: 'Successfully send' }));

      setTimeout(() => {
        dispatch(uiActions.statusMessage({ statusMessage: '' }));
        dispatch(uiActions.statusNotificationToggle());
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(uiActions.showToggle(true));
      dispatch(uiActions.statusNotificationToggle());
      dispatch(
        uiActions.errorMessage({
          message: 'OOPSSS!!! Failed to send the email',
        })
      );
    }
  };
};

export const updateRead = (
  authorEmail,
  content,
  id,
  currentLoggedEmail,
  requestTo,
  recepientEmail
) => {
  let cleanCurrentLoggedEmail = currentLoggedEmail.split('.').join('');
  console.log(cleanCurrentLoggedEmail);

  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${baseUrl}${requestTo}/${cleanCurrentLoggedEmail}/${id}.json`,
        {
          emailContent: content,
          recipientEmail: recepientEmail,
          authorEmail: authorEmail,
        }
      );
      console.log('from updation', response.data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const DeleteEmail = (id, currentLoggedEmail, userType) => {
  let cleanCurrentLoggedEmail = currentLoggedEmail.split('.').join('');
  return async (dispatch) => {
    const DeleteSelectedMail = async () => {
      const response = await axios.delete(
        `${baseUrl}${userType}/${cleanCurrentLoggedEmail}/${id}.json`
      );

      console.log(response.data);
    };
    try {
      await DeleteSelectedMail();
    } catch (err) {
      console.log(err);
      dispatch(uiActions.showToggle(true));
      dispatch(uiActions.statusNotificationToggle());
      dispatch(
        uiActions.errorMessage({
          message: 'OOPSSS!!! Failed to Delete the email',
        })
      );
    }
  };
};

// export const DeleteSendBoxEmail = (id,currentLoggedEmail) => {
//   let cleanCurrentLoggedEmail = currentLoggedEmail.split(".").join("")
//   return async(dispatch) => {
//     try{
//       const response = await axios.delete(`${baseUrl}author/${cleanCurrentLoggedEmail}/${id}.json`)

//       if(response === 200) {
//         console.log(response.data)
//       }

//     }catch(err){
//       console.log(err)
//     }
//   }
// }
