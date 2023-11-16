import React from "react";
import { css } from "@linaria/core";

const style = css`
  background-color: var(--figma-color-bg-secondary);
  border-radius: 9999px;
  padding: auto 0;
  text-align: center;
  width: 100%;
  height: 36px;
  font-size: 12px;
  color: var(--figma-color-text);

  &:hover {
    border: solid 2px var(--figma-color-border-selected);
  }
`;

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, type = "button", ...rest }) => {
  return (
    <button className={style} type={type} {...rest}>
      {children}
    </button>
  );
};
