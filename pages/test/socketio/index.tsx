import React, { useEffect, useState } from "react";
import io from "socket.io-client";

type Props = {};
const socket = io("http://localhost:5000");

const index = (props: Props) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("chat", (data) => {
      console.log(data);
    });
  }, []);

  const sendMessage = () => {
    // console.log("gdgd");
    socket.emit("chat", "ㅎㅇㅎㅇ");
    return () => socket.disconnect();
  };

  return (
    <>
      <button onClick={sendMessage}>보내기</button>
    </>
  );
};

export default index;
