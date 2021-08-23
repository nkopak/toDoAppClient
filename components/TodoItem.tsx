import React, { useState } from 'react';
import {
  Container,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { IListItem } from '../types/listItem';
import { deleteListItem } from '../store/actions/listItemActions';
import useTypedSelector from '../hooks/useTypedSelector';
import UpdateListItemModal from './UpdateListItemModal';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  deleteBtn: {
    color: 'white',
    backgroundColor: '#FE5F55',
    margin: '10px'
  },
  btnDiv: {
    display: 'flex',
    alignItems: 'center'
  }
});

const TodoListItem = ({ value }: { value: IListItem }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { token } = useTypedSelector((state) => state.tokenInfo);

  const [creds] = useState({
    userId: value.user_id,
    todoId: value.todo_id,
    id: value.id,
    token
  });

  return (
    <Container className={styles.container}>
      <Typography variant="h5">{value.todoTitle}</Typography>
      <div className={styles.btnDiv}>
        <UpdateListItemModal modalTitle="Edit todo item" listItemData={value} />

        <IconButton
          className={styles.deleteBtn}
          onClick={() => dispatch(deleteListItem(creds))}
        >
          <HighlightOffIcon />
        </IconButton>
      </div>
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
