import React, { useEffect, useRef, useState } from "react";
import styles from "./chatRoom.module.scss";
import moment, { Moment } from "moment";

type ChatInfo = {
  messageId: number;
  userId: number;
  userNickName: string;
  isMine: boolean;
  message: string;
  time: Date;
};

const chatRoom = ({}) => {
  const chatInputRef: any = useRef();
  const chatWrapRef: any = useRef();
  const [state, setState] = useState({
    messageId: -1,
  });
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

  useEffect(() => {
    adjustChatWarpHeight();
    window.addEventListener("resize", () => {
      adjustChatWarpHeight();
      chatScrollDown();
    });
  }, []);

  const adjustChatWarpHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    chatScrollDown();
  }, [dataList]);

  const onKeyDown = (e: any) => {
    const keyCode = e.keyCode;
    if (keyCode != 13) return;

    sendMessage(e.target.value);
  };

  const sendMessage = (text: string) => {
    const chatInfo: ChatInfo = {
      isMine: true,
      message: text,
      messageId: -1,
      userId: 0,
      userNickName: "Dummy(방장)",
      time: new Date(),
    };
    setDataList((v) => v.concat(chatInfo));
    chatInputRef.current.value = "";
    chatInputRef.current.focus();
    chatScrollDown();
  };

  const changeToGapTime = (before: Date, now: Date) => {
    let seconds = moment.duration(moment(before).diff(moment(now))).asSeconds();
    seconds = Math.round(seconds);
    if (seconds < 60) {
      return seconds + "초전";
    } else if (seconds < 60 * 60) {
      return seconds + "분전";
    } else if (seconds < 60 * 60 * 24) {
      return seconds + "일전";
    }
  };

  const chatScrollDown = () => {
    chatWrapRef.current.scrollTop = chatWrapRef.current.scrollHeight;
  };
  return (
    <>
      <section ref={chatWrapRef} className={styles.chatWrap}>
        {dataList.map((data: ChatInfo) => {
          return (
            <div
              className={`${styles.bubble} ${data.isMine && styles.mine}`}
              key={data.messageId}
            >
              {!data.isMine && <span>{data.userNickName} :</span>}
              <span className={styles.message}>{data.message}</span>
              <div>{moment(data.time).format("HH:mm")}</div>
            </div>
          );
        })}
      </section>

      <section className={styles.chatInputWrap}>
        <input
          ref={chatInputRef}
          type="text"
          placeholder="채팅을 입력하세요."
          onKeyDown={(e) => onKeyDown(e)}
        />
        <span
          className={styles.confirm}
          onClick={() => sendMessage(chatInputRef.current.value)}
        >
          전송
        </span>
      </section>
    </>
  );
};

export default chatRoom;
