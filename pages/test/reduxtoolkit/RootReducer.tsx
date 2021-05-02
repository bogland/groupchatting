// import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import counter, { CounterState } from "./CounterReducer";

export type RootReducerType = {
  counter: CounterState;
};
const rootReducer = combineReducers<RootReducerType>({ counter });

// const rootReducer = {
//   reducer: {
//     counter: counter,
//   },
// };
// export default rootReducer;
// React에서 사용할 수 있도록 타입을 만들어 export 해준다.
export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
