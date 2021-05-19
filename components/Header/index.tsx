import React from "react";
import styles from "./header.module.scss";
type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <section className={styles.container}>
        <img className={styles.iconGNB} src="/image/ic_gnb.png" />
      </section>
    </>
  );
};

export default Header;
