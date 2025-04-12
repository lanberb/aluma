import { styled } from "@linaria/react";
// biome-ignore lint/style/useImportType: <explanation>
import React from "react";

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: #2c2c2ccc;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading: React.FC = () => {
  return <Wrapper>生成中...</Wrapper>;
};
