/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Box,
  Heading,
  Text,
  HStack,
  Flex,
  Link,
  List,
  ListItem,
} from '@chakra-ui/react';

import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MinusIcon,
} from '@chakra-ui/icons';
import { AnimatePresence } from 'framer-motion';

import cn from 'classnames';

import { MotionBox } from '../../../shared/motion-box';

import '../../styles.css';

/**
 * Frontend user dashboard endpoint that represents an array of collections from an HTTP get request.
 *
 * @file defines Collections page route
 * @since 2021-04-08
 * @tutorial https://codesandbox.io/s/framer-motion-accordion-vmj0n?file=/src/Example.tsx:366-489
 */

interface CollectionItemProps {
  collection: Collection;
  collections: Collection[];
  i: number;
  id?: string;
  collectionId: string;
  setCollectionId: React.Dispatch<React.SetStateAction<string>>;
  expandedCollection: number;
  setExpandedCollection: React.Dispatch<React.SetStateAction<number>>;
  expandedCollectionDetails: number | false;
  setExpandedCollectionDetails: React.Dispatch<
    React.SetStateAction<number | false>
  >;
  selectedSnippets: Snippet[] | undefined;
  setSelectedSnippets: React.Dispatch<
    React.SetStateAction<Snippet[] | undefined>
  >;
  selectedCollection: Collection | undefined;
  setSelectedCollection: React.Dispatch<
    React.SetStateAction<Collection | undefined>
  >;
  selectedSnippetId: string;
  setSelectedSnippetId: React.Dispatch<React.SetStateAction<string>>;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
  setExpandedSnippet: React.Dispatch<React.SetStateAction<number>>;
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  collection,
  collections,
  i,
  id,
  collectionId,
  setCollectionId,
  expandedCollection,
  setExpandedCollection,
  expandedCollectionDetails,
  setExpandedCollectionDetails,
  selectedSnippets,
  setSelectedSnippets,
  selectedCollection,
  setSelectedCollection,
  selectedSnippetId,
  setSelectedSnippetId,
  setHeading,
  setExpandedSnippet,
}) => {
  const isOpen = i === expandedCollection || id === collectionId;
  const isOpenDetails = i === expandedCollectionDetails;
  const className = cn('accordion', {
    'accordion--open': isOpen,
    'accordion--next-to-open': i === expandedCollection - 1,
  });

  return (
    <>
      <Box className={className}>
        <header
          onClick={() => {
            setExpandedCollection(isOpen ? 0 : i);
            setExpandedSnippet(0);
            setSelectedSnippets(collection.snippets);
            setSelectedCollection(collection);
            setHeading(collection.name);
          }}
        >
          <HStack>
            <Text>{collection.name}</Text>
          </HStack>
          <Box>
            <Text
              justifySelf="end"
              as="span"
              color="gray.600"
              fontSize="sm"
              mr="10px"
            >
              {collection.snippets.length} snips
            </Text>
            {isOpen ? (
              <MinusIcon fontSize="12px" />
            ) : (
              <AddIcon fontSize="12px" />
            )}
          </Box>
        </header>

        <AnimatePresence initial={false}>
          {isOpen && (
            <MotionBox
              as="section"
              overflow="hidden"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: '0' },
              }}
              transition={{
                duration: 0.5,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
            >
              <Flex
                padding="10px"
                justifyContent="space-between"
                onClick={() =>
                  setExpandedCollection(isOpen ? -1 : i - 1)
                }
              >
                <Text as="span" color="gray.600" fontSize="sm">
                  Edit this collection
                </Text>
                <MinusIcon />
              </Flex>
              <List>
                {collection.snippets &&
                  collection.snippets.map((snippet, index) => (
                    <ListItem
                      key={`${index}-list-item-${collection._id}-snippet-${snippet._id}`}
                      cursor="pointer"
                      bg={
                        selectedSnippetId === snippet.title
                          ? '#f6f6f6'
                          : 'white'
                      }
                      _hover={{ bg: '#f6f6f6', borderRadius: '6px' }}
                      onClick={() => {
                        setSelectedSnippets([snippet]);
                      }}
                    >
                      {snippet.title}
                    </ListItem>
                  ))}
              </List>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
};

export default CollectionItem;
