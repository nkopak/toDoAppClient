import React, { useState } from 'react';
import {
  Container,
  Typography,
  makeStyles,
  IconButton,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Link from 'next/link';
import { IList } from '../types/list';
import { deleteList } from '../store/actions/listActions';
import useTypedSelector from '../hooks/useTypedSelector';
import UpdateListModal from './UpdateListModal';
import getListItems from '../store/actions/listItemActions';

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

const TodoList = ({ value }: { value: IList }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { token } = useTypedSelector((state) => state.tokenInfo);

  const [creds] = useState({
    userId: value.userId,
    id: value.id,
    todoTitle: value.todoTitle,
    token
  });

  return (
    <Container className={styles.container}>
      <Link href={`/lists/${value.id}/${value.todoTitle}/listItems`}>
        <Button
          color="primary"
          style={{ textTransform: 'none' }}
          onClick={() => {
            dispatch(getListItems(creds.userId, creds.id, token));
          }}
        >
          <Typography
            variant="h4"
            onClick={() => {
              dispatch(getListItems(creds.userId, creds.id, token));
            }}
          >
            {value.todoTitle}
          </Typography>
        </Button>
      </Link>
      <div className={styles.btnDiv}>
        <UpdateListModal
          // buttonTitle="Edit"
          modalTitle="Update list title"
          listData={value}
        />

        <IconButton
          className={styles.deleteBtn}
          color="secondary"
          onClick={() => dispatch(deleteList(creds))}
        >
          <HighlightOffIcon />
        </IconButton>
      </div>
    </Container>
  );
};

TodoList.propTypes = {
  value: PropTypes.shape({
    userId: PropTypes.string,
    id: PropTypes.string,
    todoTitle: PropTypes.string
  }).isRequired
};

export default TodoList;
