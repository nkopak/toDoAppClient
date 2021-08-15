import React, { useState } from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { IList } from '../types/list';
import { deleteList } from '../store/actions/listActions';
import useTypedSelector from '../hooks/useTypedSelector';

const TodoList = ({ value }: { value: IList }) => {
  const dispatch = useDispatch();

  const { token } = useTypedSelector((state) => state.tokenInfo);

  const [creds] = useState({
    userId: value.user_id,
    id: value.id,
    todoTitle: value.todoTitle,
    token
  });

  return (
    <Container>
      <Typography variant="h5">{value.todoTitle}</Typography>
      <Button color="secondary" onClick={() => dispatch(deleteList(creds))}>
        Delete
      </Button>
    </Container>
  );
};

TodoList.propTypes = {
  value: PropTypes.shape({
    user_id: PropTypes.string,
    id: PropTypes.string,
    todoTitle: PropTypes.string
  }).isRequired
};

export default TodoList;
