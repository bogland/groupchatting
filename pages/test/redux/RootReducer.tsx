import { combineReducers } from "redux";
import counter, { CounterState } from "./CounterReducer";

export type RootReducerType = {
  counter: CounterState;
};
const rootReducer = combineReducers<RootReducerType>({ counter });

export default rootReducer;
