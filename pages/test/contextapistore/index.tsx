import React, { useState } from "react";
import { useTest } from "./useTest";
import ChildComponent from "./ChildComponent";
import Store from "./Store";

export const contextAPI = () => {
  return (
    <>
      <Store.Provider value={{ useTest: useTest() }}>
        <ChildComponent></ChildComponent>
        <ChildComponent></ChildComponent>
        <h1>123123123123</h1>
      </Store.Provider>
    </>
  );
};

export default contextAPI;
