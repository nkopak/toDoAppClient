import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { Container, Typography } from '@material-ui/core';
import useTypedSelector from '../../hooks/useTypedSelector';
import getLists from '../../store/actions/listActions';
import authService from '../../services/authService';
import TodoList from '../../components/TodoList';

interface TokenInfo {
  id: string;
  firstName: string;
}

let tokenInfo: TokenInfo;
let token: string | null | undefined;

const Lists = () => {
  const dispatch = useDispatch();
  const { lists } = useTypedSelector((state) => state.list);

  useEffect(() => {
    token = authService.getToken();

    async function fetchData() {
      if (typeof token === 'string') {
        tokenInfo = jwtDecode(token);
        dispatch(getLists(tokenInfo.id, token));
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h2" component="h1" align="center">
        User Lists
      </Typography>
      <hr />
      {lists &&
        lists.map((item) => <TodoList key={item.listId} value={item} />)}
    </Container>
  );
};

export default Lists;
