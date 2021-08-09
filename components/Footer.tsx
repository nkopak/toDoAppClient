import { Container, Typography } from '@material-ui/core';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => (
  <Container
    style={{
      backgroundColor: '#556cd6',
      position: 'absolute',
      bottom: 0,
      width: '100vw'
    }}
  >
    <Typography>To Do App</Typography>
  </Container>
);

export default Footer;
