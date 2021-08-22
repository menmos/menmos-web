import React, { FC } from "react";

export interface Properties {
  hide?: boolean;
}

const Header: FC<Properties> = (properties) => (
  <header>
    <nav className="header">
      {!properties.hide && <div>{properties.children}</div>}
    </nav>
  </header>
);

export default Header;
