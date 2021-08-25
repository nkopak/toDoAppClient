import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Breadcrumbs,
  Link,
  makeStyles
} from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../../../hooks/useTypedSelector';
import TodoItem from '../../../../components/TodoItem';
import { IListItem } from '../../../../types/listItem';
import CreateListItemModal from '../../../../components/CreateListItemModal';
import getListItems, {
  setTodoId
} from '../../../../store/actions/listItemActions';

const useStyles = makeStyles({
  breadcrumps: {
    backgroundColor: '#E3F2FD'
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

    async function fetchData() {
      if (typeof todoId === 'string') {
        await dispatch(getListItems(id, todoId, token));
        await dispatch(setTodoId(todoId));
      }
    }
    fetchData();
  }, [router.isReady]);

  // console.log(router.asPath);

  return (
    <Container>
      <Typography variant="h2" component="h1" align="center">
        {router.query.todoTitle}
      </Typography>
      <hr />
      <Container className={styles.breadcrumps}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Main
          </Link>
          <Link color="inherit" href="/lists">
            Lists
          </Link>
          <Link
            color="textPrimary"
            href={`${router.asPath}`}
            aria-current="page"
          >
            {router.query.todoTitle}
          </Link>
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

      {doneListItems && (
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
