/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-extra-boolean-cast */
import * as React from 'react';
import { RouteComponentProps, useHistory } from 'react-router';

import axios from 'axios';
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
  useOutsideClick,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import { getRequest } from '../lib/fetcher';
import { useUserContext } from '../context/user.context';
import { useAppData } from '../context/appdata.context';
import { useProfileData } from '../context/profiledata.context';

import useIntersectionObserver from '../lib/useIntersect';

import { Primary } from '../containers/primary.container';
import { Secondary } from '../containers/secondary.container';
import { Content } from '../connectors/main';
import { SideNav } from '../connectors/side';
import { SidePanel } from '../connectors/drawer';
import { HeaderBox } from '../components/shared/header-box';

import CollectionItem from '../components/collections/collection/item';
import CollectionAction from '../components/collections/collection/action';
import SnippetItem from '../components/collections/snippets/item';
import SnippetAction from '../components/collections/snippets/action';

interface CollectionsProps
  extends RouteComponentProps<{ id: string }> {}

/**
 * Frontend public endpoint that represents an array of snippets from an HTTP get request.
 *
 * @file defines Explore page route
 * @since 2021-04-08
 * @param {any} snippets
 * @param {any} history
 * @param {any} match
 * @param {any}
 * @return {=>}
 */
const Collections: React.FC<CollectionsProps> = ({ match }) => {
  const {
    loadSnippetsData,
    loadCollectionsData,
    collectionsProfile,
    loadingCollections,
    setLoadingCollections,
    snippetsProfile,
    loadingSnippets,
    setLoadingSnippets,
  } = useProfileData();

  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sidePanelRef = React.useRef<HTMLButtonElement>(null);

  const [allSnippetsData, setAllSnippetsData] = React.useState<
    Snippet[] | []
  >([]);
  const [allCollectionsData, setAllCollectionsData] = React.useState<
    Collection[] | []
  >([]);

  const [
    expandedCollection,
    setExpandedCollection,
  ] = React.useState<number>(0);

  const [
    expandedSnippet,
    setExpandedSnippet,
  ] = React.useState<number>(0);

  const [selectedSnippets, setSelectedSnippets] = React.useState<
    Snippet[] | undefined
  >(snippetsProfile?.data);

  const [selectedSnippet, setSelectedSnippet] = React.useState<
    Snippet | undefined
  >();

  const [selectedSnippetId, setSelectedSnippetId] = React.useState<
    string | ''
  >('');
  const [addCollection, setAddCollection] = React.useState<boolean>(
    false
  );

  const [heading, setHeading] = React.useState<string>(
    'All Snippets'
  );

  const [editing, setEditing] = React.useState<boolean>(false);
  const [editingSnippet, setEditingSnippet] = React.useState<boolean>(
    false
  );
  const snippetActionRef = React.useRef<HTMLInputElement>(null);

  const onActivate = () => {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  };

  const user = useUserContext();
  const editSnippet = async (id: string) => {
    setEditing(true);
    const res = await getRequest({
      url: `api/users/${id}`,
      accessToken: user?.accessToken,
    });
    setSelectedSnippet(res[0]);
    setSelectedSnippetId(id);
  };

  React.useEffect(() => {
    if (selectedSnippets) {
      setAllSnippetsData(selectedSnippets);
    }
  }, [selectedSnippets]);

  React.useEffect(() => {
    if (snippetsProfile) {
      setSelectedSnippets(snippetsProfile.data);
    }
  }, [snippetsProfile]);

  React.useEffect(() => {
    if (collectionsProfile) {
      setAllCollectionsData(collectionsProfile.data);
    }
  }, [collectionsProfile]);

  React.useEffect(() => {
    if (editingSnippet) {
      onActivate();
      snippetActionRef?.current?.focus();
    }
  }, [editingSnippet, snippetActionRef]);

  React.useEffect(() => {
    if (!editingSnippet) {
      setExpandedSnippet(0);
    }
  }, [editingSnippet]);

  return (
    <>
      <Secondary>
        <HeaderBox left heading="Collections" />
        <SideNav>
          {loadingCollections ? (
            <p>Loading Collections...</p>
          ) : (
            <>
              <Box paddingTop="10px">
                <CollectionAction
                  allSnippetsData={allSnippetsData}
                  expandedCollection={expandedCollection}
                  setExpandedCollection={setExpandedCollection}
                />
              </Box>
              <Box paddingTop="10px">
                {allCollectionsData?.map(
                  (collection: Collection, i: number) => (
                    <CollectionItem
                      key={i}
                      i={i}
                      collection={collection}
                      expandedCollection={expandedCollection}
                      setExpandedCollection={setExpandedCollection}
                      setSelectedSnippets={setSelectedSnippets}
                      selectedSnippetId={selectedSnippetId}
                      setHeading={setHeading}
                      setExpandedSnippet={setExpandedSnippet}
                    />
                  )
                )}
              </Box>
            </>
          )}
        </SideNav>
      </Secondary>
      {!baseLg && (
        <SidePanel
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          buttonRef={sidePanelRef}
          heading="Collections"
        >
          {!baseLg &&
            allCollectionsData?.map(
              (collection: Collection, i: number) => (
                <CollectionItem
                  key={i}
                  i={i}
                  collection={collection}
                  expandedCollection={expandedCollection}
                  setExpandedCollection={setExpandedCollection}
                  setSelectedSnippets={setSelectedSnippets}
                  selectedSnippetId={selectedSnippetId}
                  setHeading={setHeading}
                  setExpandedSnippet={setExpandedSnippet}
                />
              )
            )}
        </SidePanel>
      )}
      <Content>
        <HeaderBox heading={heading}>
          {!baseLg && (
            <Button
              ref={sidePanelRef}
              colorScheme="teal"
              onClick={onOpen}
            >
              Open
            </Button>
          )}
          <Button
            onClick={() => {
              loadSnippetsData();
              setHeading('All Snippets');
            }}
          >
            All
          </Button>
        </HeaderBox>

        {loadingSnippets ? (
          <p> Loading Snippets...</p>
        ) : (
          <>
            <Box paddingTop="10px">
              <SnippetAction
                selectedSnippet={selectedSnippet}
                expandedSnippet={expandedSnippet}
                setExpandedSnippet={setExpandedSnippet}
                setEditingSnippet={setEditingSnippet}
              />
            </Box>
            <Box paddingTop="10px">
              {selectedSnippets?.map(
                (snippet: Snippet, k: number) => (
                  <SnippetItem
                    key={k}
                    k={k}
                    snippet={snippet}
                    setEditingSnippet={setEditingSnippet}
                    setSelectedSnippet={setSelectedSnippet}
                    setSelectedSnippetId={setSelectedSnippetId}
                    expandedSnippet={expandedSnippet}
                    setExpandedSnippet={setExpandedSnippet}
                  />
                )
              )}
            </Box>
          </>
        )}
      </Content>
    </>
  );
};

export default Collections;
