/* eslint-disable no-console */
/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable no-extra-boolean-cast */
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  Box,
  Heading,
  Text,
  HStack,
  Flex,
  Button,
  IconButton,
  useMediaQuery,
  useDisclosure,
  Icon,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import {
  CloseIcon,
  HamburgerIcon,
  AddIcon,
  MinusIcon,
} from '@chakra-ui/icons';
import { GoFileDirectory } from 'react-icons/go';

import { getRequest } from '../services/crud.service';

import { useUserContext } from '../context/user.context';
import { useAppData } from '../context/appdata.context';
import { useProfileData } from '../context/profiledata.context';
import { useCollectionHandler } from '../context/collectionhandler';

import { Secondary } from '../containers/secondary.container';
import { Content } from '../connectors/main';
import { SideNav } from '../connectors/side';
import { SidePanel } from '../connectors/drawer';
import { HeaderBox } from '../connectors/header-box';
import {
  AddSnippetButton,
  BrandButton,
} from '../components/shared/brand-button';

import SnippetItem from '../components/collections/snippets';

import CollectionCrud from '../components/collections/crud';

import { SnippetQueryTable } from '../components/snippet/table/query.table';
import { SnippetPaginationTable } from '../components/snippet/table/pagination.table';
import { SnippetDataTable } from '../components/snippet/table/data.table';

interface CollectionsProps
  extends RouteComponentProps<{ id: string }> {}

/**
 * Frontend public endpoint that represents an array of snippets from an HTTP get request.
 *
 * @file defines Explore page route
 * @since 2021-04-08
 * @param {any} match
 * @param {any}
 * @return {=>}
 */
const Collection: React.FC<CollectionsProps> = ({ match }) => {
  const {
    loadSnippetsData,
    collectionsProfile,
    loadingCollections,
    snippetsProfile,
    loadingSnippets,
    loadFaveSnippets,
    faveSnippets,
  } = useProfileData();

  const {
    selected,
    setSelected,
    selections,
    setSelections,
    selectedId,
    setSelectedId,
    id,
    setId,
    name,
    setName,
    snippets,
    setSnippets,
    editing,
    setEditing,
    deleting,
    setDeleting,
    submitting,
    alert,
    setAlert,
    handleSubmit,
    handleDelete,
    handleCancel,
    clearValues,
  } = useCollectionHandler();

  const { accessToken } = useUserContext();

  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sidePanelRef = React.useRef<HTMLButtonElement>(null);

  const [addCollection, setAddCollection] = React.useState<boolean>(
    false
  );

  const [heading, setHeading] = React.useState<string>(
    'All Snippets'
  );

  const [editingSnippet, setEditingSnippet] = React.useState<boolean>(
    false
  );

  const snippetRef = React.useRef<HTMLDivElement>(null);
  const [collection, setCollection] = React.useState<
    Collection | undefined
  >();
  const [displayedSnippets, setDisplayedSnippets] = React.useState<
    Snippet[] | undefined
  >();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<number>(0);

  const loadCollection = async (collectionId: string) => {
    setLoading(true);
    const data = await getRequest({
      url: `api/collections/${collectionId}`,
      accessToken,
    });
    if (data) {
      setCollection(data[0]);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (match.params.id !== 'add') {
      setEditing(true);
      loadCollection(match.params.id);
      setId(match.params.id);
    } else {
      setEditing(false);
      clearValues();
    }
  }, [match.params.id]);

  React.useEffect(() => {
    if (collection) {
      setId(collection._id);
      setHeading(`Editing ${collection.name}`);
      setName(collection.name);
      collection.snippets_id && setSnippets(collection.snippets_id);
      setDisplayedSnippets(collection.snippets);
    }
  }, [collection]);

  return (
    <>
      <Secondary>
        <HeaderBox
          left
          heading={editing ? 'Edit Collection' : 'New Collection'}
        />
        <SideNav>
          {loading ? (
            <p>Loading Collection...</p>
          ) : (
            <>
              <Box paddingTop="10px">
                <CollectionCrud
                  name={name}
                  setName={setName}
                  handleSubmit={handleSubmit}
                  handleDelete={handleDelete}
                  handleCancel={handleCancel}
                  setAlert={setAlert}
                  editing={editing}
                  deleting={deleting}
                  submitting={submitting}
                  snippets={snippets}
                  setSnippets={setSnippets}
                />
              </Box>
              {/* <SnippetQueryTable
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
              /> */}
            </>
          )}
        </SideNav>
      </Secondary>
      {!baseLg && (
        <>
          <SidePanel
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            buttonRef={sidePanelRef}
            heading={editing ? 'Edit Collection' : 'New Collection'}
          >
            {!baseLg && (
              <Box paddingTop="10px">
                <CollectionCrud
                  name={name}
                  setName={setName}
                  handleSubmit={handleSubmit}
                  handleDelete={handleDelete}
                  handleCancel={handleCancel}
                  setAlert={setAlert}
                  editing={editing}
                  deleting={deleting}
                  submitting={submitting}
                  snippets={snippets}
                  setSnippets={setSnippets}
                />
              </Box>
            )}
          </SidePanel>
        </>
      )}
      <Content>
        <HeaderBox heading={heading}>
          <HStack>
            {!baseLg && (
              <IconButton
                ref={sidePanelRef}
                // onClick={onOpen}
                size="md"
                icon={
                  isOpen ? (
                    <CloseIcon />
                  ) : (
                    <Icon as={GoFileDirectory} />
                  )
                }
                aria-label="Open Collections"
                onClick={isOpen ? onClose : onOpen}
              />
            )}
            <BrandButton
              onClick={() => {
                loadSnippetsData();
                setHeading('All Snippets');
              }}
            >
              Show all
            </BrandButton>
            <AddSnippetButton>Add New</AddSnippetButton>
          </HStack>
        </HeaderBox>

        {loading ? (
          <p> Loading Snippets...</p>
        ) : (
          <>
            <Box
              paddingTop="10px"
              p={{
                base: '10px 10px 0px 10px',
                lg: '10px 0px 0px 0px',
              }}
            >
              {snippets.map((snip) =>
                displayedSnippets?.map(
                  (snippet: Snippet, index: number) =>
                    snip.value === snippet._id && (
                      <SnippetItem
                        key={`col-edit-${snippet._id}-${index}`}
                        index={index}
                        snippet={snippet}
                        selectedSnippetId={selectedId}
                        setSelectedSnippetId={setSelectedId}
                        expandedSnippet={expanded}
                        setExpandedSnippet={setExpanded}
                      />
                    )
                )
              )}
            </Box>
          </>
        )}
      </Content>
    </>
  );
};

export default Collection;
