import React, { FC } from 'react';
import { AppProps } from 'next/app';
import wrapper from '../store';
import Layout from '../layouts/MainLayout';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default wrapper.withRedux(WrappedApp);
