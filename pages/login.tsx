import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { login } from "../src/api/auth";
import { useRouter } from "next/router";

import styles from "../styles/login.module.scss";
import { isAuthenticated, setToken, setUsername } from "../src/utils/auth";

export const Login: FC = (): JSX.Element => {
  const router = useRouter();

  const [fields, setFields] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated()) {
      void router.push("/");
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setFields((previousState) => ({
      ...previousState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const token = await login(fields.username, fields.password);

      try {
        setToken(token);
        setUsername(fields.username);
        setError("");
        await router.push("/");
      } catch {
        setError("Unexpected error occurred. Try refreshing this page.");
      }
    } catch (error) {
      console.log(error);
      // TODO: Check HTTP status before assuming it's a username-password problem
      setError("Authentication failed");
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
                  value={fields.username}
                  onChange={handleChange}
                />
              </div>
              <div className={styles["floating-label"]}>
                <input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={fields.password}
                  onChange={handleChange}
                />
              </div>
              {error && <p className={styles["error"]}>{error}</p>}
              <button type="submit">Log in</button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
