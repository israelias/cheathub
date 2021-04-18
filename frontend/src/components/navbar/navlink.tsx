import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, useColorModeValue as mode } from '@chakra-ui/react';

export const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    as={RouterLink}
    px={2}
    py={1}
    rounded="md"
    _hover={{
      textDecoration: 'none',
      bg: mode('gray.200', 'gray.700'),
    }}
    to="#"
  >
    {children}
  </Link>
);
