import axios from "axios";
import Router from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

type Props = {};

const Page2 = (props: Props) => {
  const fetcher = async () =>
    await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  const { data, error, mutate } = useSWR<any>("/api/user", fetcher);
  console.log("data", data);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <div
        onClick={() => {
          mutate({ data: { userId: 2 } }, false);
        }}
      >
        값을 바꾸자
      </div>
      <div onClick={() => Router.back()}>뒤로 가기(Page2)</div>
      <div>hello {data.data?.userId ?? ""}!</div>;
    </>
  );
};

export default Page2;
