/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

import { AnimatePresence } from 'framer-motion';

import cn from 'classnames';

import { Viewer } from '../../snippet/editor/viewer';
import {
  MotionSection,
  MotionBox,
  MotionFooter,
} from '../../shared/motion-box';
import { useUserContext } from '../../../context/user.context';

import {
  Description,
  TagList,
  TagMenu,
  PostUserData,
  PostFaveData,
  SourceButton,
  EditButton,
  FaveButton,
} from '../../snippet/body/elements';
import '../../styles.css';
import { useAppData } from '../../../context/appdata.context';

/**
 * Frontend user dashboard endpoint that represents an array of collections from an HTTP get request.
 *
 * @file defines Collections page route
 * @since 2021-04-08
 * @tutorial https://codesandbox.io/s/framer-motion-accordion-vmj0n?file=/src/Example.tsx:366-489
 */

const SnippetItem: React.FC<{
  snippet: Snippet;
  index: number;
  selectedSnippetId: string;
  setSelectedSnippetId: React.Dispatch<React.SetStateAction<string>>;
  expandedSnippet: number;
  setExpandedSnippet: React.Dispatch<React.SetStateAction<number>>;
  handleFave?: (snipId: string) => Promise<void>;
  faveSnippet?: boolean;
  editing?: boolean;
}> = ({
  snippet,
  index,
  selectedSnippetId,
  setSelectedSnippetId,
  expandedSnippet,
  setExpandedSnippet,
  handleFave,
  faveSnippet,
  editing = false,
}) => {
  const isOpen =
    selectedSnippetId === snippet._id || index === expandedSnippet;
  const className = cn('accordion', {
    'accordion--open': isOpen,
    'accordion--next-to-open': index === expandedSnippet - 1,
  });
  const { username } = useUserContext();
  const { setTags } = useAppData();

  return (
    <Box
      as="article"
      className={className}
      bg={mode('#f6f1ef', '#141625')}
    >
      <Box
        as="header"
        borderRadius="6px"
        border={['1px solid transparent']}
        _hover={{
          border: mode('1px solid #f6f6f6', '1px solid #6400e4'),
        }}
        bg={
          isOpen
            ? mode('#f6f6f6', '#252945')
            : mode('#fff', '#252945')
        }
        onClick={() => {
          setSelectedSnippetId(isOpen ? '' : snippet._id);
          setExpandedSnippet(isOpen ? 0 : index);
        }}
      >
        <Text>{snippet.title}</Text>
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
      </Box>

      <AnimatePresence exitBeforeEnter>
        {isOpen && (
          <MotionSection
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
            <Description description={snippet.description} />

            {snippet.addedBy === username ? (
              <EditButton collections snipId={snippet._id} />
            ) : (
              <FaveButton
                collections
                username={username}
                snipId={snippet._id}
                likedBy={snippet.likedBy}
                faveSnippet={faveSnippet}
                handleFave={handleFave}
              />
            )}
          </MotionSection>
        )}
      </AnimatePresence>
      <MotionFooter p={2}>
        <Flex spacing={4}>
          <Box flex="1" display="flex">
            <TagList
              collections
              tags={snippet.tags}
              editing={editing}
              setTags={setTags}
            />

            {!editing && snippet.tags.length > 3 && (
              <TagMenu
                collections
                tags={snippet.tags}
                editing={editing}
                setTags={setTags}
              />
            )}
          </Box>

          <Box display="flex">
            {!editing && snippet && (
              <PostUserData
                username={username}
                addedBy={snippet.addedBy}
                addedOn={snippet.addedOn}
              />
            )}
            {!editing && snippet && snippet.likedBy.length > 0 && (
              <PostFaveData likedBy={snippet.likedBy} />
            )}
          </Box>

          <Box display="flex" spacing={1} ml="8px">
            {snippet.source && (
              <SourceButton source={snippet.source} />
            )}
            {!editing && snippet && snippet.addedBy === username ? (
              <EditButton snipId={snippet._id} />
            ) : (
              !editing &&
              snippet &&
              username && (
                <FaveButton
                  username={username}
                  snipId={snippet._id}
                  likedBy={snippet.likedBy}
                  faveSnippet={faveSnippet}
                  handleFave={handleFave}
                />
              )
            )}
          </Box>
        </Flex>
      </MotionFooter>
    </Box>
  );
};

export default SnippetItem;
