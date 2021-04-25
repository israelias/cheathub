/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from 'react';

import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Tag,
  HStack,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { Viewer } from '../editor/viewer';
import { TimeAgo } from '../shared/time';

import { View } from './view';

const MotionDiv = motion(Box);

interface SnippetCardProps {
  snippet: Snippet;
  tagParam?: string;
  setTagParam: React.Dispatch<React.SetStateAction<string>>;
}

const SnippetCard: React.FC<SnippetCardProps> = ({
  snippet,
  setTagParam,
}) => (
  <MotionDiv
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    mx="auto"
    my={6}
    positionTransition
    initial={{ opacity: 0, y: 50, scale: 0.3 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.2 },
    }}
  >
    <Box p="6">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        color={mode('gray.600', 'gray.400')}
      >
        <h2>{snippet.title}</h2>
        <Link to={`/posts/${snippet._id}`}>EDIT</Link>
        <h3>{snippet.language}</h3>
      </Flex>
    </Box>
    <section id="snippet-code">
      <Viewer
        id={snippet._id}
        language={snippet.language}
        value={snippet.value}
      />
    </section>

    <Box p="6">
      <Flex
        d="flex"
        mt="2"
        alignItems="center"
        justifyContent="space-between"
      >
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
      </Flex>

      <Box d="flex" alignItems="baseline">
        <section id="snippet-notes">
          <p>{snippet.description}</p>
        </section>
      </Box>

      <HStack spacing={4}>
        {snippet.tags.length > 0 &&
          snippet.tags[0] !== '' &&
          snippet.tags.map((tag, index) => (
            <Tag
              // as={Button}
              key={`${index}-${tag}`}
              size="sm"
              variant="outline"
              _hover={{ bg: '#494940' }}
              value={tag}
              onClick={() => setTagParam(tag)}
            >
              {tag}
            </Tag>
          ))}
      </HStack>
    </Box>
  </MotionDiv>
);

export default SnippetCard;
