import React from 'react';
import styles from './Loader.module.css';

const Container = () => (
  <div className={styles.spinner}>
    <div className={styles.ldio}>
      <div />
      <div />
    </div>
  </div>
);
export default Container;
