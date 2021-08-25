import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import * as auth from "../src/utils/auth";
import styles from "../styles/header.module.scss";

export interface Properties {
  hide?: boolean;
}

const Header: FC<Properties> = (properties) => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
  }, []);

  const logout = async () => {
    auth.logout();

    return router.push("/");
  };

  const Avatar = () => {
    return (
      <div className={styles["avatar"]} onClick={logout} aria-hidden="true">
        <span>A</span>
      </div>
    );
  };

  const Logo = () => {
    return <span className={styles["logo"]}>MENMOS</span>;
  };

  return (
    <header>
      <nav className={styles["nav"]}>
        <Logo />
        {isAuthenticated && <Avatar />}
        {!properties.hide && (
          <div className={styles["content"]}>{properties.children}</div>
        )}
      </nav>
    </header>
  );
};

export default Header;
