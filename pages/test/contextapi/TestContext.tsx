import { createContext, useState } from "react";

type State = {
  value: number;
};

export const useTest = () => {
  const [state, setState] = useState<State>({ value: 0 });
  return { state, setState };
};

const TestContext = createContext(useTest);
export default TestContext;
