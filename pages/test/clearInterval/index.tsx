import React, { useEffect, useState } from 'react';

type Props = {};

const index = function (props: Props) {
  const [state, setState] = useState({
    count: 0
  });

  const effect = () => {
    const interval = setInterval(() => {
      // state.count += 1;
      // setState(v => ({ ...state }));
      setState(v => ({ ...v, count: state.count + 1 })); //작동안함
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  };
  useEffect(effect, []);
  console.log(state);
  return <>{state.count}</>;
};

export default index;
