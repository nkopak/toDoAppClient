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
import { ITokenInfo } from '../../types/login';
import getTokenInfo from '../../store/actions/tokenInfoActions';

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block'
  }
});

const Login = () => {
  const classes = useStyles();
  const router = useRouter();

  const dispatch = useDispatch();

  const { loginStatus, loading, token } = useTypedSelector(
    (state) => state.login
  );
  const [creds, setCreds] = useState({
    email: '',
    password: ''
  });

  let tokenInfo: ITokenInfo;

  return (
    <Container>
      <Typography variant="h2" component="h1">
        Login
      </Typography>
      <form
        onSubmit={async (e: FormEvent) => {
          e.preventDefault();
          // debugger;
          await dispatch(signIn(creds)); // --------------->asynchronous
          // -------------------->synchronous
          // debugger;
          if (token) {
            tokenInfo = jwtDecode(token);
            if (loginStatus) {
              dispatch(getTokenInfo());
              toast.success(
                `Hello ${tokenInfo.firstName}!
                 You successfully logged in :)`
              );
              setTimeout(() => {
                router.push(`/lists`);
              }, 3000);
            }
          }
          // debugger;
          if (!loginStatus) {
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
