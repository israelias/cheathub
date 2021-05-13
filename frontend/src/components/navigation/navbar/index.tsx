import React, { ReactNode } from 'react';
import {
  Link as RouterLink,
  useHistory,
  useLocation,
} from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Heading,
  useColorModeValue as mode,
  Stack,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
} from '@chakra-ui/react';

import { GoPerson } from 'react-icons/go';

import { AUTH } from '../../../constants/actions.constants';

import { AuthPrompt } from '../../modals/auth-prompt';
import { DeleteModal } from '../../modals/delete-modal';
import { LogoutButton } from '../../shared/logout';
import { ModeSwitch } from '../../shared/mode';
import { BrandButton } from '../../shared/brand-button';
import { useUserContext } from '../../../context/user.context';
import { useProfileData } from '../../../context/profiledata.context';

/**
 * The header component with top-level user actions.
 *
 * Brand, User settings, system config operations are children of this header.
 * @see NavigationArea
 * @file defines the frontend ui for user authentication.
 * @date 2021-05-03
 */
const NavBar: React.FC = () => {
  const [baseSm, baseMd] = useMediaQuery([
    '(min-width: 30em)',
    '(min-width: 48em)',
  ]);
  const { loggedIn, handleSignOut, handleDelete } = useUserContext();
  const history = useHistory();
  const location = useLocation();
  const touring = location.pathname === '/add';
  const [alert, setAlert] = React.useState<boolean>(false);
  const collection = location.pathname.includes('/collections');

  return (
    <>
      <Box
        width="100%"
        bg={mode('#fff', 'gray.900')}
        borderBottom="1px"
        borderColor={mode('#d8d9da', '#7e88c3')}
        px={4}
        zIndex="modal"
      >
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack spacing={8} alignItems="center">
            <Flex align="center" mr={0}>
              <RouterLink to="/">
                <Heading
                  color={mode('rgb(33, 30, 47)', 'teal')}
                  as="span"
                  size="md"
                  letterSpacing="-.1rem"
                >
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
                <Menu>
                  <MenuButton
                    as={IconButton}
                    bg={mode('#fafafa', '#252945')}
                    borderColor={mode('#bdbfc4', '#786e89')}
                    color={mode('#252945', '#fafafa')}
                    _hover={{ bg: mode('#f5f2f0', '#373B53') }}
                    aria-label="Account actions"
                    icon={<Icon as={GoPerson} />}
                    variant="outline"
                  />
                  <MenuList>
                    {AUTH.map((auth) =>
                      auth.label === 'Sign Out' ? (
                        <MenuItem
                          bg={mode('#fafafa', '#252945')}
                          borderColor={mode('#bdbfc4', '#786e89')}
                          color={mode('#252945', '#fafafa')}
                          key={`auth-${auth.label}`}
                          icon={<Icon as={auth.icons.main} />}
                          onClick={handleSignOut}
                        >
                          {auth.label}
                        </MenuItem>
                      ) : (
                        <form
                          id="delete-account"
                          onSubmit={handleDelete}
                        >
                          <MenuItem
                            bg={mode('#fafafa', '#252945')}
                            borderColor={mode('#bdbfc4', '#786e89')}
                            color={mode('#252945', '#fafafa')}
                            key={`auth-${auth.label}`}
                            icon={<Icon as={auth.icons.main} />}
                            onClick={() => setAlert(true)}
                          >
                            {auth.label}
                          </MenuItem>
                        </form>
                      )
                    )}
                  </MenuList>
                </Menu>
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
      <DeleteModal account alert={alert} setAlert={setAlert} />
    </>
  );
};

export default NavBar;
