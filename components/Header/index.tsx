import React from "react";
import styles from "./header.module.scss";
type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <section className={styles.container}>
        <img className={styles.iconGNB} src="/image/ic_gnb.png" />
        <span className={styles.title}>타이틀</span>
        <span></span>
      </section>
    </>
  );
};

export default Header;
