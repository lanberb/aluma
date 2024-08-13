import { styled } from "@linaria/react";
import { CSSProperties } from "react";

interface StackProps {
  as?: keyof JSX.IntrinsicElements;
  direction?: CSSProperties["flexDirection"];
  wrap?: CSSProperties["flexWrap"];
  gap?: number;
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
}

export const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: ${({ direction = "inherit" }) => direction};
  flex-wrap: ${({ wrap = "inherit" }) => wrap};
  gap: ${({ gap = 0 }) => gap};
  align-items: ${({ alignItems = "inherit" }) => alignItems};
  justify-content: ${({ justifyContent = "inherit" }) => justifyContent};
`;
