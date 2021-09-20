import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Container,
  Tooltip
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
// import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import getUser, {
  deleteUser,
  updateUser
} from '../../store/actions/userActions';
import { signout } from '../../store/actions/loginActions';
import { deleteTokenInfo } from '../../store/actions/tokenInfoActions';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  field: {
    margin: 15
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    width: '50%',
    height: 'fit-content',
    left: '50%',
    top: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    // backgroundColor: '#e3f2fd',
    borderRadius: '30px',
    border: '5px solid #2196f3'
  },
  info: {
    margin: 10
  },
  infoField: {
    margin: 10
  },
  formContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 15
  },
  button: {
    margin: 10
  },
  deleteButton: {
    margin: 10,
    '&:hover': {
      color: '#FF0000'
    }
  },
  span: {
    color: '#808080',
    margin: '0 20px'
  }
});

interface ITokenData {
  id: string;
  token: string;
  role: string;
}

interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loading: boolean;
}

const UserInfoComponent = ({
  tokenData,
  userData
}: {
  tokenData: ITokenData;
  userData: IUserData;
}) => {
  const styles = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const { id, token, role } = tokenData;
  const { firstName, lastName, email, loading } = userData;

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
    <>
      <Container className={styles.container}>
        <Container className={styles.info}>
          <Container>
            <Typography variant="h5" className={styles.infoField}>
              First name: <span className={styles.span}>{firstName}</span>
            </Typography>
          </Container>

          <Container>
            <Typography variant="h5" className={styles.infoField}>
              Last name: <span className={styles.span}>{lastName}</span>
            </Typography>
          </Container>

          <Container>
            <Typography variant="h5" className={styles.infoField}>
              Email: <span className={styles.span}>{email}</span>
            </Typography>
          </Container>
        </Container>

        <Button
          className={styles.button}
          endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => {
            setOpen(!open);
            setUserInfo({
              ...userInfo,
              firstName,
              lastName,
              email
            });
          }}
        >
          Edit Info
        </Button>

        {open && (
          <Container className={styles.formContainer}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(updateUser(userInfo, role, token));
              }}
            >
              <TextField
                className={styles.field}
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
                className={styles.field}
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
                className={styles.field}
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
                className={styles.field}
                id="passwordInput"
                label="New Password"
                variant="outlined"
                required
                onChange={(e) => {
                  setUserInfo({ ...userInfo, password: e.target.value });
                }}
                value={userInfo.password}
              />
              <Tooltip
                title={
                  !userInfo.firstName ||
                  !userInfo.lastName ||
                  !userInfo.email ||
                  !userInfo.password
                    ? 'Fill all input fields'
                    : 'Update info'
                }
              >
                <span>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowRightIcon />}
                    disabled={!userInfo.password}
                    onClick={() => {
                      toast.success(`Your was successfully updated`);
                      setUserInfo({
                        ...userInfo,
                        password: ''
                      });
                    }}
                  >
                    {loading ? 'Loading...' : 'Update'}
                  </Button>
                </span>
              </Tooltip>
            </form>
          </Container>
        )}

        <Button
          className={styles.deleteButton}
          onClick={() => {
            dispatch(deleteUser(id, token));
            dispatch(signout());
            dispatch(deleteTokenInfo());
            router.push('/auth/login');
          }}
        >
          Delete Account
        </Button>
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default UserInfoComponent;
