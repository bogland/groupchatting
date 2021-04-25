import React from "react";
import styles from "./chatlist.module.scss";

const chatlist = () => {
  return (
    <>
      <section>
        <ul className={styles.roomContainer}>
          <li className={styles.room}>
            <div className={styles.headerWrap}>
              <span className={styles.category}>#취미</span>
              <span className={styles.timer}>1:00</span>
            </div>
            <div className={styles.title}>같이 대화 하실분~</div>
            <div className={styles.roomInfoWrap}>
              <div className={styles.left}>
                <span className={styles.count}>1/2</span>
                <span className={styles.visitTime}>1분전 방문</span>
              </div>
              <span className={styles.makerID}>홍길동</span>
            </div>
          </li>

          <li className={styles.room}>
            <div className={styles.headerWrap}>
              <span className={styles.category}>#취미</span>
              <span className={styles.timer}>1:00</span>
            </div>
            <div className={styles.title}>같이 대화 하실분~</div>
            <div className={styles.roomInfoWrap}>
              <div className={styles.left}>
                <span className={styles.count}>1/2</span>
                <span className={styles.visitTime}>1분전 방문</span>
              </div>
              <span className={styles.makerID}>홍길동</span>
            </div>
          </li>

          <li className={styles.room}>
            <div className={styles.headerWrap}>
              <span className={styles.category}>#취미</span>
              <span className={styles.timer}>1:00</span>
            </div>
            <div className={styles.title}>같이 대화 하실분~</div>
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
