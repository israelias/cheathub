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
import { Viewer } from '../snippet/editor/viewer';
import { MotionBox } from '../shared/motion-box';

import './styles.css';

/**
 * Frontend user dashboard endpoint that represents an array of collections from an HTTP get request.
 *
 * @file defines Collections page route
 * @since 2021-04-08
 * @tutorial https://codesandbox.io/s/framer-motion-accordion-vmj0n?file=/src/Example.tsx:366-489
 */

interface CardBodyProps {
  title?: string;
  description: string;
  addedBy?: string;
  addedOn?: string;
  codeId: string;
  codeValue: string;
  codeLanguage: string;
  likedBy?: number;
}

export const CardBody: React.FC<CardBodyProps> = ({
  title,
  description,
  addedBy,
  addedOn,
  likedBy,
  codeId,
  codeValue,
  codeLanguage,
}) => {
  const isOpen = true;

  return (
    <>
      <Viewer id={codeId} value={codeValue} language={codeLanguage} />
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
          <p>{description}</p>
        </MotionBox>
        <MotionBox
          d="flex"
          mt="2"
          alignItems="center"
          justifyContent="space-between"
        >
          {addedBy && (
            <Box>
              {addedBy}
              <Box
                as="span"
                ml="2"
                color="gray.600"
                fontSize="sm"
                _after={{ content: `'/'` }}
              >
                {addedOn && <TimeAgo date={addedOn} />}
              </Box>
            </Box>
          )}

          {likedBy && (
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {likedBy} likes
            </Box>
          )}
        </MotionBox>
      </MotionBox>
    </>
  );
};

interface CardHeaderProps {
  title: string;
  codeLanguage: string;
  isOpen: boolean;
  setExpandedSnippet: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  codeLanguage,
  isOpen,
  setExpandedSnippet,
  index,
}) => {
  const isOpenning = true;

  return (
    <>
      <header onClick={() => setExpandedSnippet(isOpen ? 0 : index)}>
        <Box>
          <Text>{title}</Text>
          <Text as="span" color="gray.600" fontSize="sm">
            {codeLanguage}
          </Text>
        </Box>

        {isOpen ? (
          <MinusIcon fontSize="12px" />
        ) : (
          <AddIcon fontSize="12px" />
        )}
      </header>
    </>
  );
};

interface CardFooterProps {
  tags: string[];
  codeLanguage: string;
  addedBy: string;
  addedOn: string;
  isOpen: boolean;
  setExpandedSnippet: React.Dispatch<React.SetStateAction<number>>;
  index: number;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  tags,
  addedBy,
  addedOn,
  setExpandedSnippet,
  index,
}) => {
  const isOpenning = true;

  return (
    <>
      <footer>
        <HStack spacing={4}>
          {tags.map((tag, index) => (
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
            {addedBy}
            <Box
              as="span"
              ml="2"
              color="gray.600"
              fontSize="sm"
              _after={{ content: `'/'` }}
            >
              <TimeAgo date={addedOn} />
            </Box>
          </Box>
        </HStack>
      </footer>
    </>
  );
};
