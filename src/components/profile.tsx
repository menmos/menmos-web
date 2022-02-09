import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../router/useAuth";

import styles from "../styles/profile.module.scss";

type Properties = {
  username: string;
};

const Profile: FC<Properties> = (properties) => {
  const navigate = useNavigate();

  const onClick = async () => {
    await logout();
    navigate("/login");
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
        <button onClick={onClick}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
