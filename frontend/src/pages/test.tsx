import {
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Logo } from '../components/actions/Logo';
import NavBar from '../components/navbar';
import { checkAuth } from '../lib/checkAuth';
import { useUserContext } from '../context/user.context';

function Test() {
  const { username } = useUserContext();
  const loggedIn = checkAuth({ username });

  return (
    <Box textAlign="center" fontSize="xl">
      <NavBar />
      <Grid minH="100vh" p={3}>
        <div> </div>
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          {loggedIn ? (
            <>
              {' '}
              <Text>You are Logged In.</Text>
              <Link
                as={RouterLink}
                color="teal.500"
                to="/registration/trial"
                fontSize="2xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                See your Feed.
              </Link>
            </>
          ) : (
            <>
              {' '}
              <Text>Welcome to Cheat Hub.</Text>
              <Link
                as={RouterLink}
                color="teal.500"
                to="/registration/trial"
                fontSize="2xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start the tour.
              </Link>
            </>
          )}
        </VStack>
      </Grid>
    </Box>
  );
}

export default Test;
