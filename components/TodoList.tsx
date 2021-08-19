import React, { useState } from 'react';
import { Container, Typography, Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Link from 'next/link';
import { IList } from '../types/list';
import { deleteList } from '../store/actions/listActions';
import useTypedSelector from '../hooks/useTypedSelector';
import UpdateListModal from './UpdateListModal';
import getListItems from '../store/actions/listItemActions';

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

const TodoList = ({ value }: { value: IList }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { token } = useTypedSelector((state) => state.tokenInfo);

  const [creds] = useState({
    userId: value.user_id,
    id: value.id,
    todoTitle: value.todoTitle,
    token
  });

  return (
    <Container className={styles.container}>
      <Typography
        variant="h5"
        onClick={() => {
          dispatch(getListItems(creds.userId, creds.id, token));
        }}
      >
        <Link href={`/lists/${value.id}/listItems`}>{value.todoTitle}</Link>
      </Typography>

      <UpdateListModal
        buttonTitle="Edit"
        modalTitle="Update list title"
        listData={value}
      />

      <Button
        variant="contained"
        className={styles.deleteBtn}
        endIcon={<DeleteForeverIcon />}
        onClick={() => dispatch(deleteList(creds))}
      >
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
