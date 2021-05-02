import React from 'react';
import { Box } from '@chakra-ui/react';
import {
  CheckIcon,
  InfoIcon,
  WarningIcon,
  WarningTwoIcon,
} from '@chakra-ui/icons';

export const Prompt: React.FC<{
  message: string;
  error?: boolean;
  warning?: boolean;
  info?: boolean;
}> = ({ message, error, warning, info }) => (
  <Box
    bg="#fff"
    border={['1px solid #bbb']}
    p="10px"
    borderRadius="10px"
  >
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="50px"
      borderRadius="10px"
      bg="#f6f6f6"
      p="10px"
    >
      {message}
      {error ? (
        <WarningTwoIcon />
      ) : warning ? (
        <WarningIcon />
      ) : info ? (
        <InfoIcon />
      ) : (
        <CheckIcon />
      )}
    </Box>
  </Box>
);
