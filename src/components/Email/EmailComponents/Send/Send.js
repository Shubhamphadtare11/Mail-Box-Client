import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SendItems from './SendItems';
import useFetch from '../../../../hooks/useFetch';
import { uiActions } from '../../../../Redux-Store/ui-slice';
const Send = () => {
  const dispatch = useDispatch();
  const authorData = useSelector((state) => state.email.emailContent);
  const currentLoggedEmail = useSelector((state) => state.auth.authorEmail);
  const cleanLoggedInEmail = currentLoggedEmail.split('.').join('');
  console.log('authorData from send', authorData);
  useEffect(() => {
    dispatch(uiActions.showMenuBar(false));
  }, []);
  const author = 'author';
  useFetch(cleanLoggedInEmail, author);
  console.log('author data is here', authorData);
  return (
    <div>
      {authorData?.map((item) => (
        <SendItems
          key={item.id}
          id={item.id}
          emailTo={item.toEmail}
          content={item.content}
          subject={item.subject}
          blue={item.blue}
        />
      ))}
    </div>
  );
};

export default Send;
