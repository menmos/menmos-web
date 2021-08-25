import React, { FC } from "react";
import styles from "../styles/footer.module.scss";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className={styles["footer"]}>
        <span className={styles["content"]}>&copy; Menmos {currentYear}</span>
      </div>
    </footer>
  );
};

export default Footer;
