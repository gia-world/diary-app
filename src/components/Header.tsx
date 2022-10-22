import React, { ReactElement, ReactNode } from "react";

interface Header {
  headerText: string;
  left?: ReactElement;
  right?: ReactElement|ReactNode;
}

const Header = ({ headerText, left, right }: Header) => {
  return (
    <header className="Header">
      <div className="Header__btn--left">{left}</div>
      <div className="Header__text">{headerText}</div>
      <div className="Header__btn--right">{right}</div>
    </header>
  );
};

export default Header;
