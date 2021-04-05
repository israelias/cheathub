import React from 'react';
import {
  Input,
  FormLabel,
  FormControl
} from '@chakra-ui/react'

interface Props {
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
}) => {
  return (
    <FormControl id={name}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        type="text"
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
}