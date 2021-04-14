import Header from "./header";
import Footer from "./footer";
import React, { FC } from "react";

import styles from "../styles/layout.module.scss";

const Layout: FC = (properties) => (
  <div className="layout">
    <Header />
    <div className={styles["content"]}>{properties.children}</div>
    <Footer />
  </div>
);

export default Layout;
