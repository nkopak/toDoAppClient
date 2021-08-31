import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import useTypedSelector from '../../hooks/useTypedSelector';
import getUser, { updateUser } from '../../store/actions/userActions';
import styles from './userInfo.module.css';

const useStyles = makeStyles({
  field: {
    margin: 10
  }
});

const UserInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id, token, role } = useTypedSelector((state) => state.tokenInfo);
  const { firstName, lastName, email, password, loading } = useTypedSelector(
    (state) => state.user
  );

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(getUser(id, token));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div>
          <Typography>First name: {firstName}</Typography>
        </div>

        <div>
          <Typography>Last name: {lastName}</Typography>
        </div>

        <div>
          <Typography>Email: {email}</Typography>
        </div>

        <Button
          onClick={() => {
            setOpen(!open);
            setUserInfo({ ...userInfo, firstName, lastName, email, password });
          }}
        >
          Edit Info
        </Button>

        {open && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(updateUser(userInfo, role, token));
            }}
          >
            <TextField
              className={classes.field}
              id="firstNameInput"
              label="First Name"
              variant="outlined"
              required
              value={userInfo.firstName}
              onChange={(e) => {
                setUserInfo({ ...userInfo, firstName: e.target.value });
              }}
            />

            <TextField
              className={classes.field}
              id="lastNameInput"
              label="Last Name"
              variant="outlined"
              required
              value={userInfo.lastName}
              onChange={(e) => {
                setUserInfo({ ...userInfo, lastName: e.target.value });
              }}
            />

            <TextField
              className={classes.field}
              id="emailInput"
              label="Email"
              variant="outlined"
              required
              value={userInfo.email}
              onChange={(e) => {
                setUserInfo({ ...userInfo, email: e.target.value });
              }}
            />

            <TextField
              className={classes.field}
              id="passwordInput"
              label="Password"
              variant="outlined"
              required
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
              // value={password}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<ArrowRightIcon />}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Update'}
            </Button>
          </form>
        )}
      </div>

      <div>
        <Button>Delete Account</Button>
      </div>
    </div>
  );
};

export default UserInfo;
