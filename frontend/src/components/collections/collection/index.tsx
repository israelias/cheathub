import React from 'react';
import {
  Box,
  Text,
  HStack,
  Flex,
  List,
  ListItem,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';

import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { AnimatePresence } from 'framer-motion';

import cn from 'classnames';

import { MotionBox } from '../../shared/motion';

import '../styles.css';

/**
 * Frontend user dashboard endpoint that represents an array of collections from an HTTP get request.
 *
 * A card/accordion counterpart of CollectionItem
 * Relies on State and setState props passed by Collection page.
 * @see CollectionCrud
 * @file defines Collections page route
 * @since 2021-04-08
 * @tutorial https://codesandbox.io/s/framer-motion-accordion-vmj0n?file=/src/Example.tsx:366-489
 */

const CollectionItem: React.FC<{
  collection: Collection;
  id: string;
  index: number;
  expanded: number;
  setExpanded: React.Dispatch<React.SetStateAction<number>>;
  setSelections: React.Dispatch<
    React.SetStateAction<Snippet[] | undefined>
  >;
  selectedSnippetId: string;
  setSelectedSnippetId: React.Dispatch<React.SetStateAction<string>>;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setExpandedSnippet?: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  collection,
  id,
  index,
  setId,
  expanded,
  setExpanded,
  setSelections,
  selectedSnippetId,
  setSelectedSnippetId,
  setExpandedSnippet,
  setHeading,
}) => {
  const isOpen = id === collection._id;
  const className = cn('accordion', {
    'accordion--open': isOpen,
    'accordion--next-to-open': index === expanded - 1,
  });
  const history = useHistory();

  return (
    <>
      <Box bg={mode('#fff', '#141625')} className={className}>
        <Box
          as="header"
          _hover={{
            bg: mode('#f6f6f6', '#252945'),
          }}
          bg={
            isOpen
              ? mode('#f6f6f6', '#252945')
              : mode('#fff', '#141625')
          }
          onClick={() => {
            setId(isOpen ? '' : collection._id);
            setExpanded(isOpen ? 0 : index);
            setSelections(collection.snippets);
            setExpandedSnippet && setExpandedSnippet(0);
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
              {collection.snippets.length > 0 ? (
                <>
                  {collection.snippets.length}{' '}
                  {collection.snippets.length > 1 ? 'snips' : 'snip'}
                </>
              ) : (
                'Empty'
              )}
            </Text>
            {isOpen ? (
              <MinusIcon fontSize="12px" />
            ) : (
              <AddIcon fontSize="12px" />
            )}
          </Box>
        </Box>

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
                cursor="pointer"
                onClick={() => {
                  setExpanded(isOpen ? -1 : index - 1);
                  setTimeout(() => {
                    history.push(`/collection/${collection._id}`);
                  }, 750);
                }}
              >
                <Text as="span" color="gray.600" fontSize="sm">
                  Edit this collection
                </Text>
                <MinusIcon />
              </Flex>
              <List>
                {collection.snippets &&
                  collection.snippets.map((snippet, idx) => (
                    <ListItem
                      key={`${idx}-list-item-${collection._id}-snippet-${snippet._id}`}
                      cursor="pointer"
                      bg={
                        selectedSnippetId === snippet._id
                          ? mode('#f6f6f6', '#252945')
                          : 'none'
                      }
                      _hover={{
                        bg: mode('#f6f6f6', '#252945'),
                        borderRadius: '6px',
                      }}
                      onClick={() => {
                        setSelections([snippet]);
                        setSelectedSnippetId(snippet._id);
                        setExpandedSnippet && setExpandedSnippet(0);
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
