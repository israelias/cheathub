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
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MinusIcon,
} from '@chakra-ui/icons';
import { AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

import { TimeAgo } from '../shared/time';
import { MotionBox } from '../shared/motion-box';
import { CollectionTable } from './table';
import { CardButton } from '../card/view';

import './styles.css';

/**
 * Frontend user dashboard endpoint that represents an array of collections from an HTTP get request.
 *
 * @file defines Collections page route
 * @since 2021-04-08
 * @tutorial https://codesandbox.io/s/framer-motion-accordion-vmj0n?file=/src/Example.tsx:366-489
 */

interface ViewProps {
  collection: Collection;
  collections: Collection[];
  i: number;
  id?: string;
  collectionId: string;
  setCollectionId: React.Dispatch<React.SetStateAction<string>>;
  expandedCollection: number;
  setExpandedCollection: React.Dispatch<React.SetStateAction<number>>;
  expandedCollectionDetails: false | number;
  setExpandedCollectionDetails: React.Dispatch<
    React.SetStateAction<number | false>
  >;
}

export const View: React.FC<ViewProps> = ({
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
        <header onClick={() => setExpandedCollection(isOpen ? 0 : i)}>
          <Box>
            <Text>{collection.name}</Text>
            <Text as="span" color="gray.600" fontSize="sm">
              {collection.snippets.length} snips
            </Text>
          </Box>

          {isOpen ? (
            <MinusIcon fontSize="12px" />
          ) : (
            <AddIcon fontSize="12px" />
          )}
        </header>

        <AnimatePresence initial={false}>
          {isOpen && (
            <MotionBox
              as="section"
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
              {collection.snippets &&
                collection.snippets.map((snippet, index) => (
                  <CollectionTable
                    key={`${index}-table-collection-${collection._id}-snippet-${snippet._id}`}
                    snippet={snippet}
                    i={i}
                    collection={collection}
                    collections={collections}
                    setCollectionId={setCollectionId}
                    setExpandedCollection={setExpandedCollection}
                  />
                ))}
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
};
