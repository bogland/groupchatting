import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled, { css, createGlobalStyle } from 'styled-components';
import router from 'next/router';
import Axios from 'axios';
import styles from './index.module.scss';
import { APIURI } from 'config';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerType } from 'components/store/RootReducer';
import { setAuth } from 'components/reducers/AuthReducer';
import { setHeader } from 'components/reducers/UIReducer';
import { authentication, checkAuth } from 'components/services/authService';
import { ErrorCode } from 'components/services/model';

type State = {
  loginTab: boolean; //0: Temp, 1: Member
  token: string | null;
};
const index = () => {
  const auth = useSelector((state: RootReducerType) => state.auth);
  const dispatch = useDispatch();
  const [state, setState] = useState<State>({
    loginTab: false,
    token: null
  });

  useEffect(() => {
    dispatch(setHeader({ title: '로그인' }));
    authenticate();
  }, []);

  const authenticate = async () => {
    const token = localStorage.token;
    if (token == null) return;

    const res = await checkAuth(token);
    if (res.errorCode == ErrorCode.Error) return;
    dispatch(setAuth({ token: localStorage.token }));
    router.push('/chatList');
  };

  const submitSuccess = async (e: any) => {
    e.preventDefault();
    const { id, pw } = e.target;
    if (id.value == '') return;

    const data = {
      memberType: 0, //0: guest
      id: id?.value ?? null,
      password: pw?.value ?? null
    };
    const res = await authentication(data);
    if (res.errorCode == ErrorCode.Error) return;
    const token = res.data;
    dispatch(setAuth({ token: token }));
    localStorage.token = token;
    router.push('/chatList');
  };
  return (
    <>
      <header className={styles.header}></header>
      <section className={styles.title}>
        <div style={{ marginRight: 'auto', marginBottom: '1d0px' }}>
          welcome to Your Visiting~
        </div>
        <div style={{ marginLeft: 'auto' }}>
          It's for everyone to Communicate
        </div>
      </section>
      <section className={styles.login}>
        <form onSubmit={(e: any) => submitSuccess(e)}>
          <ul
            className={styles.tabWrap}
            onClick={() => setState(v => ({ ...v, loginTab: !v.loginTab }))}
          >
            <li
              className={`${styles.tab} ${
                state.loginTab ? `${styles.on}` : ''
              }`}
            >
              Guest
            </li>
            <li
              className={`${styles.tab} ${
                !state.loginTab ? `${styles.on}` : ''
              }`}
            >
              Login
            </li>
          </ul>
          <div className={styles.loginContentWrap}>
            <input
              className={`${styles.loginContent} ${styles.inputId}`}
              placeholder="Type Your ID"
              name="id"
            />

            {!state.loginTab && (
              <input
                className={`${styles.loginContent} ${styles.inputPassword}`}
                placeholder="Type Your PassWord"
                name="pw"
              />
            )}
          </div>
          <button type="submit" className={styles.loginButton}>
            Enter
          </button>
        </form>
      </section>
      <footer className={styles.footer}></footer>
    </>
  );
};

export default index;
