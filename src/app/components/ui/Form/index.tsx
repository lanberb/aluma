import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import React from "react";

const Frame = styled.form<React.FormHTMLAttributes<HTMLFormElement>>`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
`;

const _TextField = css`
  appearance: none;
  background-color: var(--figma-color-bg);
  border: solid 1px var(--figma-color-border);
  color: var(--figma-color-text);
  display: block;
  padding: 8px;
  margin-top: 6px;
  width: 100%;
`;
const TextField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...rest }) => {
  return <input type="text" className={_TextField} {...rest} />;
};

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
