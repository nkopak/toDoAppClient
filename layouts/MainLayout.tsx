import { makeStyles } from '@material-ui/core';
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const useStyles = makeStyles({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '98vh'
  },
  contentWrap: {
    flex: '1'
  }
});

const Layout = ({ children }: LayoutProps) => {
  const styles = useStyles();

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.contentWrap}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
