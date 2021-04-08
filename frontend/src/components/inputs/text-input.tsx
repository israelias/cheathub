import { FieldProps, getIn } from 'formik';
import React from 'react';
import { Input as InputRev } from '@chakra-ui/react';

export const TextFormField: React.FC<FieldProps> = ({
  field,
  form,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <InputRev
      isFullWidth
      margin="normal"
      placeholder={errorText}
      isInvalid={!!errorText}
      {...field}
      {...props}
    />
  );
};
