import { useState } from 'react';
import Axios from 'axios';
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
    marginBottom: 10
  }
});

export default function Register() {
  const classes = useStyles();

  const [firstNameReg, setFirstNameReg] = useState('');
  const [lastNameReg, setLastNameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [inputError, setInputError] = useState(false);

  const register = (e: any) => {
    e.preventDefault();

    setInputError(false);

    if (
      firstNameReg === '' ||
      lastNameReg === '' ||
      emailReg === '' ||
      passwordReg === ''
    ) {
      setInputError(true);
    }

    Axios.post('http://localhost:5000/auth/register', {
      firstName: firstNameReg,
      lastName: lastNameReg,
      email: emailReg,
      password: passwordReg
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <Container>
      <form>
        <Typography variant="h2">Registration</Typography>
        <TextField
          className={classes.field}
          id="firstNameInput"
          label="First Name"
          variant="outlined"
          required
          error={inputError}
          onChange={(e) => {
            setFirstNameReg(e.target.value);
          }}
        />
        <br />
        <TextField
          className={classes.field}
          id="firstNameInput"
          label="Last Name"
          variant="outlined"
          required
          error={inputError}
          onChange={(e) => {
            setLastNameReg(e.target.value);
          }}
        />
        <br />
        <TextField
          className={classes.field}
          id="firstNameInput"
          label="Email"
          variant="outlined"
          required
          error={inputError}
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <br />
        <TextField
          className={classes.field}
          id="firstNameInput"
          label="Password"
          variant="outlined"
          required
          error={inputError}
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <br />
        {/* <button type="submit" onClick={register}>
          Register
        </button> */}
        <Button
          type="submit"
          onClick={register}
          variant="contained"
          color="primary"
          endIcon={<ArrowRightIcon />}
        >
          Register
        </Button>
      </form>
    </Container>
  );
}
