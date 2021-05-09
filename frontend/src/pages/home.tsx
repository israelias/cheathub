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
} from 'react-router-dom';

import { useUserContext } from '../context/user.context';
import { useAppData } from '../context/appdata.context';
import { useDataHandler } from '../context/datahandler.context';

import RegistrationForm from '../components/registration';
import SearchBox from '../components/snippet/search/searchbox';
import SnippetCard from '../components/snippet/card';

/**
 * Frontend public endpoint that represents the Home route.
 *
 * @file defines the secure '/' path
 * @since 2021-04-03
 * @return {=>}
 */
export const Home: React.FC = () => {
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
  } = useUserContext();
  const {
    data,
    searchText,
    setSearchText,
    onSearchTextChange,
    language,
    setLanguage,
    onLanguageChange,
    tags,
    setTags,
    onTagChange,
    allTags,
    loadInitialData,
  } = useAppData();
  const {
    handleFave,
    setFaveSnippet,
    faveSnippet,
  } = useDataHandler();

  const [landing, setLanding] = React.useState(true);
  const [snippets, setSnippets] = React.useState<Snippet[] | []>([]);
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const location = useLocation();

  const resetAll = () => {
    setSearchText('');
    setLanguage('');
    setTags('');
    loadInitialData();
  };
  React.useEffect(() => {
    if (data) {
      setSnippets(data?.items);
    }
  }, [data]);

  React.useEffect(() => {
    if (location.pathname === '/') {
      setSearchText('hello world');
      setLanguage('');
      setTags('');
    }
  }, [location.pathname]);

  return (
    <>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <div> </div>
          <VStack spacing={8}>
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
            {/* <Logo h="40vmin" pointerEvents="none" /> */}
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
              <Box display="none">
                <SearchBox
                  searchText={searchText}
                  language={language}
                  tags={tags}
                  onSearchTextChange={onSearchTextChange}
                  onLanguageChange={onLanguageChange}
                  onTagsChange={onTagChange}
                  allTags={allTags}
                  resetAll={resetAll}
                />
              </Box>
              <Box>
                {snippets.map((snippet: Snippet, i: number) => (
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
                ))}
              </Box>
            </Box>
          </VStack>
        </Grid>
      </Box>
    </>
  );
};
