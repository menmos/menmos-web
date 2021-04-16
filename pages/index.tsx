import Head from "next/head";
import Layout from "../components/layout";
import React, { FC, useState } from "react";

import styles from "../styles/login.module.scss";
import { login, LOCAL_STORAGE_TOKEN_KEY } from "../src/api/auth";

export const Login: FC = (): JSX.Element => {
  const [state, setState] = useState({
    username: "",
    password: "",
    error: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setState((previousState) => ({
      ...previousState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = await login(state.username, state.password);

    if (token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

      setState((previousState) => ({
        ...previousState,
        error: "",
      }));
    } else {
      setState((previousState) => ({
        ...previousState,
        error: "Invalid username or password",
      }));
    }
  };

  return (
    <>
      <Head>
        <title>Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles["container"]}>
          <div className={styles["form-container"]}>
            <form onSubmit={handleSubmit}>
              <span className={styles["title"]}>Login</span>
              <div className={styles["floating-label"]}>
                <input
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={state.username}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["floating-label"]}>
                <input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={state.password}
                  onChange={handleChange}
                />
              </div>
              {state.error && <p className={styles["error"]}>{state.error}</p>}
              <button type="submit">Log in</button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
