import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  TextField,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { ToastContainer, toast } from 'react-toastify';
import signIn from '../../store/actions/loginActions';
import useTypedSelector from '../../hooks/useTypedSelector';
import getTokenInfo from '../../store/actions/tokenInfoActions';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  textField: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block'
  }
});

const Login = () => {
  const classes = useStyles();
  const router = useRouter();
  const { handleSubmit, control } = useForm();

  const dispatch = useDispatch();

  const { loginStatus, loading, inputError } = useTypedSelector(
    (state) => state.login
  );

  const { firstName } = useTypedSelector((state) => state.tokenInfo);
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
        }, 3000);
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
      <Typography variant="h2" component="h1">
        Login
      </Typography>
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
              id="email"
              label="Email"
              variant="outlined"
              onChange={(e) => setCreds({ ...creds, email: e.target.value })}
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
              id="password"
              label="Password"
              variant="outlined"
              // required
              // error={!creds.password}
              onChange={(e) => setCreds({ ...creds, password: e.target.value })}
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
          {loading ? 'Wait' : 'Login'}
        </Button>
      </form>
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
    </Container>
  );
};

export default Login;
