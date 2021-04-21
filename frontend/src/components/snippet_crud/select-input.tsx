import React from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  SelectProps,
} from '@chakra-ui/react';

interface Props extends SelectProps {
  name?: string;
  label?: string;
  value?: string;
  options: Options[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  // onChange: React.ChangeEventHandler<HTMLSelectElement>;

  // onChange: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectInput: React.FC<Props> = ({
  name,
  label,
  value,
  options,
  onChange,
  ...props
}) => (
  <FormControl id={name}>
    {label && <FormLabel>{label}</FormLabel>}
    <Select
      value={value}
      // onChange={(e) => onChange(e.target.value)}
      onChange={onChange}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  </FormControl>
);
