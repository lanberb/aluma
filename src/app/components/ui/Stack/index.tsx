import { styled } from "@linaria/react";
import type { BoxProps } from "../../styles/mixins/box";
import type { MarginProps } from "../../styles/mixins/margin";
import type { PaddingProps } from "../../styles/mixins/padding";
import type { RootProps } from "../../styles/mixins/root";
import type { StackProps } from "../../styles/mixins/stack";

type Props = StackProps & MarginProps & PaddingProps & RootProps & BoxProps;

export const Stack = styled.div<Props>`
  /* Stack */
  display: flex;
  flex-direction: ${({ direction = "inherit" }) => direction};
  flex-wrap: ${({ wrap = "inherit" }) => wrap};
  gap: ${({ gap = 0 }) => gap};
  align-items: ${({ alignItems = "inherit" }) => alignItems};
  justify-content: ${({ justifyContent = "inherit" }) => justifyContent};

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
