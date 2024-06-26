import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import React from "react";
import { Status } from "../../../../libs/type";

const Frame = styled.form<React.FormHTMLAttributes<HTMLFormElement>>`
  display: flex;
  flex-direction: column;
`;

const TextField = styled.input<{ status: Status }>`
  padding: 8px 0;
  width: 100%;
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0.8px;
  background-color: transparent;
  appearance: none;
  outline: none;
  border: none;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${({ status }) => {
    if (status === "success") {
      return "var(--figma-color-border-onsuccess)";
    }
    if (status === "empty" || status === "invalid") {
      return "var(--figma-color-border-ondanger)";
    }
    return "var(--figma-color-border)";
  }};

  &:focus:not(:placeholder-shown) {
    border-bottom-color: var(--figma-color-border-onselected-strong);
  }
`;

const _Checkbox = css`
  all: revert;
  position: relative;
  width: 14px;
  height: 14px;
  border: solid 1px var(--figma-color-border);
  border-radius: 4px;
  margin: 0 4px 0 0;
  background-color: var(--figma-color-bg);
`;
const Checkbox: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...rest }) => {
  return <input type="checkbox" className={_Checkbox} {...rest} />;
};

export const Form = {
  Frame,
  TextField,
  Checkbox,
};
