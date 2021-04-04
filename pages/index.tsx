import React, { useEffect } from "react";
import Head from "next/head";
import styled, { css, createGlobalStyle } from "styled-components";
import router from "next/router";
const PageStyle = createGlobalStyle`
  .title {
    margin: 100px 10px 0;
    display:flex;
    flex-direction:column;
  }
  .header {
  }
  .tabWrap {
    display: flex;
    .tab {
      text-align: center;
      display:flex;
      flex-direction: column;
      justify-content: center;
      width:131px;
      height:40px;
      background-color:#FFF4D9;
      border-bottom:black 2px solid;
      &.on{
      background-color:#FFDD85;
      &+.tab{
        border-left:black 2px solid;
      }
    }
    }
  }
  .loginTab {
    display: flex;
  }
  .inputId {
    display: block;
  }
  .inputPassword {
    display: block;
  }
 
  .loginButton{
    background-color:#FFF4D9;
    width:100%;
    height:42px;
    border:none;
    border-top:black 2px solid;
    border-bottom:black 2px solid;
  }
`;

const LoginSection = styled.section`
  &.login {
    background-color: #fff4d9;
    display: block;
    width: 262px;
    height: 205px;
    margin: 93px auto;
  }
  & .loginContentWrap {
    height: 125px;
    display: flex;
    flex-direction: column;

    align-items: center; // column 가로
    justify-content: center; // column 세로
    .loginContent {
      text-align: center;
      width: 151px;
      height: 23px;
    }
    .inputPassword {
      margin-top: 5px;
    }
  }
`;

const index = () => {
  useEffect(() => {}, []);
  return (
    <>
      <PageStyle />
      <header className="header"></header>
      <section className="title">
        <div style={{ marginRight: "auto", marginBottom: "10px" }}>
          welcome to Your Visiting~
        </div>
        <div style={{ marginLeft: "auto" }}>
          It's for everyone to Communicate
        </div>
      </section>
      <LoginSection className="login">
        <ul className="tabWrap">
          <li className="tab on">Temp</li>
          <li className="tab">Login</li>
        </ul>
        <div className="loginContentWrap">
          <input className="loginContent inputId" placeholder="Type Your ID" />
          <input
            className="loginContent inputPassword"
            placeholder="Type Your PassWord"
          />
        </div>
        <button className="loginButton">Enter</button>
      </LoginSection>
      <footer className="footer"></footer>
    </>
  );
};

export default index;
