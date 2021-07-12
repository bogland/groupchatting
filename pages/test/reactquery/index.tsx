import React, { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {
  useQuery,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

type Props={
}
const reactquery = (props:Props) => {
  const { data } = useQuery(
    ['testApi'],
    async () => {
      const { data } = await axios.get('/api/test');
      return data;
    },
    {
      staleTime: 5 * 60 * 1000 //5분간 리프레쉬 발생안함
    }
  );
  useEffect(() => {
    return () => {
      alert('index 페이지 unmount');
    };
  });

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