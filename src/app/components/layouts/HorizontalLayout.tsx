import { styled } from "@linaria/react";
import React from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;

  & > *:first-child {
    border-right: solid 1px var(--figma-color-border);
  }
`;

interface Props {
  children: [JSX.Element, JSX.Element];
}

export const HorizontalLayout: React.FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
