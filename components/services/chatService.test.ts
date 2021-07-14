import axios from 'axios';
import { TESTAPIURI } from 'config';
import { ChatListDTO, getChatList } from './chatService';

// describe('ChatService API ', () => {
//   it('getChatList', async () => {
//     const data: ChatListDTO = {
//       pageNumber: 10,
//       pageIndex: 0,
//       roomId: 1
//     };
//     const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJUeXBlIjoiMCIsImlkIjoxLCJuYW1lIjoidGVzdCIsImlhdCI6MTYyNjIzOTk5OX0.dv2X06yQD7vJJKU64kQcav11TwWtC4yHBs5CNEP-ZQs`;
//     const res: any = await getChatList(token, data);
//     console.log(res);
//     // expect(res.data.length).not.toBe(0);
//   });
// });

test('ChatService API', async () => {
  const data: ChatListDTO = {
    pageNumber: 10,
    pageIndex: 0,
    roomId: 1
  };
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJUeXBlIjoiMCIsImlkIjoxLCJuYW1lIjoidGVzdCIsImlhdCI6MTYyNjIzOTk5OX0.dv2X06yQD7vJJKU64kQcav11TwWtC4yHBs5CNEP-ZQs`;
  const res: any = await getChatList(token, data);
  console.log(res);
});
