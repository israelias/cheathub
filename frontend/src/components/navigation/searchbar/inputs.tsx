import React from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  SelectProps,
  Input,
  InputProps,
} from '@chakra-ui/react';

interface SelectInputProps extends SelectProps {
  name?: string;
  label?: string;
  value?: string;
  options: Options[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  value,
  options,
  onChange,
  ...props
}) => (
  <FormControl id={name}>
    {label && <FormLabel>{label}</FormLabel>}
    <Select value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  </FormControl>
);

interface TextInputProps extends InputProps {
  name?: string;
  label?: string;
  placeHolder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
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
