import { styled } from "@linaria/react";
import type { BoxProps } from "../../styles/mixins/box";
import type { MarginProps } from "../../styles/mixins/margin";
import type { PaddingProps } from "../../styles/mixins/padding";
import type { RootProps } from "../../styles/mixins/root";

type Props = BoxProps & RootProps & MarginProps & PaddingProps;

export const Box = styled.div<Props>`
  /* Box */
  width: ${({ width = "inherit" }) => width};
  height: ${({ height = "inherit" }) => height};
  max-width: ${({ maxWidth = "inherit" }) => maxWidth};
  max-height: ${({ maxHeight = "inherit" }) => maxHeight};
  min-width: ${({ minWidth = "inherit" }) => minWidth};
  min-height: ${({ minHeight = "inherit" }) => minHeight};

  /* Margin */
  margin-top: ${({ mt = "inherit" }) => mt};
  margin-right: ${({ mr = "inherit" }) => mr};
  margin-bottom: ${({ mb = "inherit" }) => mb};
  margin-left: ${({ ml = "inherit" }) => ml};

  /* Padding */
  padding-top: ${({ pt = "inherit" }) => pt};
  padding-right: ${({ pr = "inherit" }) => pr};
  padding-bottom: ${({ pb = "inherit" }) => pb};
  padding-left: ${({ pl = "inherit" }) => pl};
`;
