import React, { useContext } from "react";
import TestContext from "./TestContext";

type Props = {};

const ChildComponent = (props: Props) => {
  const { state, setState } = useContext(TestContext)();
  return (
    <>
      <h1>{state.value}</h1>
      <button onClick={() => (state.value += 1)}>값 변경</button>
      <button onClick={() => setState((v) => ({ ...v }))}>렌더링갱신</button>
    </>
  );
};

export default ChildComponent;
