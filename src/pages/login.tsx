import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/layout";
import useAuth from "../utils/useAuth";

import styles from "../styles/login.module.scss";

export const Login: FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [fields, setFields] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
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
      await login(fields.username, fields.password);

      setError("");
      navigate("/");
    } catch (error) {
      console.error(error);
      // TODO: Check HTTP status before assuming it's a username-password problem
      setError("Authentication failed");
    }
  };

  return (
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
  );
};

export default Login;
