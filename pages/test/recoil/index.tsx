import { getRoomList } from 'components/services/roomService';
import React, { useEffect } from 'react';
import {
  atom,
  selector,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState
} from 'recoil';

const countState = atom({
  key: 'count',
  default: 0
});

const roomListState = atom({
  key: 'roomList',
  default: []
});

const roomListStateSelector = selector({
  key: 'roomListStateSelector',
  get: ({ get }) => {
    return get(roomListState);
  }
});

type Props = {};
const index = (props: Props) => {
  const count = useRecoilValue(countState);
  const setCount = useSetRecoilState(countState);
  const roomList = useRecoilValue(roomListStateSelector);
  const setRoomList = useSetRecoilState(roomListState);

  useEffect(() => {
    loadRoomList();
  }, []);
  const loadRoomList = async () => {
    const res = await getRoomList();
    setRoomList(res);
  };

  const changeCount = () => {
    setCount(v => v + 1);
    loadRoomList();
  };

  return (
    <>
      {count}
      <button onClick={changeCount}>증가</button>
      {roomList?.map(room => {
        return <>{room.CUSTOMER_ID}</>;
      })}
    </>
  );
};

export default index;
