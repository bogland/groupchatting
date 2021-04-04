import React from "react";
import styled, { css, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
.title{
  display:flex;
  margin:50px 25px;
}
.titleImage{
}
.search{
  display: flex;
  align-items: center;
  width:500px;
  margin-left:20px;
  border:2px #19ce60 solid;
}
.searchInput{
  height:20px;
  width:500px;
}

input{
  margin-left:10px;
  border:none;
  font-size:20px;
  font-weight:bold;
}

.searchButton{
  background-color:#19ce60;
  border:none;
}
`;

const naver = () => {
  return (
    <>
      <GlobalStyle />
      <section className="title">
        <img className="titleImage" src="image/title.PNG" />
        <div className="search">
          <input className="searchInput" value="123123123" />
          <img src="image/keyboard.PNG" />
          <img src="image/foldIcon.PNG" />
        </div>
        <button className="searchButton">
          <img src="image/searchBtn.PNG" />
        </button>
      </section>
    </>
  );
};

export default naver;
