import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { ToggleButtonBar } from '../../reference/toggleDivider';

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
      // position="fixed"
      overflowY="scroll"
      display={{ base: 'none', md: 'flex' }}
      bg={mode('#ffff', 'gray.800')}
      direction="column"
      borderRightWidth="1px"
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
      <Box
        rounded="lg"
        mt={6}
        bg={mode('#a1a2a3', 'gray.800')}
        border={['1px solid']}
        borderColor={mode('gray.100', '#e4e4e4')}
        position="relative"
        height="100vh"
      >
        {/* <Heading as="h5">Navigation</Heading> */}
        {/* <ToggleButtonBar isOpen={isOpen} onToggle={onToggle} /> */}

        {children}
      </Box>
    </Flex>
  );
};
