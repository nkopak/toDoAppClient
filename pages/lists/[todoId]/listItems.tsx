import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../../hooks/useTypedSelector';
import TodoItem from '../../../components/TodoItem';
import { IListItem } from '../../../types/listItem';
import CreateListItemModal from '../../../components/CreateListItemModal';
import getListItems, {
  setTodoId
} from '../../../store/actions/listItemActions';

const ListItems = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { listItems } = useTypedSelector((state) => state.listItem);
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

  return (
    <Container>
      <Typography variant="h2" component="h1" align="center">
        List Title
      </Typography>
      <hr />
      {router.isReady && (
        <CreateListItemModal
          buttonTitle="Add todo item"
          modalTitle="Create new todo item"
        />
      )}

      {listItems &&
        listItems.map((item: IListItem) => (
          <TodoItem key={item.id} value={item} />
        ))}

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
