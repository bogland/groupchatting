import React, { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

type Props = {};
const reactquery = (props: Props) => {
  const queryClient = useQueryClient();
  const { data, status } = useQuery(
    ['testApi'],
    async () => {
      const { data } = await axios.get('/api/test');
      return data;
    },
    {
      staleTime: 5 * 60 * 1000, //5분간 리프레쉬 발생안함
      retry: 5, //실패시 5번
      retryDelay: 1000 //1초 간격으로
    }
  );

  useEffect(() => {
    if (status === 'error') console.log('에러');
  }, [status]);

  return (
    <>
      <div>reactquery test</div>
      <div>{data?.title}</div>
      <Link href="/test/reactquery/test2">다음페이지</Link>
      <ReactQueryDevtools />
    </>
  );
};

export default reactquery;
