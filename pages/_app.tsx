import { configureStore } from "@reduxjs/toolkit";
import Footer from "components/Footer";
import Header from "components/Header";
import RootReducer from "components/store/RootReducer";
import type { AppProps /*, AppContext */ } from "next/app";
import "public/css/reset.css";
import React from "react";
import { Provider } from "react-redux";

const store = configureStore({ reducer: RootReducer });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
};
export default MyApp;
