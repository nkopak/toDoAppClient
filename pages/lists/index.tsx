import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { Container, Typography } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import useTypedSelector from '../../hooks/useTypedSelector';
import getLists from '../../store/actions/listActions';
import authService from '../../services/authService';
import TodoList from '../../components/TodoList';
import CreateListModal from '../../components/CreateListModal';
import { ITokenInfo } from '../../types/login';
import getTokenInfo from '../../store/actions/tokenInfoActions';

let tokenInfo: ITokenInfo;
let token: string | null | undefined;

const Lists = () => {
  const dispatch = useDispatch();
  // const { id, firstName } = useTypedSelector((state) => state.tokenInfo);
  const { lists } = useTypedSelector((state) => state.list);

  useEffect(() => {
    async function fetchData() {
      await dispatch(getTokenInfo());

      token = authService.getToken();

      if (typeof token === 'string') {
        tokenInfo = jwtDecode(token);
        await dispatch(getLists(tokenInfo.id, token));
      }

      // if (typeof token === 'string') {
      //   tokenInfo = jwtDecode(token);
      //   await dispatch(getLists(tokenInfo.id, token));
      // }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h2" component="h1" align="center">
        User Lists
      </Typography>
      <hr />
      {typeof token === 'string' && (
        <CreateListModal
          buttonTitle="Create To Do List"
          modalTitle="Create list title"
          // token={token}
          // tokenInfo={tokenInfo}
        />
      )}
      {/* <Button>Create To Do List</Button> */}
      {lists &&
        // eslint-disable-next-line react/no-array-index-key
        lists.map((item, index) => <TodoList key={index} value={item} />)}
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
