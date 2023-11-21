import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Auth.module.css';
import { useNavigate } from 'react-router';
import React, { useRef, useState } from 'react';
import ErrorModal from '../UI/ErrorModal';
import { uiActions } from '../../Redux-Store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';
import Email from '../../EmailIcon/mailImage.jpg';
function SignUp() {
  const navigate = useNavigate();
  const moveToLoginHandler = () => {
    navigate('/Login');
  };

  const errorMessage = useSelector((state) => state.ui.errorMessage);

  const emailInputRef = useRef();
  const passInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;
    setIsLoading(true);
    if (enteredPassword === enteredConfirmPassword) {
      fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlXgEK5KuClR6s4quTaWEDTD5UVMnx3N8',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
          }),
          returnSecureToken: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
          setIsLoading(false);
          if (response.ok) {
            return response.json();
          } else {
            const data = response.json();
            return data.then((res) => {
              let errorMessage = 'failed to sign UP';
              console.log(res.error.message);
              if (res && res.error && res.error.message) {
                errorMessage = res.error.message;
                console.log(errorMessage);
                dispatch(uiActions.errorMessage({ message: errorMessage }));
                dispatch(uiActions.showToggle(true));
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((res) => {
          console.log(res);
          navigate('/Login', { replace: true });
        })
        .catch((err) => {
          console.log(errorMessage);
          console.log('catch block is working');
          dispatch(uiActions.showToggle(true));
          dispatch(uiActions.errorMessage({ message: err.message }));
        });
    } else {
      dispatch(uiActions.showToggle(true));
      dispatch(
        uiActions.errorMessage({
          message: 'Entered Passwords are not matching',
        })
      );
    }
  };
  return (
    <React.Fragment>
      <div className={styles.backgroundContainer}>
        <div className={styles.imageContainer}>
          <img
            src={Email}
            alt='emailPic'
            className={styles.bgImage}
          />
        </div>
        <Form
          className={styles.background}
          onSubmit={formSubmitHandler}>
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '2rem',
              color: 'white',
            }}>
            Sign Up
          </h2>
          <Form.Group
            className='mb-3'
            controlId='formBasicEmail'>
            <Form.Label className={styles.formLabel}>Email address</Form.Label>
            <Form.Control
              className={styles.formControl}
              type='email'
              placeholder='Enter email'
              ref={emailInputRef}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className={styles.formLabel}>Password</Form.Label>
            <Form.Control
              className={styles.formControl}
              type='password'
              placeholder='Password'
              ref={passInputRef}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className={styles.formLabel}>
              {' '}
              Confirm Password
            </Form.Label>
            <Form.Control
              className={styles.formControl}
              type='password'
              placeholder='Confirm Password'
              ref={confirmPasswordInputRef}
            />
          </Form.Group>
          {!isLoading && (
            <Button
              variant='dark'
              className={styles.Button}
              type='submit'>
              Submit
            </Button>
          )}
          {isLoading && <p style={{ color: 'white' }}>Loading...</p>}
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Button
              onClick={moveToLoginHandler}
              variant='dark'
              className={styles.Button}
              style={{ padding: '10px 80px ' }}
              type='submit'>
              Have an account? Login
            </Button>
          </div>
        </Form>
      </div>
      <ErrorModal />
    </React.Fragment>
  );
}

export default SignUp;
