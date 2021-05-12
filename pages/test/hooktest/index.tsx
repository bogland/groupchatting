import React, { useEffect } from "react";
import Child from "./Child";
import useVar from "./useVar";
import { infoObject as context } from "./useVar";
type Props = {};

const hooktest = (props: Props) => {
  const { infoObject, updateRender } = useVar(5);
  useEffect(() => {}, []);
  console.log("index", context);
  // if ((window || null) == null) return;
  // console.log(window);
  return (
    <>
      <Child></Child>
      {[1, 2, 3].map((v, index) => {
        return <div key={index}>{v}</div>;
      })}
    </>
  );
};

export default hooktest;
