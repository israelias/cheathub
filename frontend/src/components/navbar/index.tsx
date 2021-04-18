/* eslint-disable react/no-array-index-key */
import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Heading,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue as mode,
  Stack,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { PATHS } from '../../constants/paths.constants';
import { NavLink } from '../shared/link';
import { LogoutButton } from './logout';
import { checkAuth } from '../../lib/checkAuth';
import { useUserContext } from '../../context/user.context';

interface NavBarProps {
  IloggedIn?: Boolean;
  Iusername?: String;
}

const NavBar: React.FC<NavBarProps> = ({ IloggedIn, Iusername }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { username } = useUserContext();
  const loggedIn = checkAuth({ username });

  return (
    <>
      <Box
        position="fixed"
        width="100%"
        bg={mode('gray.100', 'gray.900')}
        px={4}
      >
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: !isOpen ? 'none' : 'inherit' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Flex align="center" mr={0}>
              <Heading as="h1" size="md" letterSpacing="-.1rem">
                Cheat-Hub
              </Heading>
            </Flex>
            {loggedIn ? (
              <HStack
                as="nav"
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                {PATHS.map((link, i) => (
                  <NavLink
                    key={i}
                    path={link.path}
                    label={link.label}
                  />
                ))}
              </HStack>
            ) : (
              <p>You are not logged in.</p>
            )}
          </HStack>

          {loggedIn ? (
            <LogoutButton asLink />
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify="flex-end"
              direction="row"
              spacing={6}
            >
              <Button
                as={RouterLink}
                fontSize="sm"
                fontWeight={400}
                variant="link"
                to="/login"
              >
                Sign In
              </Button>
              <Button
                as={RouterLink}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="pink.400"
                to="/registration/signup"
                _hover={{
                  bg: 'pink.300',
                }}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4}>
            <Stack as="nav" spacing={4}>
              {PATHS.map((link, i) => (
                <NavLink
                  key={i}
                  path={link.path}
                  label={link.label}
                />
              ))}
              {loggedIn && <NavLink path="/" label="Sign Out" />}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  );
};

export default NavBar;
