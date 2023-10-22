import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}
export const Button: FC<Props> = ({ children, type = "button", ...rest }) => {
  return (
    <button className="button" type={type} {...rest}>
      {children}
    </button>
  );
};
