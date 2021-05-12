import auth, { AuthState } from "components/reducers/AuthReducer";
import React from "react";
import { combineReducers } from "redux";

export type RootReducerType = {
  auth: AuthState;
};
const RootReducer = combineReducers<RootReducerType>({
  auth,
});

export default RootReducer;
