import React, { useEffect } from "react";
import useVar from "./useVar";
import { infoObject as context } from "./useVar";

type Props = {};

const Child = (props: Props) => {
  const { infoObject, updateRender } = useVar(10);
  useEffect(() => {
    updateRender();
  }, []);
  console.log("child", context);
  return (
    <>
      {infoObject.values.map((v, index) => {
        return <div>{v}</div>;
      })}
      <button onClick={() => updateRender()}></button>
    </>
  );
};

export default Child;
