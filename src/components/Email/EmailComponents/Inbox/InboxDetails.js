import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../../../Sidebar';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { uiActions } from '../../../../Redux-Store/ui-slice';
const InboxDetails = () => {
  const { dataId } = useParams();
  const dispatch = useDispatch();
  console.log(dataId);
  const [selectedEmail, setSelectedEmail] = useState([]);
  const inboxDetails = useSelector((state) => state.email.recipientData);

  // useEffect(() => {
  //   dispatch(fetchRecipient())
  //  },[dispatch])

  console.log('recipient data from inbox details', inboxDetails);

  useEffect(() => {
    const selectedItem = inboxDetails.find(
      (emailItem) => emailItem.id === dataId
    );

    if (selectedItem) {
      setSelectedEmail(selectedItem);
    }
  }, [dataId, inboxDetails]);

  useEffect(() => {
    dispatch(uiActions.showMenuBar(false));
  }, []);

  return (
    <React.Fragment>
      <Sidebar />
      <Container
        className='col-6 border border-grey mt-4'
        style={{ marginTop: '20rem' }}>
        <div
          style={{
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <div>
            <h3 style={{ borderBottom: 'solid thin grey' }}>
              From:{selectedEmail.authorEmail}
            </h3>
          </div>
          <div>
            <h3 style={{ borderBottom: 'solid thin grey' }}>
              Subject:{selectedEmail.subject}
            </h3>
          </div>
          <div>
            <h3>Content:{selectedEmail.content}</h3>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default InboxDetails;
