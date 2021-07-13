import React from 'react';
import testapi from './index';
import axios from 'axios';
import { TESTAPIURI } from 'config';

describe('TEST Test API ', () => {
  it('test api 1 sample', async () => {
    const res: any = await axios.get(TESTAPIURI + 'api/test');
    expect(res.data.id).toBe(0);
  });
});
