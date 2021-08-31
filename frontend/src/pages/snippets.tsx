import React from 'react';
import { useHistory } from 'react-router';
import { useMediaQuery, HStack, Box, Text } from '@chakra-ui/react';

import Page from '../containers/default.container';
import SearchBar from '../components/search/search-bar';
import SearchBox from '../components/search/search-box';

import { useUserContext } from '../context/user.context';
import { useAppData } from '../context/appdata.context';
import { useDataHandler } from '../context/datahandler.context';

import LoadSpinner from '../components/shared/spinner';

import { BrandButton } from '../components/shared/brand-button';
import { Copyright } from '../components/shared/copyright';

import SnippetCard from '../components/snippet/card';

const Snippets: React.FC = () => {
  const {
    data,
    loading,
    searchText,
    setSearchText,
    onSearchTextChange,
    language,
    setLanguage,
    onLanguageChange,
    tags,
    setTags,
    onTagChange,
    page,
    setPage,
    allTags,
    loadInitialData,
  } = useAppData();
  const { faveSnippet, handleFave, faving } = useDataHandler();
  const { username, accessToken } = useUserContext();
  const router = useHistory();
  const [baseLg] = useMediaQuery('(min-width: 62em)');

  const [heading, setHeading] = React.useState<string>('');
  const [snippets, setSnippets] = React.useState<Snippet[] | []>([]);

  const [editing, setEditing] = React.useState(false);

  const resetAll = () => {
    setSearchText('');
    setLanguage('');
    setTags('');
    setHeading('All Snippets');
    loadInitialData();
  };

  React.useEffect(() => {
    if (searchText) {
      setHeading(`Searched by text: ${searchText}`);
    } else if (language) {
      setHeading(`Searched by language: ${language}`);
    } else if (tags) {
      setHeading(`Searched by tag: ${tags}`);
    } else {
      setHeading('All Snippets');
    }
  }, [searchText, language, tags]);

  React.useEffect(() => {
    if (data) {
      setSnippets(data?.items);
    }
  }, [data]);

  const spinner = (
    <Box mt="40vh" mb="40vh">
      <LoadSpinner />
    </Box>
  );

  const secondary = (
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
  );

  const secondaryHeading = 'Explore Snippets';
  const secondaryFooterHeading = heading;
  const secondaryChildren = <></>;
  const secondaryFooterSubheading = <Copyright />;
  const primary = loading
    ? spinner
    : snippets.map((snippet: Snippet, i: number) => (
        <SnippetCard
          key={snippet._id}
          editing={editing}
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
          faving={faving}
        />
      ));
  const primaryHeading = heading;
  const primaryChildren = (
    <HStack>
      <BrandButton onClick={() => resetAll()}>Clear</BrandButton>
    </HStack>
  );
  const primaryFooterSubheading = heading;
  const primaryFooterHeading = '';
  const pagination = (
    <>
      {' '}
      <BrandButton
        disabled={!data?.has_prev}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </BrandButton>
      {data && (
        <Text>
          {data.page === 1 ? 1 : data.items_per_page * data.page + 1}{' '}
          to{' '}
          {data.page === 1
            ? data.items_per_page * data.page
            : data.items_per_page * data.page +
              data.items_per_page}{' '}
          of {data.total_items}
        </Text>
      )}
      <BrandButton
        disabled={!data?.has_next}
        onClick={() => setPage(page + 1)}
      >
        Next
      </BrandButton>
    </>
  );

  const search = (
    <SearchBar
      searchText={searchText}
      language={language}
      tags={tags}
      onSearchTextChange={onSearchTextChange}
      onLanguageChange={onLanguageChange}
      onTagsChange={onTagChange}
      allTags={allTags}
      resetAll={resetAll}
      heading={heading}
    />
  );

  return (
    <>
      <Page
        secondary={baseLg && secondary}
        secondaryHeading={secondaryHeading}
        secondaryFooterHeading={secondaryFooterHeading}
        secondaryFooterSubheading={secondaryFooterSubheading}
        primary={primary}
        primaryHeading={primaryHeading}
        primaryChildren={primaryChildren}
        primaryFooterSubheading={primaryFooterSubheading}
        pagination={pagination}
        search={search}
      />
    </>
  );
};

export default Snippets;
