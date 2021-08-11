import { Container, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { IList } from '../types/list';

const TodoList = ({ value }: { value: IList }) => (
  <Container>
    <Typography variant="h5">{value.todoTitle}</Typography>
  </Container>
);

TodoList.propTypes = {
  value: PropTypes.shape({ todoTitle: PropTypes.string }).isRequired
};

export default TodoList;
