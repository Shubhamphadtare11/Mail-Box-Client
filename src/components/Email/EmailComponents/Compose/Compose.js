import React, { useState, useRef, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Compose.css';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Notification from '../../../UI/Notification';
import { sendEmail } from '../../../../Redux-Store/email-actions';
import { emailActions } from '../../../../Redux-Store/email-slice';

const Compose = () => {
  const showStatus = useSelector((state) => state.ui.showStatus);
  const statusMessage = useSelector((state) => state.ui.statusMessage);
  // const authorEmail = useSelector(state => state.email.authorEmail)
  // const recepientEmail = useSelector(state => state.email.recipientEmail)
  const currentUserEmail = useSelector((state) => state.auth.authorEmail);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const emailInputRef = useRef();
  const subjectInputRef = useRef();
  const dispatch = useDispatch();
  console.log('show status is here', showStatus);
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const EmailContent = convertToRaw(contentState);

    const enteredEmail = emailInputRef.current.value;
    dispatch(emailActions.addRecipientEmail(enteredEmail));
    const enteredSubject = subjectInputRef.current.value;
    let text = '';
    EmailContent.blocks.map((e) => {
      text = e.text;
    });

    const emailData = {
      subject: enteredSubject,
      content: text,
      toEmail: enteredEmail,
      blue: true,
    };

    // setEmailItems([...emailItems,emailData])
    console.log(emailData);

    // console.log(cleanRecipientEmail)
    let recipientEmail = enteredEmail;

    // useSend(emailData,recipientEmail,currentUserEmail)
    dispatch(sendEmail(emailData, recipientEmail, currentUserEmail));
  };

  return (
    <React.Fragment>
      <div className='email-composer'>
        <Form
          className='email-container'
          onSubmit={formSubmitHandler}>
          <div className='email-text-editor-container'>
            <div className='email-text-editor-field'>
              <label htmlFor='to'>To:</label>
              <input
                type='email'
                id='to'
                name='to'
                className='input'
                placeholder='Enter email address'
                ref={emailInputRef}
                required
              />
            </div>
            <div className='email-text-editor-field'>
              <label htmlFor='subject'>Subject:</label>
              <input
                type='text'
                id='subject'
                name='subject'
                className='input'
                placeholder='Enter email subject'
                ref={subjectInputRef}
                required
              />
            </div>
            <div className='email-text-editor'>
              <div className='editor-wrapper'>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  editorClassName='editor'
                />
              </div>
            </div>
            <div className='email-text-editor-action'></div>
          </div>
          <div style={{ textAlign: 'end' }}>
            {!showStatus && (
              <Button
                className='Button-send'
                style={{ marginRight: '38px', marginTop: '14px' }}
                type='submit'>
                Send
              </Button>
            )}
            {showStatus && <Notification message={statusMessage} />}
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default Compose;
