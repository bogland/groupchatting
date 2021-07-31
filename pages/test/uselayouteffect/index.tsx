import React, { useEffect, useLayoutEffect, useState } from 'react';

type Props = {};

function sleep(ms: number) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

const index = (props: Props) => {
  const [state, setState] = useState(0);
  useLayoutEffect(() => {
    setState(10);
    console.log(state);
    console.log('useLayoutEffect1');
    console.log('useLayoutEffect2');
    setState(20);
    console.log(state);
  });

  useEffect(() => {
    console.log('useEffect1');
    sleep(1000);
    console.log('useEffect2');
    setState(100);
  });
  return (
    <>
      {console.log('render')}
      <div>{state}</div>
    </>
  );
};

export default index;
