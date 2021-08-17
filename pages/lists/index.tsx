import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import useTypedSelector from '../../hooks/useTypedSelector';
import getLists from '../../store/actions/listActions';
import TodoList from '../../components/TodoList';
import CreateListModal from '../../components/CreateListModal';

const Lists = () => {
  const dispatch = useDispatch();
  const { id, token } = useTypedSelector((state) => state.tokenInfo);
  const { lists } = useTypedSelector((state) => state.list);

  useEffect(() => {
    async function fetchData() {
      await dispatch(getLists(id, token));
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h2" component="h1" align="center">
        User Lists
      </Typography>
      <hr />
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
