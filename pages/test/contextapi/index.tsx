import React from "react";
import ChildComponent from "./ChildComponent";
import TestContext, { useTest } from "./TestContext";
const UserDispatch = React.createContext(null);

type Props = {};

const contextAPI = (props: Props) => {
  return (
    <>
      <TestContext.Provider value={useTest}>
        <ChildComponent></ChildComponent>
      </TestContext.Provider>
    </>
  );
};

export default contextAPI;
