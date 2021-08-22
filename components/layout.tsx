import Header from "./header";
import Footer from "./footer";
import React, { FC } from "react";

import styles from "../styles/layout.module.scss";
import {
  ComponentProperties,
  Components,
  getComponents,
} from "./utils/get-components";

const defaultComponents = {
  Header,
  Footer,
};
type ComponentNames = keyof typeof defaultComponents;

type Properties = {
  overrides?: ComponentProperties<Components, ComponentNames>;
};

const Layout: FC<Properties> = (properties) => {
  const {
    Header: { props: headerProperties },
    Footer: { props: footerProperties },
  } = getComponents(defaultComponents, properties.overrides);

  return (
    <div className="layout">
      <Header {...headerProperties} />
      <div className={styles["content"]}>{properties.children}</div>
      <Footer {...footerProperties} />
    </div>
  );
};

export default Layout;
