import React from 'react';
import styles from '../../EmailItems.module.css';
import { Container } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { emailActions } from '../../../../Redux-Store/email-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { DeleteEmail, updateRead } from '../../../../Redux-Store/email-actions';
const InboxItems = (props) => {
  const dispatch = useDispatch();
  const recipientData = useSelector((state) => state.email.recipientData);
  const currentLoggedEmail = useSelector((state) => state.auth.authorEmail);
  console.log('recipient data from inbox items', recipientData);
  console.log('email from inbox', currentLoggedEmail);

  const onClickHandler = (e) => {
    e.preventDefault();

    const updateRecipientData = recipientData.map((item) => {
      let emailContent = {
        subject: item.subject,
        content: item.content,
        blue: false,
      };

      let recipient = 'recipient';

      if (item.id === props.id) {
        dispatch(
          updateRead(
            item.authorEmail,
            emailContent,
            item.id,
            currentLoggedEmail,
            recipient
          )
        );
        return { ...item, blue: false };
      }
      return item;
    });

    //  let readUpdation = {...recipientData,blue:false}
    dispatch(emailActions.recipientData(updateRecipientData));
  };

  const onDeleteHandler = (event) => {
    event.preventDefault();
    const deletedItem = recipientData.filter((item) => item.id !== props.id);

    dispatch(emailActions.recipientData(deletedItem));
    let recipient = 'recipient';
    dispatch(DeleteEmail(props.id, currentLoggedEmail, recipient));
  };

  return (
    <div>
      <Container className='lg-12 md-6 p-2 border border-dark mb-2 d-flex'>
        <button
          onClick={onClickHandler}
          className={styles.emailSelector}>
          <div className={styles.flux}>
            <div className={props.blue ? styles.readStatus : ''}></div>
            <div>
              <Link
                to={`/inboxdetails/${props.id}`}
                className='d-flex'>
                <p
                  style={{
                    marginLeft: '9rem',
                    marginRight: '9rem',
                    marginTop: '10px',
                  }}>
                  From: <br /> {props.emailFrom}
                </p>
                <p
                  style={{
                    marginLeft: '9rem',
                    marginRight: '9rem',
                    marginTop: '10px',
                  }}>
                  Subject: <br /> {props.subject}
                </p>
              </Link>
            </div>
          </div>
        </button>
        <button
          style={{ border: 'solid thin white' }}
          onClick={onDeleteHandler}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='19'
            height='19'
            fill='currentColor'
            className='bi bi-trash'
            viewBox='0 0 16 16'>
            <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
            <path
              fillRule='evenodd'
              d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
            />
          </svg>
        </button>
      </Container>
    </div>
  );
};

export default InboxItems;
