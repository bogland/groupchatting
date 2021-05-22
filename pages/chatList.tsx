import { setHeader } from "components/reducers/UIReducer";
import { getRoomList } from "components/services/roomService";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listen } from "socket.io";
import useSWR from "swr";
import styles from "./chatlist.module.scss";

const chatlist = () => {
  const { data: chatList } = useSWR("chatList", getRoomList);
  const dispatch = useDispatch();
  console.log(chatList);

  useEffect(() => {
    dispatch(setHeader({ title: "방목록" }));
  }, []);

  return (
    <>
      <section>
        <ul className={styles.roomContainer}>
          {chatList?.map((chat, index: number) => {
            return (
              <li key={index} className={styles.room}>
                <div className={styles.headerWrap}>
                  <span className={styles.category}>#취미</span>
                  <span className={styles.timer}>{chat.DURING}</span>
                </div>
                <div className={styles.title}>{chat.ROOM_NAME}</div>
                <div className={styles.roomInfoWrap}>
                  <div className={styles.left}>
                    <span className={styles.count}>1/2</span>
                    <span className={styles.visitTime}>{chat.CREATE_AT}</span>
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
