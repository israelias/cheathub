import { Box, Text, Link, VStack, Grid } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Logo } from '../components/actions/Logo';
import { checkAuth } from '../lib/checkAuth';
import { useUserContext } from '../context/user.context';

/**
 * Frontend public endpoint that represents the Home route.
 *
 * @file defines the secure '/' path
 * @since 2021-04-03
 * @return {=>}
 */
export const Home: React.FC = () => {
  const { username } = useUserContext();
  const loggedIn = checkAuth({ username });

  return (
    <Box textAlign="center" fontSize="xl">
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
};

// export const OldHome: React.FC<Props> = ({
//   history,
//   location,
//   match,
// }) => {
//   console.log(match, location);
//   return (
//     <div>
//       <div>home</div>
//       <Link to="/about">go to about</Link>
//       <button
//         type="button"
//         onClick={() => {
//           // api call
//           // change to the about page
//           history.push('/about');
//         }}
//       >
//         click me to go to about
//       </button>
//       <SpecialButton />
//       <FormElement />
//     </div>
//   );
// };
