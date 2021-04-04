import React from "react";
import styled, { css, createGlobalStyle } from "styled-components";

const Style = styled.div`
  color: yellow;
`;

const test = () => {
  return (
    <>
      <Style>123123</Style>
    </>
  );
};

export default test;
