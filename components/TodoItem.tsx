import React from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { IListItem } from '../types/listItem';

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

  return (
    <Container className={styles.container}>
      <Typography variant="h5">{value.todoTitle}</Typography>
    </Container>
  );
};

TodoListItem.propTypes = {
  value: PropTypes.shape({
    user_id: PropTypes.string,
    id: PropTypes.string,
    todoTitle: PropTypes.string
  }).isRequired
};

export default TodoListItem;
