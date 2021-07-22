import Axios from 'axios';
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Typography,
  Button,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block'
  }
});

export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [inputError, setInputError] = useState(false);

  const login = (e: any) => {
    e.preventDefault();

    setInputError(false);

    if (email === '' || password === '') {
      setInputError(true);
    }

    Axios.post('http://localhost:5000/auth/login', { email, password }).then(
      (response) => {
        if (!response.data.auth) {
          setLoginStatus(false);
        } else {
          localStorage.setItem('token', response.data.tokens.access_token);
          setLoginStatus(true);
          //   setLoginStatus(response.data.userByEmail[0].firstName);
        }
      }
    );
  };

  return (
    <Container>
      <Typography variant="h2" component="h1">
        Login
      </Typography>
      <form>
        <TextField
          className={classes.field}
          id="email"
          label="Email"
          variant="outlined"
          required
          error={inputError}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <TextField
          className={classes.field}
          id="password"
          label="Password"
          variant="outlined"
          required
          error={inputError}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />

        <Button
          type="submit"
          onClick={login}
          variant="contained"
          color="primary"
          endIcon={<ArrowRightIcon />}
        >
          Login
        </Button>
      </form>
      <div>
        {loginStatus && (
          <Typography variant="h4">You successfully logged in.</Typography>
        )}
        {!loginStatus && (
          <Typography variant="h4">Incorrect email or password.</Typography>
        )}
      </div>
    </Container>
  );
}
