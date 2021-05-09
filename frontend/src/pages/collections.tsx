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

import { useProfileData } from '../context/profiledata.context';
import { useCollectionHandler } from '../context/collectionhandler';

import { Secondary } from '../containers/secondary.container';
import { Content } from '../connectors/main';
import { SideNav } from '../connectors/side';
import { SidePanel } from '../connectors/drawer';
import { HeaderBox } from '../connectors/header-box';
import {
  AddSnippetButton,
  AddCollectionButton,
  BrandButton,
} from '../components/shared/brand-button';

import CollectionItem from '../components/collections/collection';
import SnippetItem from '../components/collections/snippets';

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
  } = useCollectionHandler();

  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sidePanelRef = React.useRef<HTMLButtonElement>(null);

  const [
    expandedSnippet,
    setExpandedSnippet,
  ] = React.useState<number>(0);

  const [heading, setHeading] = React.useState<string>(
    'All Snippets'
  );

  const [expanded, setExpanded] = React.useState<number>(0);
  const [id, setId] = React.useState<string>('');

  React.useEffect(() => {
    if (snippetsProfile) {
      setSelections(snippetsProfile.data);
    }
  }, [snippetsProfile]);

  return (
    <>
      <Secondary>
        <HeaderBox left heading="Collections">
          <AddCollectionButton> New Collection</AddCollectionButton>
        </HeaderBox>
        <SideNav>
          {loadingCollections ? (
            <p>Loading Collections...</p>
          ) : (
            <>
              <Box paddingTop="10px">
                {faveSnippets?.data?.map(
                  (collection: Collection, index: number) => (
                    <CollectionItem
                      key={`col-fave-${collection._id}-${index}`}
                      id={id}
                      index={index - 1}
                      collection={collection}
                      setExpanded={setExpanded}
                      expanded={expanded - 1}
                      setSelections={setSelections}
                      selectedSnippetId={selectedId}
                      setSelectedSnippetId={setSelectedId}
                      setExpandedSnippet={setExpandedSnippet}
                      setHeading={setHeading}
                      setId={setId}
                    />
                  )
                )}
                {collectionsProfile?.data?.map(
                  (collection: Collection, index: number) => (
                    <CollectionItem
                      key={`col-${collection._id}-${index}`}
                      id={id}
                      index={index + 1}
                      collection={collection}
                      setExpanded={setExpanded}
                      expanded={expanded}
                      setSelections={setSelections}
                      selectedSnippetId={selectedId}
                      setSelectedSnippetId={setSelectedId}
                      setExpandedSnippet={setExpandedSnippet}
                      setHeading={setHeading}
                      setId={setId}
                    />
                  )
                )}
              </Box>
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
            heading="Collections"
          >
            {faveSnippets?.data?.map(
              (collection: Collection, index: number) => (
                <CollectionItem
                  key={`col-fave-${collection._id}-${index}`}
                  id={id}
                  index={index - 1}
                  collection={collection}
                  setExpanded={setExpanded}
                  expanded={expanded - 1}
                  setSelections={setSelections}
                  selectedSnippetId={selectedId}
                  setSelectedSnippetId={setSelectedId}
                  setExpandedSnippet={setExpandedSnippet}
                  setHeading={setHeading}
                  setId={setId}
                />
              )
            )}
            {!baseLg &&
              collectionsProfile?.data?.map(
                (collection: Collection, index: number) => (
                  <CollectionItem
                    key={`col-${collection._id}-${index}`}
                    id={id}
                    index={index + 1}
                    collection={collection}
                    setExpanded={setExpanded}
                    expanded={expanded}
                    setSelections={setSelections}
                    selectedSnippetId={selectedId}
                    setSelectedSnippetId={setSelectedId}
                    setHeading={setHeading}
                    setId={setId}
                  />
                )
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
            <Box>
              <Text
                justifySelf="end"
                as="span"
                color="gray.600"
                fontSize="sm"
                mr="10px"
              >
                {selections && selections?.length > 0 ? (
                  <>
                    {selections.length}{' '}
                    {selections.length > 1 ? 'snips' : 'snip'}
                  </>
                ) : (
                  'Empty'
                )}
              </Text>
            </Box>

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

        {loadingSnippets ? (
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
              {selections?.map((snippet: Snippet, index: number) => (
                <SnippetItem
                  key={`col-snip-${snippet._id}-${index}`}
                  index={index}
                  snippet={snippet}
                  selectedSnippetId={selectedId}
                  setSelectedSnippetId={setSelectedId}
                  expandedSnippet={expandedSnippet}
                  setExpandedSnippet={setExpandedSnippet}
                />
              ))}
            </Box>
          </>
        )}
      </Content>
    </>
  );
};

export default Collections;
