import { APIURI, TESTAPIURI } from 'config';
import axios from 'axios';
import QueryString from 'query-string';

export type ChatListDTO = {
  pageNumber?: number;
  roomId: number;
  chatId: number;
  direction: number;
};

export type ChatWriteDTO = {
  roomId: number;
  message: string;
};

const chatListDTODefault = {
  pageNumber: 10,
  roomId: 1,
  chatId: 0,
  direction: 0
};

const ChatWriteDTODefault = {
  roomId: 1,
  message: '안녕하세요. 테스트입니다.'
};

export const getChatList: any = async (
  token: string,
  chatListDTO: ChatListDTO = chatListDTODefault
) => {
  const res = await axios.get(APIURI + 'chat/list', {
    params: chatListDTO,
    headers: { Authorization: 'Bearer ' + token }
  });
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
