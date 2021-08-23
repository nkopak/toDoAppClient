import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core';
import wrapper from '../store';
import Layout from '../layouts/MainLayout';
import theme from '../styles/theme';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
);

export default wrapper.withRedux(WrappedApp);
