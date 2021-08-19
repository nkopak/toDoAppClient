import React, { useState } from 'react';
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

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10
  }
});

const Register: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();

  const register = useTypedSelector((state) => state.register);

  // const register = useTypedSelector((state) => state.register);
  const [creds, setCreds] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  return (
    <Container>
      <form
        onSubmit={handleSubmit(async () => {
          // e.preventDefault();
          dispatch(signUp(creds));
          // console.log(register);

          if (register.registerStatus) {
            toast.success('You registered successfully!');
          }
          if (register.inputError) {
            toast.error(register.inputError);
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
          disabled={register.loading}
        >
          {register.loading ? 'Loading...' : 'Register'}
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
