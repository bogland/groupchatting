import React, { useEffect, useRef, useState } from "react";
import styles from "./chatRoom.module.scss";

type ChatInfo = {
  messageId: number;
  userId: number;
  userNickName: string;
  isMine: boolean;
  message: string;
  time: Date;
};

const chatRoom = ({}) => {
  const [dataList, setDataList] = useState([
    {
      messageId: 1,
      userId: 10,
      userNickName: "손님",
      isMine: false,
      message: "안녕하세요.",
      time: new Date(),
    },
    {
      messageId: 2,
      userId: 66,
      userNickName: "방장",
      isMine: true,
      message: "안녕하세요. 방장입니다.",
      time: new Date(),
    },
  ]);
  const [state, setState] = useState({
    messageId: -1,
  });

  useEffect(() => {}, []);

  const onKeyDown = (e: any) => {
    const keyCode = e.keyCode;
    if (keyCode != 13) return;

    const text = e.target.value;
    const chatInfo: ChatInfo = {
      isMine: true,
      message: text,
      messageId: -1,
      userId: 0,
      userNickName: "Dummy(방장)",
      time: new Date(),
    };
    console.log("time : ", seconds);
    setDataList((v) => v.concat(chatInfo));
    e.target.value = "";
  };

  const changeToGapTime = (before: Date, now: Date) => {
    const seconds = (before.getTime() - now.getTime()) / 1000;
    if (seconds < 60) {
      return seconds + "초전";
    } else if (seconds < 60 * 60) {
      return seconds + "분전";
    } else if (seconds < 60 * 60 * 24) {
      return seconds + "일전";
    }
  };
  return (
    <>
      <section className={styles.chatWrap}>
        <div className={styles.chatContainer}>
          {dataList.map((data: ChatInfo) => {
            return (
              <div
                className={`${styles.bubble} ${data.isMine && styles.mine}`}
                key={data.messageId}
              >
                {!data.isMine && <span>{data.userNickName} :</span>}
                <span>{data.message}</span>
                <div>{data.time.toDateString("YYYY-MM-DD")}</div>
              </div>
            );
          })}
        </div>
      </section>
      <section className={styles.chatInputWrap}>
        <input
          type="text"
          placeholder="채팅을 입력하세요."
          onKeyDown={(e) => onKeyDown(e)}
        />
        <span className={styles.confirm}>전송</span>
      </section>
    </>
  );
};

export default chatRoom;
