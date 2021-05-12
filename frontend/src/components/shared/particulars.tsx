import {
  Box,
  Text,
  Flex,
  useMediaQuery,
  Grid,
  useColorModeValue as mode,
  Tooltip,
  IconButton,
  Icon,
  useColorMode,
  Heading,
} from '@chakra-ui/react';

import { ACTIONS, MODES } from '../../constants/actions.constants';
import { MotionBox } from './motion';

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
  children?: React.ReactNode;
}> = ({ heading, children }) => (
  <Box
    display="flex"
    // position="sticky"
    zIndex="banner"
    flexDirection="column"
    bg={mode('#ebeced', '#0b0914')}
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
    </Text>
  </Box>
);

const PrimaryFooter: React.FC<{
  heading?: string;
  subheading?: string;
}> = ({ heading, subheading }) => (
  <Box
    display="flex"
    flexDirection="column"
    // width="100%"
    bg={mode('#ebeced', '#0b0914')}
    bottom={0}
    mt="auto"
  >
    <Text
      mt="auto"
      width="100%"
      // borderBottom={['1px solid']}
      p={2}
      as="span"
      fontSize="xs"
      // color="gray.600"
      borderColor={mode('#d8d9da', '#252945')}
      // fontWeight="medium"
      pt={4}
      // textAlign="center"
      // color="gray.600"
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
      // color="gray.600"
      borderColor={mode('#d8d9da', '#252945')}
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
      // color="gray.600"
      borderColor={mode('#d8d9da', '#252945')}
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
      borderColor={mode('#d8d9da', '#252945')}
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
        borderColor={mode('#d8d9da', '#252945')}
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
      // width="100%"
      bg={mode('#ebeced', '#0b0914')}
      bottom={0}
      mt="auto"
      pt="auto"
      position="sticky"
      // width={['calc(100vw - 96px)']}
      // width="100%"
      // width={{ base: '100%', lg: 'calc(100vw - 96px)' }}
      zIndex="banner"

      // mr="20px"
    >
      <Text
        width="100%"
        borderTop={['1px solid']}
        p={1}
        as="span"
        fontSize="xs"
        // color="gray.600"
        borderColor={mode('#d8d9da', '#252945')}
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
        // color="gray.600"
        borderColor={mode('#d8d9da', '#252945')}
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
        borderColor={mode('#d8d9da', '#252945')}
        fontWeight="light"
      >
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={2}
          // mt={8}
          as="span"
          fontSize="xs"
          color="gray.600"
          textAlign="center"
          borderColor={mode('#d8d9da', '#252945')}
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
