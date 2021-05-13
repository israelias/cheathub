import React from 'react';
import {
  Box,
  Image,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import {
  Link as RouterLink,
  RouteComponentProps,
} from 'react-router-dom';

import { PR_HELLO } from '../constants/db.constants';
import LoadSpinner from '../components/shared/spinner';

import { useUserContext } from '../context/user.context';
import { useAppData } from '../context/appdata.context';
import { useDataHandler } from '../context/datahandler.context';

import { getRequest } from '../services/crud.service';

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
    handleSignIn,
    accessToken,
  } = useUserContext();
  const { data, setTags } = useAppData();
  const { handleFave, faveSnippet } = useDataHandler();

  const [landing, setLanding] = React.useState(true);
  const [snippets, setSnippets] = React.useState<Snippet[] | []>([]);
  const [loading, setLoading] = React.useState(false);
  const [homeCollection, setHomeCollection] = React.useState<
    Collection | undefined
  >(undefined!);

  const loadHomeCollection = async () => {
    const id = PR_HELLO._id;
    setLoading(true);
    const response = await getRequest({
      accessToken,
      url: `api/collections/${id}`,
    });
    if (response && response.length > 0) {
      setLoading(false);
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

  const lightBanner =
    'https://raw.githubusercontent.com/israelias/cheathub/master/public/logo_banner_yellow_transparent.png';
  const darkBanner =
    'https://raw.githubusercontent.com/israelias/cheathub/master/public/logo_banner_blue_transparent.png';

  const spinner = <LoadSpinner />;
  const primary = loading
    ? spinner
    : snippets.map((snippet: Snippet, i: number) => (
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

  const icon = (
    <Box mb="auto">
      <Image
        src={mode(darkBanner, lightBanner)}
        alt="CheatHub"
        htmlWidth="200px"
      />
    </Box>
  );

  const preSecondaryChildren = (
    <Box p="10px" fontSize="xs" fontWeight="light">
      <Box>Find a home for all your code snippets.</Box>
    </Box>
  );

  return (
    <Page
      icon={icon}
      primary={primary}
      preSecondaryChildren={preSecondaryChildren}
      secondary={secondary}
    />
  );
};
