/* eslint-disable no-console */
import React from 'react';
import {
  Box,
  Text,
  Link,
  VStack,
  Grid,
  useMediaQuery,
} from '@chakra-ui/react';
import {
  Link as RouterLink,
  useHistory,
  useLocation,
  RouteComponentProps,
} from 'react-router-dom';

import { AxiosResponse } from 'axios';
import { PR_HELLO } from '../constants/db.constants';

import { useUserContext } from '../context/user.context';
import { useAppData } from '../context/appdata.context';
import { useDataHandler } from '../context/datahandler.context';

import { getCollection } from '../services/get.service';
import { getRequest } from '../services/crud.service';

import RegistrationForm from '../components/registration';
import SearchBox from '../components/search/search-box';
import SnippetCard from '../components/snippet/card';
import Page from '../containers/default.container';
import { Primary } from '../containers/primary.container';

interface HomeProps extends RouteComponentProps<{ id: string }> {}
// const Collections: React.FC<CollectionsProps> = ({ match }) =>
/**
 * Frontend public endpoint that represents the Home route.
 *
 * @file defines the secure '/' path
 * @since 2021-04-03
 * @return {=>}
 */
export const Home: React.FC<HomeProps> = ({ match }) => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    returning,
    setReturning,
    loading,
    loggedIn,
    handleSignIn,
    accessToken,
  } = useUserContext();
  const { data, setTags } = useAppData();
  const {
    handleFave,
    setFaveSnippet,
    faveSnippet,
  } = useDataHandler();

  const [landing, setLanding] = React.useState(true);
  const [snippets, setSnippets] = React.useState<Snippet[] | []>([]);
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const [heading, setHeading] = React.useState<string>('');

  const [homeCollection, setHomeCollection] = React.useState<
    Collection | undefined
  >(undefined!);

  const loadHomeCollection = async () => {
    const id = PR_HELLO._id;
    const response = await getRequest({
      accessToken,
      url: `api/collections/${id}`,
    });
    if (response && response.length > 0) {
      setHomeCollection(response[0]);
    }
  };

  React.useEffect(() => {
    loadHomeCollection();
  }, []);

  React.useEffect(() => {
    if (homeCollection) {
      setSnippets(homeCollection.snippets);
    }
  }, [homeCollection]);

  React.useEffect(() => {
    if (match.params.id === 'signup') {
      setReturning(false);
    } else if (match.params.id === 'signin') {
      setReturning(true);
    } else {
      setReturning(false);
    }
  }, [match.params.id]);

  console.log(match.params.id);

  const primary = snippets.map((snippet: Snippet, i: number) => (
    <SnippetCard
      key={snippet._id}
      editing={false}
      snippet={snippet}
      loading={loading}
      title={snippet.title}
      language={snippet.language}
      value={snippet.value}
      description={snippet.description}
      tags={snippet.tags.join(', ')}
      source={snippet.source}
      id={snippet._id}
      setTags={setTags}
      handleFave={handleFave}
      faveSnippet={faveSnippet}
    />
  ));
  const secondary = (
    <RegistrationForm
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      returning={returning}
      loading={loading}
      setReturning={setReturning}
      handleSignIn={handleSignIn}
    />
  );
  return <Page primary={primary} secondary={secondary} />;
};

const Pages = (
  <>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <div> </div>
        {/* <VStack spacing={8}>
          <RegistrationForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            returning={returning}
            loading={loading}
            setReturning={setReturning}
            handleSignIn={handleSignIn}
          />

          {loggedIn ? (
            <>
              {' '}
              <Text>You are Logged In.</Text>
              <Link
                as={RouterLink}
                color="teal.500"
                to={`/collections/${username}`}
                fontSize="2xl"
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
                to="/registration"
                fontSize="2xl"
              >
                Start the tour.
              </Link>
            </>
          )}
        </VStack> */}
      </Grid>
    </Box>
    <Box
      textAlign="center"
      fontSize="xl"
      display={{ base: 'none', lg: 'flex' }}
    >
      <Grid minH="100vh" p={3}>
        <div> </div>
        <VStack spacing={8}>
          <Box
            height="90vh"
            overflowY="scroll"
            overflowX="hidden"
            width="500px"
          >
            <Box>
              {/* {snippets.map((snippet: Snippet, i: number) => (
                <SnippetCard
                  key={snippet._id}
                  editing={false}
                  snippet={snippet}
                  loading={loading}
                  title={snippet.title}
                  language={snippet.language}
                  value={snippet.value}
                  description={snippet.description}
                  tags={snippet.tags.join(', ')}
                  source={snippet.source}
                  id={snippet._id}
                  setTags={setTags}
                  handleFave={handleFave}
                  faveSnippet={faveSnippet}
                />
              ))} */}
            </Box>
          </Box>
        </VStack>
      </Grid>
    </Box>
  </>
);
