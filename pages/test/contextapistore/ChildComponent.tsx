import React, { useContext, useState } from "react";
import Store from "./Store";

type Props = {};
const ChildComponent = (props: Props) => {
  const { state, setState } = useContext(Store).useTest;
  //
  return (
    <>
      <h1>{state.value}</h1>
      <button onClick={() => (state.value += 1)}>값 변경</button>
      <button onClick={() => setState((v) => ({ ...v }))}>렌더링갱신</button>
    </>
  );
};

export default ChildComponent;
