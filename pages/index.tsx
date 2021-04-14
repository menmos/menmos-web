import Head from "next/head";
import Layout from "../components/layout";
import React from "react";

import styles from "../styles/login.module.scss";

export default function Login(): JSX.Element {
  return (
    <>
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles["container"]}>
          <div className={styles["form-container"]}>
            <form>
              <span className={styles["title"]}>Login</span>
              <div className={styles["floating-label"]}>
                <input id="username" name="username" placeholder="Username" />
              </div>
              <div className={styles["floating-label"]}>
                <input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </div>
              <button type="submit">Log in</button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
