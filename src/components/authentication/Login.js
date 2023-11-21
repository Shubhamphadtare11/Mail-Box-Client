import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Auth.module.css';
import { useNavigate } from 'react-router';
import { uiActions } from '../../Redux-Store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../Redux-Store/auth-slice';
import ErrorModal from '../UI/ErrorModal';
import Email from '../../EmailIcon/mailImage.jpg';
const Login = () => {
  const navigate = useNavigate();

  const moveToSignUpHandler = () => {
    navigate('/signUp');
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  console.log(isLoggedIn);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDlXgEK5KuClR6s4quTaWEDTD5UVMnx3N8',
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
          return response.json().then((response) => {
            let errorMessage = 'Login Failed';
            if (response && response.error && response.error.message) {
              errorMessage = response.error.message;
            }
            dispatch(uiActions.errorMessage({ message: errorMessage }));
            dispatch(uiActions.showToggle(true));

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        dispatch(authAction.login({ idToken: data.idToken }));

        dispatch(authAction.authorEmail({ email: enteredEmail }));
        navigate('/Home/compose', { replace: true });
      })
      .catch((err) => {
        dispatch(uiActions.showToggle(true));
        dispatch(uiActions.errorMessage({ message: err.message }));
      });
  };
  return (
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
          style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
          Login
        </h2>
        <Form.Group
          className='mb-3'
          controlId='formBasicEmail'>
          <Form.Label className={styles.formLabel}>Email address</Form.Label>
          <Form.Control
            className={styles.formControl}
            type='email'
            placeholder='Enter email'
            onChange={(e) => {
              setEnteredEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group
          className='mb-3'
          controlId='formBasicPassword'>
          <Form.Label className={styles.formLabel}>Password</Form.Label>
          <Form.Control
            className={styles.formControl}
            type='password'
            placeholder='Password'
            onChange={(e) => {
              setEnteredPassword(e.target.value);
            }}
          />
        </Form.Group>
        {!isLoading && (
          <Button
            className={styles.Button}
            type='submit'>
            Submit
          </Button>
        )}
        {isLoading && <p style={{ color: 'white' }}>Loading...</p>}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Button
            onClick={moveToSignUpHandler}
            className={styles.Button}
            style={{ padding: '10px 80px ' }}
            type='submit'>
            Dont Have an account? SignUp
          </Button>
        </div>
      </Form>
      <ErrorModal />
    </div>
  );
};

export default Login;
