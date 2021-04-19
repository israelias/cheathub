import React from 'react';
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

import { Link as RouterLink } from 'react-router-dom';
import { PATHS } from '../../constants/paths.constants';

const links = [
  { label: 'Collections', path: '/profile' },
  { label: 'Faves', path: '/faves' },
  { label: 'Explore', path: '/explore' },
  { label: 'Add', path: '/add' },
];

interface Props {
  children: React.ReactNode;
}

export const Content: React.FC<Props> = ({ children }) => {
  const wtf = 'wtf';
  const [buttonId, setButtonId] = React.useState('');

  return (
    <>
      <Flex
        as="section"
        flexDirection="column"
        bg="main.bgColor"
        borderBottom="1px"
        borderColor="yellow.200"
      >
        <Flex
          id="secondary-header"
          zIndex={13}
          top={0}
          position="sticky"
          display={{ base: 'unset', lg: 'none' }}
          // overflow={['scroll hidden']}
          bg={mode('gray.50', 'gray.800')}
          width="100%"
          maxWidth={{ base: '100vw', lg: 'unset' }}
          borderBottom="1px"
          borderColor="gray.200"
        >
          <HStack
            flex={['1 1 auto']}
            pr="16px"
            pl="16px"
            align="center"
            justifyContent="space-between"
            bg={mode('white', 'gray.100')}
          >
            {links.map((link) => (
              <>
                <Button
                  key={link.label}
                  as={RouterLink}
                  // p="16px"
                  fontSize="14px"
                  flex={['1 0 auto']}
                  fontWeight="light"
                  colorScheme="teal"
                  rounded={0}
                  borderRight="1px"
                  borderColor="gray.200"
                  variant="ghost"
                  width="25%"
                  margin={0}
                  marginInline={0}
                  marginBlock={0}
                  style={{ marginInlineStart: '0' }}
                  padding={0}
                  to={link.path}
                  color={mode(
                    buttonId === link.label ? '#fff' : '#1a1b1c',
                    'teal'
                  )}
                  bg={buttonId === link.label ? '#1a1b1c' : '#fff'}
                  _hover={{
                    borderBottom: '1px solid #1a1b1c',
                  }}
                  _pressed={{
                    borderLeft: '1px solid #1a1b1c',
                    borderRight: '1px solid #1a1b1c',
                  }}
                  _active={{
                    transition: 'all .3s ease .1s',
                    boxShadow: 'inset 0px -60px 0px 0px #1a1b1c',

                    color: '#fff',
                  }}
                  onClick={() => {
                    setButtonId(link.label);
                  }}
                  _focus={{
                    boxShadow: 0,
                  }}
                  overflow="hidden"
                >
                  {link.label}
                </Button>
              </>
            ))}
          </HStack>
        </Flex>
        <Flex
          id="terciary-header"
          alignItems="center"
          padding={['8px 16px']}
          justifyContent="space-between"
          bg={mode('#fff', 'gray.600')}
          borderBottom="1px"
          borderColor="gray.200"
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
    </>
  );
};
