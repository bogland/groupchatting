import { RootReducerType } from "components/store/RootReducer";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./header.module.scss";
type Props = {};

const Header = (props: Props) => {
  const { title } = useSelector((state: RootReducerType) => state.ui);
  console.log(title);
  return (
    <>
      <section className={styles.container}>
        <img className={styles.iconGNB} src="/image/ic_gnb.png" />
        <span className={styles.title}>{title}</span>
        <span></span>
      </section>
    </>
  );
};

export default Header;
