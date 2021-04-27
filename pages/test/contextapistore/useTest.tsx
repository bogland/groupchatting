import { createContext, useState } from "react";

export type TestStateType = {
  value: number;
};

export const useTest = () => {
  const [state, setState] = useState<TestStateType>({ value: 0 });
  return { state, setState };
};
