import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

type Props = {};

const index = (props: Props) => {
  const [socket, setSocket] = useState<any>();
  useEffect(() => {
    const socket = io('http://192.168.0.2:5000');
    setSocket(socket);
    socket.emit('join', 'join');
    socket.on('chat', data => {
      alert(data);
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    // console.log("gdgd");
    socket.emit('chat', 'ㅎㅇㅎㅇ');
    return () => socket.disconnect();
  };

  return (
    <>
      <button onClick={sendMessage}>보내기</button>
    </>
  );
};

export default index;
