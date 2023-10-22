import { FC } from "react";

interface Props {
  size?: [x: number, y: number];
}

export const Spacer: FC<Props> = ({ size = [0, 0] }) => {
  return <div className="spacer" style={{ width: `${size[0]}px`, height: `${size[1]}px` }}></div>;
};
