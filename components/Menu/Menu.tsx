import { Button, Typography } from '@material-ui/core';
import React from 'react';
import Link from 'next/link';
import styles from './Menu.module.css';

const Menu = () => (
  <div className={styles.container}>
    {/* <div className={styles.footer} /> */}
    <div className={styles.linkContainer}>
      <Link href="/lists">
        <Button>
          <Typography variant="h4">Lists</Typography>
        </Button>
      </Link>

      <Link href="/info">
        <Button>
          <Typography variant="h4">User Info</Typography>
        </Button>
      </Link>
    </div>
  </div>
);

export default Menu;
