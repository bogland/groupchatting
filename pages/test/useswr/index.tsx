import axios from "axios";
import Router from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

type Props = {};

const index = (props: Props) => {
  const fetcher = async () => {
    alert("ㅎㅇㅎㅇ");
    return await axios.get("https://jsonplaceholder.typicode.com/todos/1");
  };

  const { data, error, mutate } = useSWR<any>("/api/user", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <div onClick={() => Router.push("/test/useswr/page2")}>(Page1)</div>
      <div>hello {data.data?.userId ?? ""}!</div>;
    </>
  );
};

export default index;
