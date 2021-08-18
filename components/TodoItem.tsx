import React, { useState } from 'react';
import { Container, Typography, makeStyles, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { IListItem } from '../types/listItem';
import { deleteListItem } from '../store/actions/listItemActions';
import useTypedSelector from '../hooks/useTypedSelector';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  updateBtn: {
    backgroundColor: '#EFB539',
    margin: '10px'
  },
  deleteBtn: {
    color: 'white',
    backgroundColor: '#FA4353 ',
    margin: '10px'
  }
});

const TodoListItem = ({ value }: { value: IListItem }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { token } = useTypedSelector((state) => state.tokenInfo);

  const [creds] = useState({
    userId: value.user_id,
    todoId: value.todo_id,
    itemId: value.id,
    token
  });

  return (
    <Container className={styles.container}>
      <Typography variant="h5">{value.todoTitle}</Typography>
      <Button
        variant="contained"
        className={styles.deleteBtn}
        endIcon={<DeleteForeverIcon />}
        onClick={() => dispatch(deleteListItem(creds))}
      >
        Delete
      </Button>
    </Container>
  );
};

TodoListItem.propTypes = {
  value: PropTypes.shape({
    user_id: PropTypes.string,
    todo_id: PropTypes.string,
    id: PropTypes.string,
    todoTitle: PropTypes.string
  }).isRequired
};

export default TodoListItem;
