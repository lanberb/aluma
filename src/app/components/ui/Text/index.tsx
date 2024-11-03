import { styled } from "@linaria/react";
import type { LabelHTMLAttributes } from "react";
import type { RootProps } from "../../styles/mixins/root";
import type { TextProps } from "../../styles/mixins/text";

type Props = RootProps & TextProps & LabelHTMLAttributes<HTMLLabelElement>;

export const Text = styled.div<Props>`
  color: ${({ color = "inherit" }) => color};
  font-family: ${({ ff = "inherit" }) => ff};
  font-weight: ${({ fw = "inherit" }) => fw};
  font-size: ${({ fz = "inherit" }) => fz};
  line-height: ${({ lh = "inherit" }) => lh};
  letter-spacing: ${({ ls = "inherit" }) => ls};
`;
