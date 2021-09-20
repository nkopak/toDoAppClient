import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Breadcrumbs,
  // Link,
  makeStyles
  // CircularProgress
} from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../../../hooks/useTypedSelector';
import TodoItem from '../../../../components/TodoItem';
import { IListItem } from '../../../../types/listItem';
import CreateListItemModal from '../../../../components/CreateListItemModal';
import getListItems from '../../../../store/actions/listItemActions';
// import Loader from '../../../../components/Loader/Loader';

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

const ListItems = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const styles = useStyles();

  const { listItems } = useTypedSelector((state) => state.listItem);
  const { doneListItems } = useTypedSelector((state) => state.listItem);
  const { id, token } = useTypedSelector((state) => state.tokenInfo);

  useEffect(() => {
    if (!router.isReady) return;

    const { todoId } = router.query;

    if (typeof todoId === 'string') {
      dispatch(getListItems(id, todoId, token));
      // dispatch(setTodoId(todoId));
    }
  }, [router.isReady]);

  return (
    <Container>
      {/* {loading && <Loader />} */}

      <Typography variant="h2" component="h1" align="center">
        {router.query.todoTitle}
      </Typography>
      <hr />
      <Container className={styles.breadcrumps}>
        <Breadcrumbs aria-label="breadcrumb">
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
            className={styles.myTextStyle}
            onClick={(e) => {
              e.preventDefault();
              router.push('/lists');
            }}
          >
            Lists
          </Typography>
          <Typography
            className={styles.activeLink}
            onClick={(e) => {
              e.preventDefault();
              router.push(`${router.asPath}`);
            }}
          >
            {router.query.todoTitle}
          </Typography>
        </Breadcrumbs>
      </Container>

      {router.isReady && (
        <CreateListItemModal
          buttonTitle="Add todo item"
          modalTitle="Create new todo item"
        />
      )}

      {listItems &&
        listItems.map((item: IListItem) => (
          <TodoItem key={item.id} value={item} done={false} />
        ))}

      {doneListItems.length > 0 && (
        <div>
          <h2>Finished tasks</h2>
          {doneListItems.map((item) => (
            <TodoItem key={item.id} value={item} done />
          ))}
        </div>
      )}

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

export default ListItems;
