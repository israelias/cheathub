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

import { DeleteModal } from '../../modals/delete-modal';

import { useUserContext } from '../../../context/user.context';

/**
 * The header component with top-level user actions.
 *
 * Brand, User settings, system config operations are children of this header.
 * @see NavigationArea
 * @file defines the frontend ui for user authentication.
 * @date 2021-05-03
 */
const AccountMenu: React.FC<{ dashboard?: boolean }> = ({
  dashboard,
}) => {
  const [baseSm, baseMd] = useMediaQuery([
    '(min-width: 30em)',
    '(min-width: 48em)',
  ]);
  const { loggedIn, handleSignOut, handleDelete } = useUserContext();
  const history = useHistory();
  const location = useLocation();

  const [alert, setAlert] = React.useState<boolean>(false);

  return (
    <>
      <>
        <Menu placement={dashboard ? 'right' : 'bottom'}>
          <MenuButton
            as={IconButton}
            bg={mode('#fafafa', '#252945')}
            borderColor={mode('#bdbfc4', '#786e89')}
            color={mode('#252945', '#fafafa')}
            _hover={{ bg: mode('#f5f2f0', '#373B53') }}
            _active={{ bg: mode('#f5f2f0', '#373B53') }}
            aria-label="Account actions"
            icon={<Icon as={GoPerson} />}
            variant="outline"
            size={dashboard ? 'sm' : 'md'}
          />
          <MenuList
            bg={mode('#fafafa', '#252945')}
            borderColor={mode('#bdbfc4', '#786e89')}
          >
            {AUTH.map((auth) =>
              auth.label === 'Sign Out' ? (
                <MenuItem
                  bg={mode('#fafafa', '#252945')}
                  borderColor={mode('#bdbfc4', '#786e89')}
                  _hover={{ bg: mode('#f5f2f0', '#373B53') }}
                  _focus={{ bg: mode('#f5f2f0', '#373B53') }}
                  color={mode('#252945', '#fafafa')}
                  key={`auth-${auth.label}`}
                  icon={<Icon as={auth.icons.main} />}
                  onClick={handleSignOut}
                >
                  {auth.label}
                </MenuItem>
              ) : (
                <form id="delete-account" onSubmit={handleDelete}>
                  <MenuItem
                    bg={mode('#fafafa', '#252945')}
                    borderColor={mode('#bdbfc4', '#786e89')}
                    color={mode('#252945', '#fafafa')}
                    _hover={{
                      bg: mode('#f5f2f0', '#373B53'),
                    }}
                    _focus={{
                      bg: mode('#f5f2f0', '#373B53'),
                    }}
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
      </>

      <DeleteModal account alert={alert} setAlert={setAlert} />
    </>
  );
};

export default AccountMenu;
