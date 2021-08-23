import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  TextField,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { ToastContainer, toast } from 'react-toastify';
import signUp from '../../store/actions/registerActions';
import useTypedSelector from '../../hooks/useTypedSelector';
import 'react-toastify/dist/ReactToastify.css';
import getTokenInfo from '../../store/actions/tokenInfoActions';

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10
  }
});

const Register: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleSubmit, control } = useForm();

  const { registerStatus, inputError, loading } = useTypedSelector(
    (state) => state.register
  );

  const { firstName } = useTypedSelector((state) => state.tokenInfo);
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
        <Typography variant="h2">Registration</Typography>
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
              onChange={(e) => {
                setCreds({ ...creds, password: e.target.value });
              }}
            />
          )}
        />

        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<ArrowRightIcon />}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Register'}
        </Button>
      </form>
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
    </Container>
  );
};

export default Register;
