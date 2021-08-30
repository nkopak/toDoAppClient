import React, { FC, useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core';
import { useRouter } from 'next/router';
import wrapper from '../store';
import Layout from '../layouts/MainLayout';
import theme from '../styles/theme';
import Loader from '../components/Loader/Loader';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <Layout>{pageLoading ? <Loader /> : <Component {...pageProps} />}</Layout>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(WrappedApp);
