import React from 'react';
import {
  Box,
  Stack,
  Icon,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import {
  IoMdArrowDropright,
  IoMdArrowDropleft,
} from 'react-icons/io';
import { VscGripper } from 'react-icons/vsc';

interface Props {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const ToggleButtonBar: React.FC<Props> = ({
  isOpen,
  onToggle,
}) => (
  <Box
    position="absolute"
    top={0}
    bottom={0}
    right={0}
    height="100%"
    borderLeft="1px"
    borderColor={mode('gray.200', 'gray.800')}
    m={0}
    p={0}
  >
    <Box
      as="button"
      bgColor={mode('gray.100', 'gray.600')}
      width="100%"
      height="100%"
      m={0}
      p={0}
      onClick={onToggle}
      outline="none"
    >
      <Stack spacing={1} m={0} p={0}>
        <Icon
          color={mode('gray.500', 'gray.300')}
          as={VscGripper}
        />
        <Icon
          color={mode('gray.500', 'gray.300')}
          as={
            isOpen ? IoMdArrowDropleft : IoMdArrowDropright
          }
        />
        <Icon
          color={mode('gray.500', 'gray.300')}
          as={VscGripper}
        />
      </Stack>
    </Box>
  </Box>
);
