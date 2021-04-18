import React from 'react';
import { Flex } from '@chakra-ui/react';
import { NavLink } from './link';

interface Props {
  loggedIn: Boolean;
  username: String;
}

export const LoggedinHeader: React.FC<Props> = ({
  loggedIn,
  username,
}) => (
  <Flex
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    position="fixed"
    width="100%"
    as="nav"
    p={4}
    mx="auto"
    maxWidth="1150px"
    marginBottom="40px"
  >
    <>
      {loggedIn ? (
        <>
          <h1>
            <a href="/snippet s/all">Feed</a>
          </h1>
          {username && <p>{username}</p>}
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <NavLink label="Faves" path="/faves" />
            <NavLink label="Explore" path="/explore" />
            <NavLink label="Add" path="/add" />
            <NavLink label="Profile" path="/profile" />
            <NavLink label="Logout" path="/logout" />
          </Flex>
        </>
      ) : (
        <>
          <h1>
            <a href="/">Cheat-Hub</a>
          </h1>
          <ul>
            <li>
              <a href="/register/tour">Take a tour!</a>
            </li>
          </ul>
        </>
      )}
    </>
  </Flex>
);
