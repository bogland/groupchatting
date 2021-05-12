import React, { useEffect, useState } from "react";

type InfoObjectType = {
  values: number[];
};
const infoObject: InfoObjectType = { values: [] };

const useVar = (value: number) => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    infoObject.values.push(value);
  }, []);
  const updateRender = () => {
    setRender((v) => !v);
  };
  return { infoObject, updateRender };
};

export default useVar;
