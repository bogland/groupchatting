import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "./CounterReducer";
import { decrease2, increase2 } from "./CounterReducer2";
import { RootReducerType } from "./RootReducer";

const Child = () => {
  const counter = useSelector((state: RootReducerType) => state.counter);
  const counter2 = useSelector((state: RootReducerType) => state.counter2);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        {counter.number}
        <button onClick={() => dispatch(increase())}>증가</button>
        <button onClick={() => dispatch(decrease())}>감소</button>
      </div>
      <div>
        {counter2.number}
        <button onClick={() => dispatch(increase2())}>증가2</button>
        <button onClick={() => dispatch(decrease2())}>감소2</button>
      </div>
      <div>ㅎㅇㅎㅇㅎㅇㅎㅇㅎ</div>
    </>
  );
};

export default Child;
