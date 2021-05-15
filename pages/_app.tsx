import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "components/store/RootReducer";
import type { AppProps /*, AppContext */ } from "next/app";
import "public/css/reset.css";
import { Provider } from "react-redux";

const store = configureStore({ reducer: RootReducer });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};
export default MyApp;
