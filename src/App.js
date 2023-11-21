import SignUp from './components/authentication/SignUp';
import Header from './components/Header';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/authentication/Login';
import HomePage from './components/Pages/HomePage';
import { useSelector, useDispatch } from 'react-redux';
import ErrorModal from './components/UI/ErrorModal';
import { useEffect } from 'react';
import InboxDetails from './components/Email/EmailComponents/Inbox/InboxDetails';
import SendDetails from './components/Email/EmailComponents/Send/SendDetails';
import useFetch from './hooks/useFetch';
import InboxPage from './components/Pages/InboxPage';
import ComposePage from './components/Pages/ComposePage';
import SendPage from './components/Pages/SendPage';
function App() {
  const emailContent = useSelector((state) => state.email.emailContent);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const showErrorModal = useSelector((state) => state.ui.show);
  const recipientEmail = useSelector((state) => state.email.recepientEmail);
  const loggedInEmail = useSelector((state) => state.auth.authorEmail);

  console.log(isLoggedIn);
  const authorEmail = loggedInEmail?.split('.').join('');
  const recipient = 'recipient';

  useFetch(authorEmail, recipient);

  const author = 'author';

  useFetch(authorEmail, author);

  //  useEffect(() => {
  //   dispatch(sendEmail(emailContent,recipientEmail,authorEmail))
  //   console.log("running")
  //  },[dispatch,emailContent,recipientEmail,authorEmail])

  //  useEffect(() => {
  //   dispatch(sendEmail(emailContent,recipientEmail,authorEmail))
  //   console.log("running")
  //  },[dispatch,emailContent,recipientEmail,authorEmail])
  return (
    <div>
      <Header />
      {showErrorModal && <ErrorModal message={showErrorModal.errorMessage} />}
      <Routes>
        <Route
          path='/Home'
          element={<HomePage />}>
          {isLoggedIn && (
            <Route
              path='compose'
              element={<ComposePage />}
            />
          )}
          {!isLoggedIn && (
            <Route
              path='compose'
              element={
                <Navigate
                  replace
                  to='/Login'
                />
              }
            />
          )}
          {isLoggedIn && (
            <Route
              path='inbox'
              element={<InboxPage />}
            />
          )}
          {!isLoggedIn && (
            <Route
              path='inbox'
              element={
                <Navigate
                  replace
                  to='/Login'
                />
              }
            />
          )}
          {isLoggedIn && (
            <Route
              path='send'
              element={<SendPage />}
            />
          )}
          {!isLoggedIn && (
            <Route
              path='send'
              element={
                <Navigate
                  replace
                  to='/Login'
                />
              }
            />
          )}
        </Route>
        {!isLoggedIn && (
          <Route
            path='/signUp'
            element={<SignUp />}
          />
        )}
        {!isLoggedIn && (
          <Route
            path='/Login'
            element={<Login />}
          />
        )}
        {isLoggedIn && (
          <Route
            path='/inboxdetails/:dataId'
            element={<InboxDetails />}
          />
        )}
        {isLoggedIn && (
          <Route
            path='/sendDetails/:dataId'
            element={<SendDetails />}
          />
        )}
        <Route
          path='*'
          element={
            <Navigate
              replace
              to='/Home'
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
