import {
  Box,
  Text,
  Flex,
  useMediaQuery,
  useColorModeValue as mode,
  Heading,
} from '@chakra-ui/react';

// TODO Adjust footer horizontals in light-mode to have consistent bg color

const PrimaryHeader: React.FC<{
  heading?: string;
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
      bg={mode('#fff', '#141625')}
      borderColor={mode('rgb(235, 236, 237)', '#252945')}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        pr="8px"
      >
        <Heading
          as={baseLg ? 'h1' : 'h2'}
          padding={['8px 16px']}
          fontSize={{ base: 'xs', lg: 'lg' }}
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
      bg={mode('#fafafa', '#0b0914')}
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
        <Heading
          as={baseLg ? 'h2' : 'h1'}
          fontSize={{ base: 'md', lg: 'lg' }}
        >
          {heading}
        </Heading>
        {children}
      </Flex>
    </Flex>
  );
};

const SecondaryHeader: React.FC<{
  heading?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  moreChildren?: React.ReactNode;
}> = ({ heading, children, icon, moreChildren }) => (
  <Box
    display="flex"
    zIndex="banner"
    flexDirection="column"
    bg={mode('#fbfbfb', '#0b0914')}
    borderColor={mode('#9992b6', '#b6b1cb')}
    top={0}
    mb="auto"
  >
    <Box
      width="100%"
      borderBottom={['1px solid']}
      p={2}
      fontSize="xs"
      borderColor={mode('#bdbfc4', '#8a8c8f')}
      mt={4}
      textAlign="start"
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="wider"
      display="flex"
      justifyContent="space-between"
      alignItems="baseline"
    >
      {icon}
      {heading}
      {children}
    </Box>
    <Box
      width="100%"
      borderBottom={['1px solid']}
      p={2}
      fontSize="xs"
      borderColor={mode('#9992b6', '#b6b1cb')}
      textAlign="start"
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="wider"
    >
      {' '}
    </Box>
    <Text
      width="100%"
      borderBottom={['1px solid']}
      p={2}
      // mb={6}
      fontSize="sm"
      borderColor={mode('#bdbfc4', '#8a8c8f')}
      fontWeight="light"
    >
      {' '}
      {moreChildren}
    </Text>
  </Box>
);

const PrimaryFooter: React.FC<{
  heading?: string;
  subheading?: string | React.ReactNode;
}> = ({ heading, subheading }) => (
  <Box
    display="flex"
    flexDirection="column"
    bg={mode('#ebeced', '#8a8c8f')}
    bottom={0}
    mt="auto"
  >
    <Text
      mt="auto"
      width="100%"
      p={2}
      as="span"
      fontSize="xs"
      bg={mode('#f6f6f6', '#0b0914')}
      borderColor={mode('#d8d9da', '#b6b1cb')}
      pt={4}
      textAlign="start"
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="wider"
    >
      {heading}
    </Text>
    <Text
      width="100%"
      borderTop={['1px solid']}
      p={2}
      as="span"
      fontSize="xs"
      bg={mode('#fafafa', '#0b0914')}
      borderColor={mode('#d8d9da', '#8a8c8f')}
      textAlign="start"
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="wider"
    >
      {' '}
    </Text>
    <Text
      width="100%"
      borderTop={['1px solid']}
      p={2}
      as="span"
      fontSize="xs"
      bg={mode('#fafafa', '#0b0914')}
      borderColor={mode('#d8d9da', '#b6b1cb')}
      textAlign="start"
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="wider"
    >
      {' '}
    </Text>
    <Text
      width="100%"
      borderTop={['1px solid']}
      pt="24px"
      pb="16px"
      as="span"
      fontSize="xs"
      color="gray.600"
      textAlign="center"
      bg={mode('#fafafa', '#0b0914')}
      borderColor={mode('#9992b6', '#252945')}
      fontWeight="light"
    >
      <Text
        width="100%"
        p={2}
        mt={8}
        as="span"
        fontSize="xs"
        color="gray.600"
        textAlign="center"
        bg={mode('#fafafa', '#0b0914')}
        borderColor={mode('#bdbfc4', '#252945')}
        fontWeight="light"
      >
        {subheading}
      </Text>
    </Text>
  </Box>
);

const SecondaryFooter: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      bg={mode('#ebeced', '#8a8c8f')}
      bottom={0}
      mt="auto"
      pt="auto"
      // ml="-8px"
      // mr="-16px"
      // ml={baseLg ? 0 : '-8px'}
      // mr={baseLg ? 0 : '-8px'}
      position="sticky"
      zIndex="banner"
    >
      <Text
        width="100%"
        borderTop={['1px solid']}
        p={1}
        as="span"
        fontSize="xs"
        bg={mode('#fafafa', '#0b0914')}
        borderColor={mode('#d8d9da', '#b6b1cb')}
        textAlign="start"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        {' '}
      </Text>
      <Text
        width="100%"
        borderTop={['1px solid']}
        p={1}
        as="span"
        fontSize="xs"
        bg={mode('#ebeced', '#0b0914')}
        borderColor={mode('#d8d9da', '#8a8c8f')}
        textAlign="start"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        {' '}
      </Text>
      <Box
        width="100%"
        borderTop={['1px solid']}
        pt="10px"
        pb="16px"
        as="span"
        fontSize="xs"
        color="gray.600"
        textAlign="center"
        bg={mode('#fafafa', '#0b0914')}
        borderColor={mode('#9992b6', '#b6b1cb')}
        fontWeight="light"
      >
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={2}
          as="span"
          fontSize="xs"
          color="gray.600"
          textAlign="center"
          bg={mode('#fafafa', '#0b0914')}
          borderColor={mode('#bdbfc4', '#252945')}
          fontWeight="light"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export {
  PrimaryHeader,
  SecondaryHeader,
  PrimaryFooter,
  SecondaryFooter,
};
