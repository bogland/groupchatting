import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "./CounterReducer";
import { RootReducerType } from "./RootReducer";

const Child = () => {
  const counter = useSelector((state: RootReducerType) => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      {counter.number}
      <button onClick={() => dispatch(increase())}>증가</button>
      <button onClick={() => dispatch(decrease())}>감소</button>
      <div>ㅎㅇㅎㅇㅎㅇㅎㅇㅎ</div>
    </>
  );
};

export default Child;
