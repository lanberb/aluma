import type { CSSProperties } from "react";

export interface TextProps {
  color?: CSSProperties["color"];
  ff?: CSSProperties["fontFamily"];
  fw?: CSSProperties["fontWeight"];
  fz?: CSSProperties["fontSize"];
  lh?: CSSProperties["lineHeight"];
  ls?: CSSProperties["letterSpacing"];
}
