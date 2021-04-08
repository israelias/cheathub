import { FieldProps, getIn } from 'formik';
import React from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@chakra-ui/react';

export const SelectFormField: React.FC<
  FieldProps & {
    label?: string;
    options: Array<{ label: string; value: string }>;
  }
> = ({ field, form, label, options, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <FormControl isFullWidth isInvalid={!!errorText}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select isFullWidth {...field} {...props}>
        {options.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </Select>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};
