import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import usePrevious from 'components/util/usePrevious';

type ChatInfo = {
  CHAT_ID: number;
  CUSTOMER_ID: number;
  CUSTOMER_NAME: string;
  ISMINE: boolean;
  MESSAGE: string;
  TIME: Date;
};
const queryClient = new QueryClient();
const chatRoom = ({}) => {
  const { token } = useSelector((state: RootReducerType) => state.auth);
  const observerRef: any = useRef();
  const chatInputRef: any = useRef();
  const chatWrapRef: any = useRef();
  const [state, setState] = useState({
    chatId: { start: 0, end: 0 },
    pageNumber: 20,
    dataList: []
  });
  const preState = usePrevious(state);

  const loadChatList = async (chatId = 0, direction = 0) => {
    if (!token) return;
    const data: ChatListDTO = {
      pageNumber: state.pageNumber,
      roomId: 1,
      chatId: chatId,
      direction: direction //up=0 ,down=1
    };
    const res: any = await getChatList(token, data);
    if (res.data.data?.length ?? 0 > 0) {
      const { start, end } = state.chatId;
      const { resStart, resEnd } = res.data.chatId;
      console.log(
        'state chatId' +
          JSON.stringify(state.chatId) +
          ' res chatId:' +
          JSON.stringify(res.data.chatId)
      );
      if (start <= resStart || end >= resEnd) return;
      //위아래 추가 구분
      state.chatId = res.data.chatId;
      if (direction == 0) {
        // console.log('dataList : ', res.data.data.push(state.dataList));
        state.dataList.unshift(...res.data.data);
        setState(v => ({
          ...state
        }));
      } else {
        state.dataList.push(...res.data.data);
        setState(v => ({
          ...state
        }));
      }
    }
    return res.data.chatId;
  };

  useEffect(() => {
    adjustChatWarpHeight();
    window.addEventListener('resize', () => {
      adjustChatWarpHeight();
      chatScrollDown();
    });
    token &&
      loadChatList(state.chatId.start, 0).then((chatId: any) => {
        chatScrollDown();
        state.chatId = chatId;
        startScrollObserve();
        state.observerObject?.observe(observerRef.current);
      });
  }, [token]);

  const onScrollUp = () => {
    console.log('onSCroll dataList :', state.dataList);
    if (state.dataList.length == 0) return;
    loadChatList(state.chatId.start, 0);
  };

  const startScrollObserve = () => {
    if (state.dataList.length == 0 || token == null) return;
    let options = {
      root: chatWrapRef.current,
      rootMargin: '500px',
      threshold: 0
    };
    state.observerObject = new IntersectionObserver(onScrollUp, options);
  };

  useEffect(() => {
    return () => {
      console.log('끝');
      state.observerObject?.disconnect();
    };
  }, []);

  const adjustChatWarpHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

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

  const chatScrollDown = () => {
    chatWrapRef.current.scrollTop = chatWrapRef.current.scrollHeight;
  };

  return (
    <>
      <section ref={chatWrapRef} className={styles.chatWrap}>
        <div ref={observerRef}></div>
        {state.dataList?.map((data: ChatInfo) => {
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
