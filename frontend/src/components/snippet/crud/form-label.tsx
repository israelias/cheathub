import React from 'react';
import {
  FormLabel,
  useColorModeValue as mode,
} from '@chakra-ui/react';

export const StyledLabel: React.FC<{ label: string }> = ({
  label,
}) => (
  <FormLabel
    p={['0 10px']}
    m={0}
    bg={mode('#f6f6f6', '#252945')}
    borderRadius="md"
    color={mode('"gray.700"', '#bbb')}
    fontWeight="light"
    fontSize="sm"
  >
    {label}
  </FormLabel>
);
