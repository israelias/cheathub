import { Box, Flex, Heading } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export const Content: React.FC<Props> = ({ children }) => (
  <Flex flex="1" overflowY="auto" bg="main.bgColor">
    <Box h="full" w="full">
      <Box p={4} height="100vh">
        <Heading as="h5">Content</Heading>
        {children}
      </Box>
    </Box>
  </Flex>
);
