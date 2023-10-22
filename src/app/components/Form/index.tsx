import { FC, FormEvent, FormHTMLAttributes, InputHTMLAttributes, ReactNode, useCallback, useState } from "react";

interface FrameProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}
const Frame: FC<FrameProps> = ({ children }) => {
  return <form className="form__frame">{children}</form>;
};

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  errorMessage?: string;
  validator?: (text: string) => boolean;
}
const TextField: FC<TextFieldProps> = ({ id, label, errorMessage, onInput, validator, ...rest }) => {
  const [successful, setSuccessful] = useState(true);
  const handleOnInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    onInput?.(event);
    setSuccessful((v) => validator?.(event.currentTarget.value) || v);
  }, []);
  return (
    <div>
      {label && (
        <label htmlFor={id} className="form__label">
          {label}
        </label>
      )}
      <input id={id} className="form__textField" type="text" onInput={handleOnInput} {...rest} />
      {!successful && errorMessage && <p className="form__textFieldMessage">{errorMessage}</p>}
    </div>
  );
};

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}
const Checkbox: FC<CheckboxProps> = ({ id, label, ...rest }) => {
  return (
    <div className="form__checkboxContainer">
      <input id={id} className="form__checkbox" type="checkbox" {...rest} />
      <label className="form__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export const Form = {
  Frame,
  TextField,
  Checkbox,
};
