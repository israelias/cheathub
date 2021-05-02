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
    {label && (
      <FormLabel color="gray.600" fontWeight="light" fontSize="sm">
        {label}
      </FormLabel>
    )}
    <Select value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  </FormControl>
);
