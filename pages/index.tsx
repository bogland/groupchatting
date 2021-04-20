import React, { useEffect, useState } from "react";
import Head from "next/head";
import styled, { css, createGlobalStyle } from "styled-components";
import router from "next/router";
import Axios from "axios";

const submitSuccess = async (e: any) => {
  e.preventDefault();
  const { id, pw } = e.target;
  const data = {
    memberType: 0, //0: guest
    id: id.value,
    password: pw.value,
  };

  const res = await Axios.get(
    "http://223.33.165.165:5000/auth?memberType=0&id=test&password=test"
  );
  console.log(res);
};

type State = {
  loginTab: boolean; //0: Temp, 1: Member
};
const index = () => {
  const [state, setState] = useState<State>({
    loginTab: false,
  });

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
        <form onSubmit={(e: any) => submitSuccess(e)}>
          <ul
            className="tabWrap"
            onClick={() => setState((v) => ({ ...v, loginTab: !v.loginTab }))}
          >
            <li className={`tab ${state.loginTab ? "on" : ""}`}>Temp</li>
            <li className={`tab ${!state.loginTab ? "on" : ""}`}>Login</li>
          </ul>
          <div className="loginContentWrap">
            {state.loginTab && (
              <input
                className="loginContent inputId"
                placeholder="Type Your ID"
                name="id"
              />
            )}
            <input
              className="loginContent inputPassword"
              placeholder="Type Your PassWord"
              name="pw"
            />
          </div>
          <button type="submit" className="loginButton">
            Enter
          </button>
        </form>
      </LoginSection>
      <footer className="footer"></footer>
    </>
  );
};

export default index;

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
    }
    .tab.on{
      background-color:#FFDD85;
    }
    .tab+.tab{
      border-left:black 2px solid;
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
  .loginContentWrap {
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
