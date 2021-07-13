import { TESTAPIURI } from 'config';
import axios from 'axios';

export type ChatListDTO = {
  startPage: number;
  pageNum?: number;
};

const chatListDTODefault = {
  startPage: 0,
  pageNum: 10
};

export const getChatList: any = async (
  chatListDTO: ChatListDTO = chatListDTODefault
) => {
  await axios.get(TESTAPIURI + 'api/chat', {
    params: chatListDTO
  });
};
