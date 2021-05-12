/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */

import React from 'react';
import { useHistory } from 'react-router';
import { useMediaQuery, HStack } from '@chakra-ui/react';

import Page from '../containers/default.container';
import SearchBar from '../components/search/search-bar';
import SearchBox from '../components/search/search-box';

import { useUserContext } from '../context/user.context';
import { useAppData } from '../context/appdata.context';
import { useDataHandler } from '../context/datahandler.context';

import { BrandButton } from '../components/shared/brand-button';
import { PrimaryHeader } from '../components/shared/particulars';
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
  const secondaryFooterSubheading = snippets?.length.toString();
  const primary = loading ? (
    <p>Loading...</p>
  ) : (
    snippets.map((snippet: Snippet, i: number) => (
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
    ))
  );
  const primaryHeading = '';
  const primaryChildren = !baseLg ? (
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
  ) : (
    <PrimaryHeader heading={heading}>
      <HStack>
        <BrandButton onClick={() => resetAll()}>Clear</BrandButton>
      </HStack>
    </PrimaryHeader>
  );
  const primaryFooterSubheading = heading;
  const primaryFooterHeading = '';

  return (
    <>
      <Page
        secondary={baseLg && secondary}
        secondaryHeading={secondaryHeading}
        secondaryFooterHeading={secondaryFooterHeading}
        secondaryFooterSubheading={secondaryFooterSubheading}
        primary={primary}
        primaryHeading={primaryHeading}
        primaryFooterSubheading={primaryFooterSubheading}
        primaryChildren={primaryChildren}
      />
      {/* <Secondary>
        <>
          <Flex flexDirection="column" p={0} m={0}>
            <SecondaryHeader heading="Explore Snippets" />
            <Box>
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

            <PrimaryFooter heading={heading} subheading="CH 2021" />
          </Flex>
        </>
      </Secondary> */}

      <>
        {/* {!baseLg ? (
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
        ) : (
          <PrimaryHeader heading={heading}>
            <HStack>
              <BrandButton onClick={() => resetAll()}>
                Clear
              </BrandButton>
            </HStack>
          </PrimaryHeader>
        )} */}

        {/* {loading ? (
          <p>Loading..</p>
        ) : (
          <Box
            p={{
              base: '10px 10px 0px 10px',
              lg: '10px 0px 0px 0px',
            }}
          >
            {snippets.map((snippet: Snippet, i: number) => (
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
            ))}
          </Box>
        )} */}

        {/* <Flex>
          <Box height="100%"> </Box>
          <Box width="100%" mt="auto" position="sticky" bottom={0}>
            {' '}
            <PrimaryFooter heading={heading} subheading="CH 2021" />
            <SecondaryFooter>
              <BrandButton
                disabled={!data?.has_prev}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </BrandButton>
              <BrandButton
                disabled={!data?.has_next}
                onClick={() => setPage(page + 1)}
              >
                Next
              </BrandButton>
            </SecondaryFooter>
          </Box>
        </Flex> */}
      </>
    </>
  );
};

export default Snippets;
