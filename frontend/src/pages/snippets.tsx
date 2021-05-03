/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */

import React, { RefObject } from 'react';
import { useHistory } from 'react-router';
import {
  Heading,
  Link,
  Flex,
  Text,
  Box,
  VStack,
  Button,
  useDisclosure,
  ButtonProps,
  useToast,
  useBoolean,
  useMediaQuery,
  HStack,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

import { GoTelescope } from 'react-icons/go';

import { Primary } from '../containers/primary.container';
import { Secondary } from '../containers/secondary.container';
import { Content } from '../connectors/main';
import { SideNav } from '../connectors/side';
import { SidePanel } from '../connectors/drawer';

import SearchBar from '../components/navigation/searchbar';
import Pagination from '../components/navigation/pagination';

import { useUserContext } from '../context/user.context';
import { useAppData } from '../context/appdata.context';
import { useDataHandler } from '../context/datahandler.context';

import { TimeAgo } from '../components/shared/time';

import SearchBox from '../components/snippet/search/searchbox';
import { SnippetDataTable } from '../components/snippet/table/data.table';
import { SnippetQueryTable } from '../components/snippet/table/query.table';
import { SnippetPaginationTable } from '../components/snippet/table/pagination.table';
import { HeaderBox } from '../connectors/header-box';
import { BrandButton } from '../components/shared/brand-button';

import SnippetCard from '../components/snippet/card';

const Snippets: React.FC = () => {
  const {
    data,
    setData,
    loading,
    setLoading,
    searchText,
    setSearchText,
    language,
    setLanguage,
    tags,
    setTags,
    page,
    setPage,
    allTags,
    setAllTags,
    loadResultsData,
    loadInitialData,
    loadAllTags,
  } = useAppData();
  const {
    faveSnippet,
    setFaveSnippet,
    handleFave,
  } = useDataHandler();
  const { username, accessToken } = useUserContext();
  const router = useHistory();
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sidePanelRef = React.useRef<HTMLButtonElement>(null);

  const [heading, setHeading] = React.useState<string>('');
  const [snippets, setSnippets] = React.useState<Snippet[] | []>([]);

  const [title, setTitle] = React.useState<string>('');

  const [source, setSource] = React.useState<string>('');
  const [likedBy, setLikedBy] = React.useState<string[]>([]);

  const [updatedOn, setUpdatedOn] = React.useState<string>('');
  const [filename, setFilename] = React.useState<string>('');

  const [editing, setEditing] = React.useState(false);

  const onSearchTextChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLanguage('');
    setTags('');
    setPage(1);
    const {
      target: { value },
    } = e;
    try {
      if (value === '') {
        setSearchText('');
      }
      setSearchText(value);
    } catch (err) {
      console.log(err);
    }
  };
  const onLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchText('');
    setTags('');
    setPage(1);
    const {
      target: { value },
    } = event;
    if (value === '') {
      setLanguage('');
    }
    setLanguage(value);
  };
  const onTagChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchText('');
    setLanguage('');
    setPage(1);
    const {
      target: { value },
    } = event;
    if (value === '') {
      setTags('');
    }
    setTags(value);
  };

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

  React.useEffect(() => {
    if (!(username || accessToken)) {
      router.push('/login');
    }
  }, [username, accessToken]);

  return (
    <>
      <Secondary>
        <HeaderBox left heading="Explore Snippets" />
        <SideNav>
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
          <SnippetQueryTable
            searchText={searchText}
            setSearchText={setSearchText}
            language={language}
            setLanguage={setLanguage}
            tags={tags}
            setTags={setTags}
          />
          <SnippetPaginationTable
            totalItems={data?.total_items}
            perPage={snippets.length}
            currentPage={data?.page}
          />
          <SnippetDataTable
            title={title}
            language={language}
            updatedOn={updatedOn}
            source={source}
            likedBy={likedBy}
            filename={filename}
          />
        </SideNav>
      </Secondary>
      {!baseLg && (
        <SidePanel
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          buttonRef={sidePanelRef}
          heading="Query Data"
        >
          {!baseLg && (
            <>
              <SnippetQueryTable
                searchText={searchText}
                setSearchText={setSearchText}
                language={language}
                setLanguage={setLanguage}
                tags={tags}
                setTags={setTags}
              />
              <SnippetPaginationTable
                totalItems={data?.total_items}
                perPage={snippets.length}
                currentPage={data?.page}
              />
              <SnippetDataTable
                title={title}
                language={language}
                updatedOn={updatedOn}
                source={source}
                likedBy={likedBy}
                filename={filename}
              />
            </>
          )}
        </SidePanel>
      )}
      <Content>
        {!baseLg ? (
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
          >
            {!baseLg && (
              <IconButton
                aria-label="Open Results Data"
                ref={sidePanelRef}
                icon={
                  isOpen ? <CloseIcon /> : <Icon as={GoTelescope} />
                }
                onClick={onOpen}
              >
                Open
              </IconButton>
            )}
          </SearchBar>
        ) : (
          <HeaderBox heading={heading}>
            <HStack>
              <BrandButton onClick={() => resetAll()}>
                Clear
              </BrandButton>
            </HStack>
          </HeaderBox>
        )}

        {loading ? (
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
                setFaveSnippet={setFaveSnippet}
              />
            ))}
          </Box>
        )}
        {!loading && (
          <Pagination
            hasPrev={data?.has_prev}
            hasNext={data?.has_next}
            page={page}
            setPage={setPage}
          />
        )}
      </Content>
    </>
  );
};

export default Snippets;
