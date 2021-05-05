import React from "react";
import router from "next/router";
type Props = {};

const Router = (props: Props) => {
  return (
    <>
      <button
        onClick={() => {
          router.push("/test/router/page1");
        }}
      >
        page1
      </button>
    </>
  );
};

export default Router;
