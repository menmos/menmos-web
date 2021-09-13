import { useRouter } from "next/router";
import React, { FC } from "react";

import * as auth from "../src/utils/auth";

import styles from "../styles/profile.module.scss";

type Properties = {
  username: string;
};

const Profile: FC<Properties> = (properties) => {
  const router = useRouter();

  const logout = async () => {
    auth.logout();

    return router.push("/");
  };

  const Avatar = () => {
    return (
      <div className={styles["avatar"]} aria-hidden="true">
        <span>{properties.username.charAt(0).toUpperCase()}</span>
      </div>
    );
  };

  return (
    <div className={styles["profile"]}>
      <Avatar />
      <div className={styles["profile-actions"]}>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
