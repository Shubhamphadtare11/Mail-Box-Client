import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../../../Sidebar';
import { Container } from 'react-bootstrap';
const SendDetails = () => {
  const { dataId } = useParams();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState([]);
  const sendBoxEmails = useSelector((state) => state.email.emailContent);

  // useEffect(() => {
  //  dispatch(fetchAuthor())
  // },[dispatch])

  console.log('send box mail', sendBoxEmails);

  useEffect(() => {
    const selectedEmail = sendBoxEmails.find((item) => item.id === dataId);

    if (selectedEmail) {
      setSelectedItem(selectedEmail);
    }
  }, [dataId, sendBoxEmails]);

  console.log('selected send', selectedItem);

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
              To: {selectedItem.toEmail}
            </h3>
          </div>
          <div>
            <h3 style={{ borderBottom: 'solid thin grey' }}>
              Subject: {selectedItem.subject}
            </h3>
          </div>
          <div>
            <h3>Content: {selectedItem.content}</h3>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SendDetails;
