import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import useTypedSelector from '../../hooks/useTypedSelector';
import getUser from '../../store/actions/userActions';
import styles from './userInfo.module.css';

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    marginBottom: 10
  }
});

const UserInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id, token } = useTypedSelector((state) => state.tokenInfo);
  const { firstName, lastName, email, password } = useTypedSelector(
    (state) => state.user
  );

  const [creds, setCreds] = useState({
    firstName,
    lastName,
    email,
    password
  });

  useEffect(() => {
    dispatch(getUser(id, token));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <form onSubmit={() => {}}>
          <TextField
            className={classes.field}
            id="firstNameInput"
            label="First Name"
            variant="outlined"
            required
            onChange={(e) => {
              setCreds({ ...creds, firstName: e.target.value });
            }}
            value={firstName}
          />

          <TextField
            className={classes.field}
            id="firstNameInput"
            label="Last Name"
            variant="outlined"
            required
            onChange={(e) => {
              setCreds({ ...creds, firstName: e.target.value });
            }}
            value={lastName}
          />

          <TextField
            className={classes.field}
            id="firstNameInput"
            label="Email"
            variant="outlined"
            required
            onChange={(e) => {
              setCreds({ ...creds, firstName: e.target.value });
            }}
            value={email}
          />

          <TextField
            className={classes.field}
            id="firstNameInput"
            label="Password"
            variant="outlined"
            required
            onChange={(e) => {
              setCreds({ ...creds, firstName: e.target.value });
            }}
            value={password}
          />
        </form>
      </div>
      <div>
        <Button>Delete</Button>
      </div>
    </div>
  );
};

export default UserInfo;
