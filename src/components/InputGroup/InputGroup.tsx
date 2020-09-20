import React, { FC, useState } from 'react';
import { InputGroupLabel, InputGroupControl, InputGroupInput } from './InputGroupStyled';

export enum InputTypes {
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
}

interface InputGroupProps {
  label?: string;
  value: string;
  formControlName: string;
  onChange: (key: string, value: string) => void;
  type?: InputTypes;
  placeholder?: string;
}

const InputGroup: FC<InputGroupProps> = ({ formControlName, type = InputTypes.TEXT, value, onChange, label, placeholder }) => {
  const [focused, setFocused] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => onChange(formControlName, event.target.value);

  return (
    <InputGroupControl>
      <InputGroupInput
        type={type}
        value={value}
        focused={focused}
        onChange={handleOnChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder ?? label}
      />
      {label && (
        <InputGroupLabel empty={!value} focused={focused}>
          {label}
        </InputGroupLabel>
      )}
    </InputGroupControl>
  );
};

export default InputGroup;
