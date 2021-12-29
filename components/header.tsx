import React, { FC, useEffect, useState } from "react";

import * as auth from "../src/utils/auth";

import styles from "../styles/header.module.scss";
import Profile from "./profile";

export interface Properties {
  hide?: boolean;
}

const Header: FC<Properties> = (properties) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
  }, []);

  const Logo = () => {
    return <span className={styles["logo"]}>MENMOS</span>;
  };

  return (
    <header className={styles["header"]}>
      <nav>
        <Logo />
        {isAuthenticated && (
          <Profile username={auth.getUsername() || "Username"} />
        )}
        {!properties.hide && (
          <div className={styles["content"]}>{properties.children}</div>
        )}
      </nav>
    </header>
  );
};

export default Header;
