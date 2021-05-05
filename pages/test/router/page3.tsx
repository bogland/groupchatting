import React from "react";
import router from "next/router";

type Props = {};

const page1 = (props: Props) => {
  return (
    <>
      <button
        onClick={() => {
          router.back();
        }}
      >
        뒤로
      </button>
      <button
        onClick={() => {
          router.replace("/test/router");
        }}
      >
        home
      </button>
    </>
  );
};

export default page1;
