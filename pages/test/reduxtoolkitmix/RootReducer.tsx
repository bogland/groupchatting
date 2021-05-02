// import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import counter, { CounterState } from "./CounterReducer";
import counter2, { CounterState2 } from "./CounterReducer2";

export type RootReducerType = {
  counter: CounterState;
  counter2: CounterState2;
};
const rootReducer = combineReducers<RootReducerType>({ counter, counter2 });

// const rootReducer = {
//   reducer: {
//     counter: counter,
//   },
// };
// export default rootReducer;
// React에서 사용할 수 있도록 타입을 만들어 export 해준다.
export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
