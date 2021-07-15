import { APIURI, TESTAPIURI } from 'config';
import axios from 'axios';
import QueryString from 'query-string';

export type ChatListDTO = {
  pageNumber?: number;
  pageIndex: number;
  roomId: number;
};

export type ChatWriteDTO = {
  roomId: number;
  message: string;
};

const chatListDTODefault = {
  pageNumber: 10,
  pageIndex: 0,
  roomId: 1
};

const ChatWriteDTODefault = {
  roomId: 1,
  message: '안녕하세요. 테스트입니다.'
};

export const getChatList: any = async (
  token: string,
  chatListDTO: ChatListDTO = chatListDTODefault
) => {
  const res = await axios.get(
    APIURI + 'chat/list?' + QueryString.stringify(chatListDTO),
    {
      headers: { Authorization: 'Bearer ' + token }
    }
  );
  return res.data;
};

export const writeChat: any = async (
  token: string,
  data: ChatWriteDTO = ChatWriteDTODefault
) => {
  const res = await axios.post(APIURI + 'chat/write', data, {
    headers: { Authorization: 'Bearer ' + token }
  });
  return res.data;
};
