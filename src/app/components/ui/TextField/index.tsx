import { styled } from "@linaria/react";
import React, { HTMLAttributes } from "react";
import { Pending } from "../../../assets/icons/Pending";
import { Success } from "../../../assets/icons/Success";
import { Error } from "../../../assets/icons/Error";
import { Spacer } from "../Spacer";
import { Status } from "../../../../libs/type";
import { Form } from "../Form";

const Label = styled.p`
  margin-bottom: 8px;
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0.8px;
`;

const Flexbox = styled.div`
  display: flex;
  align-items: center;
`;

const StatusText = styled.p<{ status: Status }>`
  color: ${({ status }) => {
    if (status === "success") {
      return "var(--figma-color-text-success)";
    }
    if (status === "empty" || status === "invalid") {
      return "var(--figma-color-text-danger)";
    }
    return "var(--figma-color-text-tertiary)";
  }};
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0.8px;
`;

interface Props extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  status?: Partial<Status>;
}

export const TextField: React.FC<Props> = ({ label, placeholder = "", status = "pending", onInput, ...rest }) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <Form.TextField placeholder={placeholder} status={status} onInput={onInput} {...rest} />
      <Spacer size={[0, 4]} />
      <Flexbox>
        {status === "pending" && (
          <>
            <Pending />
            <Spacer size={[4, 0]} />
            <StatusText status={status}>入力を待っています</StatusText>
          </>
        )}
        {status === "success" && (
          <>
            <Success />
            <Spacer size={[4, 0]} />
            <StatusText status={status}>素晴らしいです🌱</StatusText>
          </>
        )}
        {(status === "empty" || status === "invalid") && (
          <>
            <Error />
            <Spacer size={[4, 0]} />
            <StatusText status={status}>空文字は使えません</StatusText>
          </>
        )}
      </Flexbox>
    </div>
  );
};
