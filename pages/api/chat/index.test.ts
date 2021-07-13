import React from 'react';
import { chat } from './index';
import axios from 'axios';
import { TESTAPIURI } from 'config';

describe('Chat Test API ', () => {
  it('get Chat List', async () => {
    const res: any = await axios.post(TESTAPIURI + 'api/chat', {
      startPage: 0,
      pageNum: 10
    });
    console.log(res.data);
    expect(res.data.length).not.toBe(0);
  });
});
