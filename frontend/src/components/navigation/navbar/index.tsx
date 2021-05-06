import React, { ReactNode } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Heading,
  useColorModeValue as mode,
  Stack,
  useMediaQuery,
} from '@chakra-ui/react';

import { LogoutButton } from '../../shared/logout';
import { ModeSwitch } from '../../shared/mode';
import { BrandButton } from '../../shared/brand-button';
import { useUserContext } from '../../../context/user.context';

const NavBar: React.FC = () => {
  const [baseSm, baseMd] = useMediaQuery([
    '(min-width: 30em)',
    '(min-width: 48em)',
  ]);
  const { loggedIn } = useUserContext();
  const history = useHistory();
  return (
    <>
      <Box
        width="100%"
        bg={mode('#fff', 'gray.900')}
        borderBottom="1px"
        borderColor={mode('#ddd', '#7e88c3')}
        px={4}
      >
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack spacing={8} alignItems="center">
            <Flex align="center" mr={0}>
              <RouterLink to="/">
                <Heading as="span" size="md" letterSpacing="-.1rem">
                  Cheat-Hub
                </Heading>
              </RouterLink>
            </Flex>
          </HStack>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={6}
          >
            {loggedIn ? (
              <>
                <LogoutButton asLink />
                <ModeSwitch variant="ghost" marginLeft="2" />
              </>
            ) : (
              <>
                <BrandButton onClick={() => history.push('/signin')}>
                  Sign In
                </BrandButton>
                {baseMd && (
                  <BrandButton
                    onClick={() => history.push('/signup')}
                  >
                    Sign Up
                  </BrandButton>
                )}
              </>
            )}
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
