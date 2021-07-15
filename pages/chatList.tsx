import { setHeader } from 'components/reducers/UIReducer';
import { getRoomList } from 'components/services/roomService';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { listen } from 'socket.io';
import useSWR from 'swr';
import styles from './chatlist.module.scss';
import moment from 'moment';
import { route } from 'next/dist/next-server/server/router';
import router from 'next/router';

const chatlist = () => {
  const { data: chatList } = useSWR('chatList', getRoomList);
  const dispatch = useDispatch();
  console.log(chatList);

  useEffect(() => {
    dispatch(setHeader({ title: '방목록' }));
  }, []);

  const Timer = ({ initTime = 0 }: { initTime: number }) => {
    const [time, setTime] = useState<number>(initTime);
    useEffect(() => {
      const timer = setInterval(() => {
        setTime(v => v - 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }, []);
    return <>{moment.utc(time * 1000).format('HH:mm:ss')}</>;
  };

  return (
    <>
      <section>
        <ul className={`container ${styles.roomContainer}`}>
          {chatList?.map((chat, index: number) => {
            const remainedTime = moment
              .duration(moment(chat.END_AT).diff(moment()))
              .asSeconds();
            console.log('remainedTime : ', remainedTime);
            if (!remainedTime) return <></>;
            return (
              <li
                key={index}
                className={styles.room}
                onClick={() => router.push('chatRoom')}
              >
                <div className={styles.headerWrap}>
                  <span className={styles.category}>#취미</span>
                  <span className={styles.timer}>
                    <Timer
                      initTime={moment
                        .duration(moment(chat.END_AT).diff(moment()))
                        .asSeconds()}
                    />
                  </span>
                </div>
                <div className={styles.title}>{chat.ROOM_NAME}</div>
                <div className={styles.roomInfoWrap}>
                  <div className={styles.left}>
                    <span className={styles.count}>1/2</span>
                    <span className={styles.visitTime}>
                      {moment(chat.CREATE_AT).format('YYYY-MM-DD HH:mm')}
                    </span>
                  </div>
                  <span className={styles.makerID}>{chat.CUSTOMER_NAME}</span>
                </div>
              </li>
            );
          })}
          <li className={styles.room}>
            <div className={styles.headerWrap}>
              <span className={styles.category}>#취미</span>
              <span className={styles.timer}>1:00</span>
            </div>
            <div className={styles.title}>들어오시죠!</div>
            <div className={styles.roomInfoWrap}>
              <div className={styles.left}>
                <span className={styles.count}>1/2</span>
                <span className={styles.visitTime}>1분전 방문</span>
              </div>
              <span className={styles.makerID}>홍길동</span>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
};

export default chatlist;
