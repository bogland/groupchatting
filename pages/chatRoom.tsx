import React, { useEffect, useRef, useState } from 'react';
import styles from './chatRoom.module.scss';
import moment, { Moment } from 'moment';
import { useSelector } from 'react-redux';
import { RootReducerType } from 'components/store/RootReducer';
import {
  ChatListDTO,
  ChatWriteDTO,
  getChatList,
  writeChat
} from 'components/services/chatService';
import axios from 'axios';
import { useQuery } from 'react-query';

type ChatInfo = {
  CHAT_ID: number;
  CUSTOMER_ID: number;
  CUSTOMER_NAME: string;
  ISMINE: boolean;
  MESSAGE: string;
  TIME: Date;
};

const chatRoom = ({}) => {
  const { token } = useSelector((state: RootReducerType) => state.auth);
  const chatInputRef: any = useRef();
  const chatWrapRef: any = useRef();
  const [state, setState] = useState({
    messageId: -1
  });
  // const [dataList, setDataList] = useState([
  //   {
  //     messageId: 1,
  //     userId: 10,
  //     userNickName: '손님',
  //     isMine: false,
  //     message: '안녕하세요.',
  //     time: new Date()
  //   },
  //   {
  //     messageId: 2,
  //     userId: 66,
  //     userNickName: '방장',
  //     isMine: true,
  //     message: '안녕하세요. 방장입니다.',
  //     time: new Date()
  //   }
  // ]);

  const { data: dataList = [], status } = useQuery(
    ['chatList'],
    async () => {
      const data: ChatListDTO = {
        pageNumber: 10,
        pageIndex: 0,
        roomId: 1
      };
      console.log('token : ', token);
      const res: any = await getChatList(token, data);
      console.log('api data : ', res);
      return res.data;
    },
    {
      retry: 5, //실패시 5번
      retryDelay: 1000 //1초 간격으로
    }
  );
  console.log('dataList : ', dataList);
  // const loadChatList = async () => {
  //   const data: ChatListDTO = {
  //     pageNumber: 10,
  //     pageIndex: 0,
  //     roomId: 1
  //   };
  //   console.log('token : ', token);
  //   const res: any = await getChatList(token, data);
  //   console.log(res);
  // };

  useEffect(() => {
    const dataWrite: ChatWriteDTO = {
      message: '안녕하세요.',
      roomId: 1
    };
    adjustChatWarpHeight();
    window.addEventListener('resize', () => {
      adjustChatWarpHeight();
      chatScrollDown();
    });
  }, []);

  const adjustChatWarpHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    chatScrollDown();
  }, [dataList]);

  const onKeyDown = (e: any) => {
    const keyCode = e.keyCode;
    if (keyCode != 13) return;

    sendMessage(e.target.value);
  };

  const sendMessage = async (text: string) => {
    const chatInfo: ChatInfo = {
      isMine: true,
      message: text,
      messageId: -1,
      userId: 0,
      userNickName: 'Dummy(방장)',
      time: new Date()
    };
    // setDataList(v => v.concat(chatInfo));
    chatInputRef.current.value = '';
    chatInputRef.current.focus();
    chatScrollDown();
    const data: ChatWriteDTO = {
      roomId: 1,
      message: text
    };
    const resWrite: any = await writeChat(token, data);
  };

  const changeToGapTime = (before: Date, now: Date) => {
    let seconds = moment.duration(moment(before).diff(moment(now))).asSeconds();
    seconds = Math.round(seconds);
    if (seconds < 60) {
      return seconds + '초전';
    } else if (seconds < 60 * 60) {
      return seconds + '분전';
    } else if (seconds < 60 * 60 * 24) {
      return seconds + '일전';
    }
  };

  const chatScrollDown = () => {
    chatWrapRef.current.scrollTop = chatWrapRef.current.scrollHeight;
  };
  return (
    <>
      <section ref={chatWrapRef} className={styles.chatWrap}>
        {dataList?.map((data: ChatInfo) => {
          return (
            <div
              className={`${styles.bubble} ${data.ISMINE && styles.mine}`}
              key={data.CHAT_ID}
            >
              {!data.ISMINE && <span>{data.CUSTOMER_NAME} :</span>}
              <span className={styles.message}>{data.MESSAGE}</span>
              <div>{moment(data.TIME).format('HH:mm')}</div>
            </div>
          );
        })}
      </section>

      <section className={styles.chatInputWrap}>
        <input
          ref={chatInputRef}
          type="text"
          placeholder="채팅을 입력하세요."
          onKeyDown={e => onKeyDown(e)}
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
