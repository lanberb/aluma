import { styled } from "@linaria/react";
import React from "react";

interface Props {
  size: [x: number, y: number];
}
const _Spacer = styled.div<Props>`
  width: ${({ size }) => (size ? `${size[0]}px` : "")};
  height: ${({ size }) => (size ? `${size[1]}px` : "")};
  position: relative;
`;
export const Spacer: React.FC<Props> = ({ size = [0, 0] }) => {
  return <_Spacer aria-hidden size={size} />;
};
