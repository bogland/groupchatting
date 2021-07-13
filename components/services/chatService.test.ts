import axios from 'axios';
import { TESTAPIURI } from 'config';
import { ChatListDTO, getChatList } from './chatService';

describe('ChatService API ', () => {
  it('getChatList', async () => {
    const data: ChatListDTO = {
      pageNum: 10,
      startPage: 0
    };
    const res: any = await getChatList(data);
    console.log(res.data);
    expect(res.data.length).not.toBe(0);
  });
});
