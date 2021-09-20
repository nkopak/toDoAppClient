import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  TextField,
  Typography,
  Button,
  makeStyles,
  Tooltip
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import signUp from '../../store/actions/registerActions';
// import 'react-toastify/dist/ReactToastify.css';
import getTokenInfo from '../../store/actions/tokenInfoActions';
import styles from './Register.module.css';

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    width: '100%'
  }
});

export interface IRegisterData {
  registerStatus: boolean;
  inputError: string;
  loading: boolean;
}

export interface IUserData {
  firstName: string;
}

const RegisterComponent = ({
  registerData,
  userData
}: {
  registerData: IRegisterData;
  userData: IUserData;
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleSubmit, control } = useForm();

  const { registerStatus, inputError, loading } = registerData;
  const { firstName } = userData;

  const [creds, setCreds] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [firstRender, setFirstRender] = useState(true);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (!firstRender) {
      if (registerStatus) {
        toast.success(
          `Hello ${firstName}!
                 You successfully registered :)`
        );
        setTimeout(() => {
          router.push(`/lists`);
        }, 3000);
      }
      if (inputError && !registerStatus) {
        toast.error('Invalid register info :(');
      }
    }
    if (setFirstRender) {
      setFirstRender(false);
    }
  }, [flag]);

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.registerBox}>
          <Typography variant="h2">Registration</Typography>
          <div className={styles.form}>
            <form
              onSubmit={handleSubmit(async () => {
                await dispatch(signUp(creds));
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
                name="firstName"
                control={control}
                render={() => (
                  <TextField
                    className={classes.field}
                    id="firstNameInput"
                    label="First Name"
                    variant="outlined"
                    required
                    // error={inputError}
                    inputProps={{ 'data-testid': 'firstNameInput' }}
                    onChange={(e) => {
                      setCreds({ ...creds, firstName: e.target.value });
                    }}
                  />
                )}
              />

              <br />
              <Controller
                name="lastName"
                control={control}
                render={() => (
                  <TextField
                    className={classes.field}
                    id="lastNameInput"
                    label="Last Name"
                    variant="outlined"
                    required
                    // error={inputError}
                    inputProps={{ 'data-testid': 'lastNameInput' }}
                    onChange={(e) => {
                      setCreds({ ...creds, lastName: e.target.value });
                    }}
                  />
                )}
              />

              <br />

              <Controller
                name="email"
                control={control}
                render={() => (
                  <TextField
                    className={classes.field}
                    id="emailInput"
                    label="Email"
                    variant="outlined"
                    required
                    // error={inputError}
                    inputProps={{ 'data-testid': 'emailInput' }}
                    onChange={(e) => {
                      setCreds({ ...creds, email: e.target.value });
                    }}
                  />
                )}
              />

              <br />
              <Controller
                name="password"
                control={control}
                render={() => (
                  <TextField
                    className={classes.field}
                    id="passwordInput"
                    label="Password"
                    variant="outlined"
                    required
                    // error={inputError}
                    inputProps={{ 'data-testid': 'passwordInput' }}
                    onChange={(e) => {
                      setCreds({ ...creds, password: e.target.value });
                    }}
                  />
                )}
              />

              <br />
              <Tooltip
                title={
                  !creds.email || !creds.password
                    ? 'Fill all input fields'
                    : 'Sign Up'
                }
              >
                <span>
                  <Button
                    className={classes.button}
                    data-testid="submitButton"
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowRightIcon />}
                    disabled={
                      loading ||
                      !creds.firstName ||
                      !creds.lastName ||
                      !creds.email ||
                      !creds.password
                    }
                  >
                    {loading ? 'Loading...' : 'Register'}
                  </Button>
                </span>
              </Tooltip>
            </form>
          </div>

          <div className={styles.login}>
            <Typography>Already registered?</Typography>
            <Tooltip title="Proceed to register page">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/auth/login');
                }}
              >
                Sign In
              </Button>
            </Tooltip>
          </div>

          <ToastContainer
            position="top-right"
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

RegisterComponent.propTypes = {
  userData: PropTypes.shape({
    firstName: PropTypes.string
  }).isRequired,
  registerData: PropTypes.shape({
    registerStatus: PropTypes.bool,
    inputError: PropTypes.string,
    loading: PropTypes.bool
  }).isRequired
};

export default RegisterComponent;
