import React from 'react';
import {
  Input,
  InputProps,
  FormLabel,
  FormLabelProps,
  FormControl,
  FormControlProps,
} from '@chakra-ui/react';

interface Props extends InputProps {
  name?: string;
  label?: string;
  placeHolder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<Props> = ({
  name,
  label,
  placeHolder,
  value,
  onChange,
  ...props
}) => (
  <FormControl id={name}>
    {label && <FormLabel>{label}</FormLabel>}
    <Input
      type="text"
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
      {...props}
    />
  </FormControl>
);
