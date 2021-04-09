import React from 'react';
import { Link, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  path: string;
  label: string;
}

export const NavLink: React.FC<Props> = ({
  path,
  label,
}) => (
    <>
      <Link
        as={RouterLink}
        p={2}
        to={path ?? '#'}
        fontSize="sm"
        fontWeight={500}
        color={useColorModeValue('gray.600', 'gray.200')}
        _hover={{
          textDecoration: 'none',
          color: useColorModeValue('gray.800', 'white'),
        }}
      >
        {label}
      </Link>
    </>
  );
