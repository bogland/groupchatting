import React, { createContext, Dispatch, SetStateAction } from "react";
import { TestStateType, useTest } from "./useTest";

type ContextType = {
  useTest: {
    state: TestStateType;
    setState: Dispatch<SetStateAction<TestStateType>>;
  };
} | null;

const Store = createContext<ContextType>(null);

export default Store;
