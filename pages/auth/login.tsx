import React, { useState, FormEvent } from 'react';
import {
  Container,
  TextField,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import signIn from '../../store/actions/loginActions';
import useTypedSelector from '../../hooks/useTypedSelector';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block'
  }
});

interface TokenInfo {
  id: string;
  firstName: string;
}

const Login = () => {
  const classes = useStyles();
  const router = useRouter();

  const dispatch = useDispatch();

  const login = useTypedSelector((state) => state.login);
  const [creds, setCreds] = useState({
    email: '',
    password: ''
  });

  let tokenInfo: TokenInfo;

  return (
    <Container>
      <Typography variant="h2" component="h1">
        Login
      </Typography>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          dispatch(signIn(creds));

          if (login.token) {
            tokenInfo = jwtDecode(login.token);
            if (login.loginStatus) {
              toast.success(
                `Hello ${tokenInfo.firstName}!
                 You successfully logged in :)`
              );
              setTimeout(() => {
                router.push(`/user`);
              }, 3000);
            }
          }
          if (!login.loginStatus) {
            toast.error('Invalid login or password :(');
          }
        }}
      >
        <TextField
          className={classes.field}
          id="email"
          label="Email"
          variant="outlined"
          // required
          // error={!creds.email}
          onChange={(e) => setCreds({ ...creds, email: e.target.value })}
        />
        <br />
        <TextField
          className={classes.field}
          id="password"
          label="Password"
          variant="outlined"
          // required
          // error={!creds.password}
          onChange={(e) => setCreds({ ...creds, password: e.target.value })}
        />
        <br />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<ArrowRightIcon />}
          disabled={login.loading}
        >
          {login.loading ? 'Wait' : 'Login'}
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
