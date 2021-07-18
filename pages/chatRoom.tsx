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
import { QueryClient, useQuery } from 'react-query';

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
  const observerRef: any = useRef();
  const chatInputRef: any = useRef();
  const chatWrapRef: any = useRef();
  const [state, setState] = useState({
    chatId: 0,
    pageIndex: 0,
    pageNumber: 20
  });
  const [dataList, setDataList] = useState([]);

  const { status } = useQuery(
    ['chatList', state.pageIndex],
    async () => {
      if (!token) return;
      const data: ChatListDTO = {
        pageNumber: state.pageNumber,
        pageIndex: state.pageIndex,
        roomId: 1,
        chatId: state.chatId
      };
      const res: any = await getChatList(token, data);
      console.log('res : ', res);
      if (res.data.data?.length ?? 0 > 0) {
        setDataList(v => v.concat(res.data.data));
        console.log('data : ', res.data);
        state.chatId = res.data.maxId;
        console.log('maxId :', res.data.maxId);
      }
    },
    {
      retry: 5, //실패시 5번
      retryDelay: 1000 //1초 간격으로
    }
  );
  console.log('dataList : ', dataList);

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
    observation();
  }, []);

  const observation = () => {
    let options = {
      root: chatWrapRef.current,
      rootMargin: '0px',
      threshold: 1.0
    };

    let observer = new IntersectionObserver(() => {
      state.pageIndex += 1;
      console.log('ㅎㅇㅎㅇ');
    }, options);
    observer.observe(observerRef.current);
  };

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
        <div ref={observerRef}></div>
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
