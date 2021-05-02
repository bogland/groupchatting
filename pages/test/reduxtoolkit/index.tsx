import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Child from "./Child";
import rootReducer from "./RootReducer";

const store = configureStore({ reducer: rootReducer });
//const store = createStore(rootReducer, composeWithDevTools());

const ReduxTest = () => {
  return (
    <Provider store={store}>
      <Child></Child>
      <div>부모쪽</div>
    </Provider>
  );
};

export default ReduxTest;
