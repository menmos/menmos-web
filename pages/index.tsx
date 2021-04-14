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
          <div className={styles["login-form"]}>
            <form action="" autoComplete="off">
              <h4>Login</h4>
              <div className={styles["floating-label"]}>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                />
                <label htmlFor="email">Email:</label>
              </div>
              <div className={styles["floating-label"]}>
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                />
                <label htmlFor="password">Password:</label>
              </div>
              <button type="submit">Log in</button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
