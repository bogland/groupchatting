import React from 'react';
import testapi from './index';
import axios from 'axios';

test('test api', async () => {
  let res: any = await axios.get('/api/test');
  expect(res.id).toBe(0);
});
