import {
  Box,
  Flex,
  Heading,
  useColorModeValue as mode,
  Input,
  Select,
  Button,
  HStack,
} from '@chakra-ui/react';
import { PATHS } from '../../constants/paths.constants';

interface Props {
  children: React.ReactNode;
}

export const Content: React.FC<Props> = ({ children }) => (
  <Flex as="section" flexDirection="column" bg="main.bgColor">
    <Flex
      zIndex={13}
      top={0}
      position="sticky"
      display={{ base: 'unset', lg: 'none' }}
      // overflow={['scroll hidden']}
      bg={mode('gray.50', 'gray.800')}
      width="100%"
      boxShadow={['rgb(235 236 237) 0px -1px inset']}
      maxWidth={{ base: '100vw', lg: 'unset' }}
    >
      <HStack
        flex={['1 1 auto']}
        pr="16px"
        pl="16px"
        align="center"
        justifyContent="space-between"
        bg={mode('white', 'gray.100')}
      >
        <Button
          p="16px"
          fontSize="15px"
          flex={['1 0 auto']}
          fontWeight={600}
          colorScheme="teal"
          color={mode('rgb(103, 113, 122)', 'teal')}
          variant="ghost"
        >
          Collections
        </Button>
        <Button
          p="16px"
          fontSize="15px"
          flex={['1 0 auto']}
          fontWeight={600}
          colorScheme="teal"
          color={mode('rgb(103, 113, 122)', 'teal')}
          variant="ghost"
        >
          Faves
        </Button>
        <Button
          p="16px"
          fontSize="15px"
          flex={['1 0 auto']}
          fontWeight={600}
          colorScheme="teal"
          color={mode('rgb(103, 113, 122)', 'teal')}
          variant="ghost"
        >
          Explore
        </Button>
        <Button
          p="16px"
          fontSize="15px"
          flex={['1 0 auto']}
          fontWeight={600}
          colorScheme="teal"
          color={mode('rgb(103, 113, 122)', 'teal')}
          variant="ghost"
          rounded={0}
          _hover={{ borderBottom: '1px solid #000' }}
        >
          Add
        </Button>
      </HStack>
    </Flex>
    <Flex
      alignItems="center"
      padding={['8px 16px']}
      borderBottom={['1px solid']}
      borderColor={['rgb(235, 236, 237)']}
      justifyContent="space-between"
      bg={mode('gray.200', 'gray.600')}
    >
      <Flex position="relative" alignItems="center">
        <Select
          size="sm"
          bg={mode('#d6d6be2', 'gray.50')}
          variant="outline"
          borderRadius="32px"
          fontWeight={600}
          fontSize="15px"
          placeholder="Tags"
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Flex>
      <Input
        size="sm"
        p={['8px 16px']}
        color={mode('gray.100', 'gray.800')}
        bg={mode('#d6d6be2', 'gray.50')}
        width="100%"
        maxWidth="240px"
        fontWeight={600}
        fontSize={{ base: '16px', lg: '15px' }}
        borderRadius="32px"
        border={['1px solid rgb(235, 236, 237)']}
        transition={['all 0.2s ease-in-out 0s']}
        placeholder="Search"
      />
    </Flex>

    <>{children}</>
  </Flex>
);
