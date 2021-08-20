import React from 'react';
import { Box, useColorModeValue as mode } from '@chakra-ui/react';
import {
  CheckIcon,
  InfoIcon,
  WarningIcon,
  WarningTwoIcon,
} from '@chakra-ui/icons';
/**
 * The main prompt for all messages following fetch methods.
 *
 * @see UserProvider
 * @see DataHandlerProvider
 * @see ProfileDataProvider
 * @file defines feedback toast that relays message from backend.
 * @date 2021-05-03
 */
export const Prompt: React.FC<{
  message: string | any;
  error?: boolean;
  warning?: boolean;
  info?: boolean;
}> = ({ message, error, warning, info }) => (
  <Box
    bg={mode('#fff', '#141625')}
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
      bg={mode('#f6f6f6', '#252945')}
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
