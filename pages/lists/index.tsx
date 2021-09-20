import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  // Link,
  Breadcrumbs,
  makeStyles
} from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import router from 'next/router';
import useTypedSelector from '../../hooks/useTypedSelector';
import getLists from '../../store/actions/listActions';
import TodoList from '../../components/TodoList';
import CreateListModal from '../../components/CreateListModal';

const useStyles = makeStyles({
  breadcrumps: {
    backgroundColor: '#E3F2FD'
  },
  myTextStyle: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  activeLink: {
    color: '#000',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  }
});

const Lists = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { id, firstName, token } = useTypedSelector((state) => state.tokenInfo);
  const { lists } = useTypedSelector((state) => state.list);

  useEffect(() => {
    dispatch(getLists(id, token));
  }, []);

  return (
    <Container>
      <Typography variant="h2" component="h1" align="center">
        {firstName} Lists
      </Typography>
      <hr />
      <Container className={styles.breadcrumps}>
        <Breadcrumbs aria-label="breadcrumb">
          {/* <Link color="inherit" href="/">
            Main
          </Link> */}
          <Typography
            className={styles.myTextStyle}
            onClick={(e) => {
              e.preventDefault();
              router.push('/');
            }}
          >
            Main
          </Typography>
          <Typography
            className={styles.activeLink}
            onClick={(e) => {
              e.preventDefault();
              router.push('/lists');
            }}
          >
            Lists
          </Typography>
        </Breadcrumbs>
      </Container>

      {token && (
        <CreateListModal
          buttonTitle="Create To Do List"
          modalTitle="Create list title"
        />
      )}

      {lists && lists.map((item) => <TodoList key={item.id} value={item} />)}

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

export default Lists;
