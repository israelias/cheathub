import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { ToggleButtonBar } from './toggleDivider';

interface Props {
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const SideNav: React.FC<Props> = ({
  isOpen,
  onToggle,
  children,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      display={{ base: 'none', md: 'flex' }}
      bg={mode('gray.50', 'gray.800')}
      direction="column"
      borderRightWidth="1px"
      width="72"
    >
      <Box p={4} position="relative" height="100vh">
        <Heading as="h5">Navigation</Heading>
        <ToggleButtonBar
          isOpen={isOpen}
          onToggle={onToggle}
        />
        <Button mt={6} onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>

        {children}
      </Box>
    </Flex>
  );
};
