import React from 'react';
import {
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

interface Props {
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
}) => {
    return (
      <FormControl id={name}>
        {label && <FormLabel>{label}</FormLabel>}
        <Select
          value={value}
          onChange={onChange}
          >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}>
                {option.label}
            </option>
          ))}
        </Select>
    </FormControl>
  );
}