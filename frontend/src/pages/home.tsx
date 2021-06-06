/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box } from '@chakra-ui/react';
import {
  Link as RouterLink,
  RouteComponentProps,
} from 'react-router-dom';

import { HELLOWORLD } from '../constants/home.constants';
import { Logo } from '../components/shared/logo';

import { useUserContext } from '../context/user.context';
import { useAppData } from '../context/appdata.context';
import { useDataHandler } from '../context/datahandler.context';

import RegistrationForm from '../components/registration';

import SnippetCard from '../components/snippet/card';
import Page from '../containers/default.container';

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
    loggedIn,
    loading,
    handleSignIn,
    accessToken,
  } = useUserContext();
  const { data, setTags } = useAppData();
  const { handleFave, faveSnippet } = useDataHandler();

  React.useEffect(() => {
    if (match.params.id === 'signup') {
      setReturning(false);
    } else if (match.params.id === 'signin') {
      setReturning(true);
    } else {
      setReturning(false);
    }
  }, [match.params.id]);

  const primary = HELLOWORLD[0].snippets.map(
    (snippet: any, i: number) => (
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
    )
  );
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

  const icon = <Logo />;

  const preSecondaryChildren = (
    <Box p="10px" fontSize="xs" fontWeight="light">
      <Box> </Box>
    </Box>
  );

  const primaryChildren = (
    <Box p="10px" fontSize="sm" fontWeight="light">
      <Box as="h2">A home for all your code snippets.</Box>
    </Box>
  );

  const primaryHeading = 'Welcome to CheatHub';

  return (
    <Page
      icon={icon}
      primary={primary}
      preSecondaryChildren={preSecondaryChildren}
      secondary={secondary}
      primaryHeading={primaryHeading}
      primaryChildren={primaryChildren}
    />
  );
};
