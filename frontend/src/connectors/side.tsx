import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

export const SideNav: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Flex
    overflowX="hidden"
    overflowY="auto"
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
