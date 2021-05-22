import auth, { AuthState } from "components/reducers/AuthReducer";
import ui, { UIState } from "components/reducers/UIReducer";
import React from "react";
import { combineReducers } from "redux";

export type RootReducerType = {
  auth: AuthState;
  ui: UIState;
};
const RootReducer = combineReducers<RootReducerType>({
  auth,
  ui,
});

export default RootReducer;
