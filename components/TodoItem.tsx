import React, { useState } from 'react';
import {
  Container,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { IListItem } from '../types/listItem';
import getListItems, {
  deleteListItem,
  updateListItem
} from '../store/actions/listItemActions';
import useTypedSelector from '../hooks/useTypedSelector';
import UpdateListItemModal from './UpdateListItemModal';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  doneTitle: {
    textDecoration: 'line-through',
    color: '#DCDCDC'
  },
  deleteBtn: {
    // color: 'white',
    // backgroundColor: '#FE5F55',
    margin: '10px'
  },
  doneBtn: {
    // backgroundColor: '#50A562',
    margin: '10px'
  },
  btnDiv: {
    display: 'flex',
    alignItems: 'center'
  }
});

const TodoListItem = ({ value, done }: { value: IListItem; done: boolean }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { token } = useTypedSelector((state) => state.tokenInfo);

  const [creds] = useState({
    id: value.id,
    todoId: value.todoId,
    userId: value.userId,
    todoTitle: value.todoTitle,
    isCompleted: value.isCompleted,
    token
  });

  return (
    <Container className={styles.container}>
      <div className={styles.btnDiv}>
        {!done && (
          <IconButton className={styles.doneBtn}>
            <CheckBoxOutlineBlankIcon
              onClick={() => {
                console.log('Clicked');
                dispatch(updateListItem({ ...creds, isCompleted: true }));
                dispatch(getListItems(creds.userId, creds.todoId, token));
              }}
            />
          </IconButton>
        )}

        {done && (
          <IconButton className={styles.doneBtn}>
            <CheckBoxIcon
              onClick={() => {
                console.log('Clicked');

                dispatch(updateListItem({ ...creds, isCompleted: false }));
                dispatch(getListItems(creds.userId, creds.todoId, token));
              }}
            />
          </IconButton>
        )}

        <Typography
          variant="h4"
          className={value.isCompleted ? styles.doneTitle : ''}
        >
          {value.todoTitle}
        </Typography>
      </div>
      <div className={styles.btnDiv}>
        <UpdateListItemModal modalTitle="Edit todo item" listItemData={value} />

        <IconButton
          className={styles.deleteBtn}
          onClick={() => dispatch(deleteListItem(creds))}
        >
          <DeleteForeverIcon />
        </IconButton>
      </div>
    </Container>
  );
};

TodoListItem.propTypes = {
  value: PropTypes.shape({
    userId: PropTypes.string,
    todoId: PropTypes.string,
    id: PropTypes.string,
    todoTitle: PropTypes.string,
    isCompleted: PropTypes.bool
  }).isRequired,
  done: PropTypes.bool.isRequired
};

export default TodoListItem;
