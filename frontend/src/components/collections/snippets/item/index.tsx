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
  Button,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MinusIcon,
} from '@chakra-ui/icons';
import { AnimatePresence } from 'framer-motion';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import cn from 'classnames';

import { TimeAgo } from '../../../shared/time';
import { Viewer } from '../../../snippet/editor/viewer';
import { MotionBox } from '../../../shared/motion-box';
import { postRequest } from '../../../../lib/fetcher';
import { useUserContext } from '../../../../context/user.context';
import '../../styles.css';

/**
 * Frontend user dashboard endpoint that represents an array of collections from an HTTP get request.
 *
 * @file defines Collections page route
 * @since 2021-04-08
 * @tutorial https://codesandbox.io/s/framer-motion-accordion-vmj0n?file=/src/Example.tsx:366-489
 */

interface SnippetItemProps {
  snippet: Snippet;
  snippets: Snippet[];
  k: number;
  id?: string;
  selectedSnippetId: string | '';
  setSelectedSnippetId: React.Dispatch<React.SetStateAction<string>>;
  selectedSnippet: Snippet | undefined;
  setSelectedSnippet: React.Dispatch<
    React.SetStateAction<Snippet | undefined>
  >;
  expandedSnippet: number;
  setExpandedSnippet: React.Dispatch<React.SetStateAction<number>>;
  expandedSnippetDetails: number | false;
  setExpandedSnippetDetails: React.Dispatch<
    React.SetStateAction<number | false>
  >;
  editSnippet: (id: string) => Promise<void>;
}

const SnippetItem: React.FC<SnippetItemProps> = ({
  snippet,
  snippets,
  k,
  id,
  selectedSnippetId,
  setSelectedSnippetId,
  selectedSnippet,
  setSelectedSnippet,
  expandedSnippet,
  setExpandedSnippet,
  expandedSnippetDetails,
  setExpandedSnippetDetails,
  editSnippet,
}) => {
  const isOpen = k === expandedSnippet;
  const isOpenDetails = k === expandedSnippetDetails;
  const className = cn('accordion', {
    'accordion--open': isOpen,
    'accordion--next-to-open': k === expandedSnippet - 1,
  });
  const history = useHistory();
  const { username, accessToken } = useUserContext();
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <>
      <Box className={className}>
        <header
          onClick={() => {
            setExpandedSnippet(isOpen ? 0 : k);
            setSelectedSnippetId(snippet.title);
          }}
        >
          <Box>
            <Text>{snippet.title}</Text>
          </Box>
          <Box>
            <Text
              justifySelf="end"
              as="span"
              color="gray.600"
              fontSize="sm"
              mr="10px"
            >
              {snippet.language}
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
              <Viewer
                id={snippet._id}
                value={snippet.value}
                language={snippet.language}
              />
              <MotionBox
                p="6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.04, 0.62, 0.23, 0.98],
                }}
              >
                <MotionBox d="flex" alignItems="baseline">
                  <p>{snippet.description}</p>
                </MotionBox>
              </MotionBox>

              {snippet.addedBy === username ? (
                <Flex
                  as={Button}
                  padding="10px"
                  width="100%"
                  justifyContent="space-between"
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.600"
                  bg="#fff"
                  _hover={{ bg: '#f6f6f6', borderRadius: '6px' }}
                  onClick={() => {
                    setExpandedSnippet(isOpen ? -1 : -1);
                    setSelectedSnippetId(snippet._id);
                    setSelectedSnippet(snippet);
                    // editSnippet(snippet._id);
                    setIsEditing(true);
                  }}
                >
                  Edit this snippet
                  <MinusIcon />
                </Flex>
              ) : (
                <Flex
                  as={Button}
                  padding="10px"
                  width="100%"
                  justifyContent="space-between"
                  bg="#fff"
                  _hover={{ bg: '#f6f6f6', borderRadius: '6px' }}
                  onClick={() => {
                    postRequest({
                      url: `api/likesnippet/${snippet._id}`,
                      accessToken,
                      body: { like: 'like' },
                      redirectTo: '/explore',
                      history,
                    });
                  }}
                >
                  {username && snippet.likedBy.includes(username) ? (
                    <>
                      <Text>Remove from Favorites</Text>
                      <MinusIcon />
                    </>
                  ) : (
                    <>
                      <Text>Add to Favorites</Text>
                      <AddIcon />
                    </>
                  )}
                </Flex>
              )}
            </MotionBox>
          )}
        </AnimatePresence>
        <Box as="footer" padding={['0 10px']}>
          <HStack spacing={4}>
            {snippet.tags.length > 0 &&
              snippet.tags[0] !== '' &&
              snippet.tags.map((tag, index) => (
                <Box
                  key={`${index}-${tag}`}
                  as="span"
                  // ml="2"
                  color="gray.600"
                  fontSize="sm"
                  _after={{ content: `' +'` }}
                >
                  {tag}
                </Box>
              ))}
            <Box>
              {snippet.addedBy}
              <Box
                as="span"
                ml="2"
                color="gray.600"
                fontSize="sm"
                _after={{ content: `'/'` }}
              >
                <TimeAgo date={snippet.addedOn} />
              </Box>
            </Box>
            {snippet.likedBy.length > 0 && (
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {snippet.likedBy.length} likes
              </Box>
            )}
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default SnippetItem;
// header {
//   border-bottom: 1px solid #f6f6f6;
//   color: #000;
//   cursor: pointer;
//   height: 50px;
//   display: flex;
//   align-items: center;
//   padding: 0 10px;
//   justify-content: space-between;
// }

// header:hover {
//   background: #f6f6f6;
//   border-radius: 6px;
// }
