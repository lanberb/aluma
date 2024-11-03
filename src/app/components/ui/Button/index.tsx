import { css } from "@linaria/core";
// biome-ignore lint/style/useImportType: <explanation>
import React from "react";

const style = css`
  cursor: pointer;
  display: block;
  padding: 12px 0;
  border-radius: 8px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.2px;
  line-height: 100%;
  color: var(--figma-color-text);
  width: 100%;
  background-color: var(--figma-color-bg-brand);

  &:hover {
    opacity: 0.64;
  }

  &:disabled {
    color: var(--figma-color-border-disabled-strong);
    background-color: var(--figma-color-bg-disabled);
    pointer-events: none;
  }
`;

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, type = "button", ...rest }) => {
  return (
    <button className={style} type={type} {...rest}>
      {children}
    </button>
  );
};
