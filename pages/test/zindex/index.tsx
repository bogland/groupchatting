import React from "react";

type Props = {};

const index = (props: Props) => {
  return (
    <>
      <div
        style={{
          position: "relative",
          backgroundColor: "red",
          width: 100,
          height: 100,
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "green",
            width: 100,
            height: 50,
            bottom: 0,
            left: 50,
            zIndex: 3,
          }}
        ></div>
      </div>
      <div
        style={{
          backgroundColor: "yellow",
          width: 100,
          height: 100,
          marginTop: -50,
          zIndex: 2,
        }}
      ></div>
    </>
  );
};

export default index;
