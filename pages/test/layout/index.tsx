import react from "react";
import Head from "next/head";
import styles from "./layout.module.scss";
const index = () => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        ></meta>
      </Head>
      <div className={styles.wrap}>
        <div className={styles.header}>헤더</div>
        <div className={styles.container}>
          <section className={styles.tableContainer}>
            <div className={styles.title}>아무나 들어옵쇼</div>
            <div className={styles.content}>이곳은 무언가를 하는 방입니다</div>
          </section>
        </div>
      </div>
    </>
  );
};

export default index;
