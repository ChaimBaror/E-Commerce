import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface FormFieldProps extends Omit<TextFieldProps, 'fullWidth'> {
  name: string;
  value: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

const FormField = ({
  name,
  value,
  onChange,
  fullWidth = true,
  ...textFieldProps
}: FormFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      {...textFieldProps}
      name={name}
      value={value}
      onChange={handleChange}
      fullWidth={fullWidth}
    />
  );
};

export default FormField;


