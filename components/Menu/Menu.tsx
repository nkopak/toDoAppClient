import { Button, makeStyles, Typography, Container } from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';
import Link from 'next/link';
// import styles from './Menu.module.css';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    width: '30%',
    height: '40%',
    left: '50%',
    top: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '5px solid #2196f3',
    borderRadius: '30px'
  },
  linkContainer: {
    margin: '20px 0',
    padding: '0',
    display: 'flex',
    flexDirection: 'column'
  },
  linkItem: {
    margin: '20px 0'
  }
});

const Menu = () => {
  const styles = useStyles();

  return (
    <Container className={styles.container}>
      <Typography variant="h3">Menu</Typography>

      <Container className={styles.linkContainer}>
        <Container data-testid="listsLink" className={styles.linkItem}>
          <Link href="/lists">
            <Button
              data-testid="listsButton"
              endIcon={<FormatListBulletedIcon />}
            >
              <Typography variant="h4" data-testid="listsHeader">
                Go to Lists
              </Typography>
            </Button>
          </Link>
        </Container>

        <Container className={styles.linkItem}>
          <Link href="/info">
            <Button data-testid="userInfoButton" endIcon={<InfoIcon />}>
              <Typography variant="h4" data-testid="userInfoHeader">
                User Info
              </Typography>
            </Button>
          </Link>
        </Container>
      </Container>
    </Container>
  );
};

export default Menu;
