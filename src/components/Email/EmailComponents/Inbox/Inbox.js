import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import InboxItems from './InboxItems';
import { uiActions } from '../../../../Redux-Store/ui-slice';
const Inbox = () => {
  const dispatch = useDispatch();
  const recipientData = useSelector((state) => state.email.recipientData);
  const currentLoggedEmail = useSelector((state) => state.auth.authorEmail);
  const cleanLoggedInEmail = currentLoggedEmail.split('.').join('');
  console.log('recipient data from inbox', recipientData);

  const recipient = 'recipient';
  useFetch(cleanLoggedInEmail, recipient);
  useEffect(() => {
    dispatch(uiActions.showMenuBar(false));
  }, []);
  return (
    <div>
      {recipientData?.map((item) => (
        <InboxItems
          key={item.id}
          id={item.id}
          blue={item.blue}
          emailFrom={item.authorEmail}
          content={item.content}
          subject={item.subject}
        />
      ))}
    </div>
  );
};

export default Inbox;
