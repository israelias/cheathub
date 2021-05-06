import React from 'react';
import {
  Flex,
  Heading,
  useMediaQuery,
  useColorModeValue as mode,
} from '@chakra-ui/react';

export const HeaderBox: React.FC<{
  heading: string;
  left?: boolean;
  children?: React.ReactNode;
}> = ({ heading, left, children }) => {
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  return left ? (
    <Flex
      height="62px"
      top={0}
      position="sticky"
      id="terciery-header-left"
      borderBottom="1px"
      borderColor={mode('rgb(235, 236, 237)', '#252945')}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Heading
          as={baseLg ? 'h1' : 'h2'}
          padding={['8px 16px']}
          fontSize="lg"
        >
          {heading}
        </Heading>
        {children}
      </Flex>
    </Flex>
  ) : (
    <Flex
      height="62px"
      position="sticky"
      id="terciary-header-right"
      borderBottom="1px"
      borderColor={mode('rgb(235, 236, 237)', '#252945')}
      bg={mode('#fff', '#141625')}
      top={{ base: '39px', lg: 0 }}
      zIndex={10}
      maxWidth={{ base: '100vw' }}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        padding={['8px 16px']}
      >
        <Heading as={baseLg ? 'h2' : 'h1'} fontSize="lg">
          {heading}
        </Heading>
        {children}
      </Flex>
    </Flex>
  );
};
