import { configureStore } from '@reduxjs/toolkit';
import Footer from 'components/Footer';
import Header from 'components/Header';
import RootReducer from 'components/store/RootReducer';
import type { AppProps /*, AppContext */ } from 'next/app';
import 'public/css/reset.css';
import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import useAuth from 'components/util/useAuth';

const store = configureStore({ reducer: RootReducer });
const queryClient = new QueryClient();

const PrePageLoad = ({ Component, pageProps }: any) => {
  useAuth();
  return <Component {...pageProps} />;
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <PrePageLoad Component={Component} pageProps={pageProps} />
        <Footer />
      </QueryClientProvider>
    </Provider>
  );
};
export default MyApp;
