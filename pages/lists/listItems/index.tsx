import React, { useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import useTypedSelector from '../../../hooks/useTypedSelector';
import TodoItem from '../../../components/TodoItem';
import { IListItem } from '../../../types/listItem';

const ListItems = () => {
  const { listItems } = useTypedSelector((state) => state.listItem);

  useEffect(() => {
    // dispatch(getLists(id, token));
    // console.log(router);
  }, []);

  return (
    <Container>
      <Typography variant="h2" component="h1" align="center">
        List Title
      </Typography>
      <hr />

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
