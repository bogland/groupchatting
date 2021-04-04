import React, { useEffect } from "react";
import { useRouter } from "next/router";
import queryString from "query-string";

const query = () => {
  const arr: number[] = [];
  const data: number = 0;
  useEffect(() => {
    const query = queryString.parse(location.search);
    const qString = queryString.stringify(query);
  }, []);
  return <></>;
};

export default query;
