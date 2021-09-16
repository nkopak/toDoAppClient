import { Button, Typography } from '@material-ui/core';
import React from 'react';
import Link from 'next/link';
import styles from './Menu.module.css';

const Menu = () => (
  <div className={styles.container}>
    {/* <div className={styles.footer} /> */}
    <div className={styles.linkContainer}>
      <div data-testid="listsLink">
        <Link prefetch href="/lists">
          <Button data-testid="listsButton">
            <Typography variant="h4" data-testid="listsHeader">
              Lists
            </Typography>
          </Button>
        </Link>
      </div>

      <Link href="/info">
        <Button data-testid="userInfoButton">
          <Typography variant="h4" data-testid="userInfoHeader">
            User Info
          </Typography>
        </Button>
      </Link>
    </div>
  </div>
);

export default Menu;
