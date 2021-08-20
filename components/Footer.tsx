import {
  Container,
  Typography,
  Toolbar,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      left: '0',
      bottom: '0',
      width: '100%',
      color: 'white',
      backgroundColor: theme.palette.primary.main
    },
    displayCenter: {
      display: 'flex',
      justifyContent: 'center'
    },
    githubIcon: {
      margin: '10px',
      fontSize: '30px'
    },
    link: {
      color: 'inherit'
    }
  })
);

const Footer = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Container maxWidth="md">
        <Toolbar className={styles.displayCenter}>
          <Typography variant="body1" color="inherit">
            To Do App
          </Typography>
          <a
            href="https://github.com/nkopak/toDoAppClient"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            <GitHubIcon className={styles.githubIcon} />
          </a>
        </Toolbar>
      </Container>
    </div>
  );
};

export default Footer;
