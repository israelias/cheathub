import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { ToggleButtonBar } from '../reference/toggleDivider';

interface Props {
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const SideNav: React.FC<Props> = ({
  isOpen,
  onToggle,
  children,
}) => (
  <Flex
    overflowY="scroll"
    display={{ base: 'none', md: 'flex' }}
    direction="column"
    css={{
      '&::-webkit-scrollbar': {
        width: '0px',
      },
      '&::-webkit-scrollbar-track': {
        width: '0px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#1c3535',
        borderRadius: '0px',
      },
    }}
  >
    <Box rounded="lg" position="relative" height="100vh">
      {children}
    </Box>
  </Flex>
);
