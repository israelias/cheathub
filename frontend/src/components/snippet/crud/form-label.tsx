import React from 'react';
import { FormLabel } from '@chakra-ui/react';

export const StyledLabel: React.FC<{ label: string }> = ({
  label,
}) => (
  <FormLabel
    p={['0 10px']}
    m={0}
    bg="#f6f6f6"
    borderRadius="md"
    color="gray.700"
    fontWeight="light"
    fontSize="sm"
  >
    {label}
  </FormLabel>
);
