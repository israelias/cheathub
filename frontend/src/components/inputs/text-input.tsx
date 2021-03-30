import { FieldProps, getIn } from "formik";
import React from "react";
import { Input } from '@chakra-ui/react'

export const TextFormField: React.FC<FieldProps> = ({
  field,
  form,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <Input
      isFullWidth
      margin="normal"
      placeholder={errorText}
      isInvalid={!!errorText}
      {...field}
      {...props}
    />
  );
};