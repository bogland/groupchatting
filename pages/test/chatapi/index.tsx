import {
  ChatListDTO,
  ChatWriteDTO,
  getChatList,
  writeChat
} from 'components/services/chatService';
import React, { useEffect } from 'react';

type Props = {};
const index = (props: Props) => {
  useEffect(async () => {
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJUeXBlIjoiMCIsImlkIjoxLCJuYW1lIjoidGVzdCIsImlhdCI6MTYyNjIzOTk5OX0.dv2X06yQD7vJJKU64kQcav11TwWtC4yHBs5CNEP-ZQs`;

    const dataWrite: ChatWriteDTO = {
      message: '안녕하세요.',
      roomId: 1
    };
    const resWrite: any = await writeChat(token, dataWrite);

    const data: ChatListDTO = {
      pageNumber: 10,
      pageIndex: 0,
      roomId: 1
    };
    const res: any = await getChatList(token, data);
  });
  return <></>;
};

export default index;
