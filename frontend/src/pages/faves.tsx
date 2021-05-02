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
  IconButton,
  Button,
  useDisclosure,
  ButtonProps,
  useToast,
  useBoolean,
  useMediaQuery,
} from '@chakra-ui/react';

import { Primary } from '../containers/primary.container';
import { Secondary } from '../containers/secondary.container';
import { Content } from '../connectors/main';
import { SideNav } from '../connectors/side';
import { SidePanel } from '../connectors/drawer';

import SearchBar from '../components/navigation/searchbar';

import { useUserContext } from '../context/user.context';
import { useAppData } from '../context/appdata.context';
import { useDataHandler } from '../context/datahandler.context';
import { useProfileData } from '../context/profiledata.context';

import { TimeAgo } from '../components/shared/time';
import useIntersectionObserver from '../lib/useIntersect';

import { SnippetDataTable } from '../components/snippet/table/data.table';
import { SnippetQueryTable } from '../components/snippet/table/query.table';
import { SnippetPaginationTable } from '../components/snippet/table/pagination.table';
import { HeaderBox } from '../components/shared/header-box';

import SnippetCard from '../components/snippet/card';

const Faves: React.FC = () => {
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
  const {
    loadFaveSnippets,
    loadingSnippets,
    snippetsProfile,
  } = useProfileData();
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
    loadInitialData();
  };

  React.useEffect(() => {
    loadFaveSnippets();
  }, []);

  React.useEffect(() => {
    if (snippetsProfile) {
      setSnippets(snippetsProfile.data);
    }
  }, [snippetsProfile]);

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
        <SearchBar
          searchText={searchText}
          language={language}
          tags={tags}
          onSearchTextChange={onSearchTextChange}
          onLanguageChange={onLanguageChange}
          onTagsChange={onTagChange}
          allTags={allTags}
          resetAll={resetAll}
        />
        {!baseLg && (
          <Button ref={sidePanelRef} onClick={onOpen}>
            {' '}
            Open
          </Button>
        )}

        {loading ? (
          <p>Loading..</p>
        ) : (
          <Box paddingTop="10px">
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
      </Content>
    </>
  );
};

export default Faves;
