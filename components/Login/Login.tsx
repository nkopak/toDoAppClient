import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  TextField,
  Typography,
  Button,
  makeStyles,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { ToastContainer, toast } from 'react-toastify';
import signIn from '../../store/actions/loginActions';
import getTokenInfo from '../../store/actions/tokenInfoActions';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css';

const useStyles = makeStyles({
  textField: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block'
  },
  button: {
    width: '100%'
  }
});

export interface ILoginData {
  inputError: string;
  loginStatus: boolean | null;
  loading: boolean;
}

export interface IUserData {
  firstName: string;
}

const LoginComponent = ({
  loginData,
  userData
}: {
  loginData: ILoginData;
  userData: IUserData;
}) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();

  const { loading, inputError, loginStatus } = loginData;
  const { firstName } = userData;

  const [creds, setCreds] = useState({
    email: '',
    password: ''
  });

  const [firstRender, setFirstRender] = useState(true);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (!firstRender) {
      if (loginStatus) {
        toast.success(
          `Hello ${firstName}!
                 You successfully logged in :)`
        );

        setTimeout(() => {
          router.push(`/lists`);
        }, 1500);
      }
      if (inputError && !loginStatus) {
        toast.error('Invalid login or password :(');
      }
    }
    if (setFirstRender) {
      setFirstRender(false);
    }
  }, [flag]);

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <Typography data-testid="header" variant="h2" component="h1">
            Welcome!
          </Typography>
          <div className={styles.form}>
            <form
              onSubmit={handleSubmit(async () => {
                await dispatch(signIn(creds));
                await dispatch(getTokenInfo());

                if (!firstRender) {
                  if (!flag) {
                    setFlag(true);
                  } else {
                    setFlag(false);
                  }
                }
              })}
            >
              <Controller
                name="email"
                control={control}
                render={() => (
                  <TextField
                    className={classes.textField}
                    // data-testid="email"
                    id="email"
                    label="Email"
                    variant="outlined"
                    inputProps={{ 'data-testid': 'email' }}
                    onChange={(e) =>
                      setCreds({ ...creds, email: e.target.value })
                    }
                  />
                )}
              />

              <br />
              <Controller
                name="password"
                control={control}
                render={() => (
                  <TextField
                    className={classes.textField}
                    // data-testid="password"
                    id="password"
                    label="Password"
                    variant="outlined"
                    inputProps={{ 'data-testid': 'password' }}
                    // required
                    // error={!creds.password}
                    onChange={(e) =>
                      setCreds({ ...creds, password: e.target.value })
                    }
                  />
                )}
              />

              <br />
              <Tooltip
                title={
                  !creds.email || !creds.password
                    ? 'Fill all input fields'
                    : 'Sign In'
                }
              >
                <span>
                  <Button
                    className={classes.button}
                    data-testid="button"
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowRightIcon />}
                    disabled={loading || !creds.email || !creds.password}
                  >
                    {loading ? 'Wait' : 'Login'}
                  </Button>
                </span>
              </Tooltip>
            </form>
          </div>

          <div className={styles.register}>
            <Typography>Don`t have an account?</Typography>
            <Tooltip title="Proceed to register page">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/auth/register');
                }}
              >
                Sign Up
              </Button>
            </Tooltip>
          </div>

          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
          />
        </div>
      </div>
    </Container>
  );
};

LoginComponent.propTypes = {
  userData: PropTypes.shape({
    firstName: PropTypes.string
  }).isRequired,
  loginData: PropTypes.shape({
    inputError: PropTypes.string,
    loginStatus: PropTypes.bool,
    loading: PropTypes.bool
  }).isRequired
};

export default LoginComponent;
