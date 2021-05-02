/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';

import { RouteComponentProps } from 'react-router';

import {
  Flex,
  Heading,
  IconButton,
  Button,
  ButtonGroup,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Box,
  HStack,
  useMediaQuery,
  GridItem,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useBoolean,
  Tooltip,
  useClipboard,
  VStack,
} from '@chakra-ui/react';

import {
  CheckIcon,
  InfoIcon,
  WarningIcon,
  CopyIcon,
  AddIcon,
  CloseIcon,
  LinkIcon,
  EditIcon,
  MinusIcon,
} from '@chakra-ui/icons';

import { AnimatePresence, motion } from 'framer-motion';

import {
  putRequest,
  getRequest,
  postRequest,
  deleteRequest,
  putReload,
  postReload,
} from '../lib/fetcher';

import { useUserContext } from '../context/user.context';
import { LANGUAGES } from '../constants/languages.constants';
import { EditSnippet } from '../components/snippet/crud/edit-snippet';
import { Primary } from '../containers/primary.container';
import { Secondary } from '../containers/secondary.container';
import { Content } from '../connectors/main';
import { SideNav } from '../connectors/side';
import { SelectInput } from '../components/snippet/crud/select-input';
import { TextInput } from '../components/snippet/crud/text-search-input';

import { Viewer } from '../components/snippet/editor/viewer';

import { TimeAgo } from '../components/shared/time';

import {
  MotionSection,
  MotionHeader,
  MotionBox,
  MotionFooter,
  MotionAside,
  MotionUl,
  MotionLi,
  MotionP,
} from '../components/shared/motion-box';

const MotionArticle = motion(Box);

interface OneSnipProps {
  snippet: Snippet | undefined;
  editing: boolean;
  loading: boolean;
  title: string;
  language: string;
  value: string;
  description: string;
  tags: string;
  source: string;
  id: string;
}

/**
 * Frontend private endpoint that represents a single code snippet post.
 * Selected by `_id`.
 * CRUD operations begin from this component tree.
 * @file defines route for one unique Snippet.
 * @date 2021-04-21
 * @param {any} match
 * @param {any} history
 * @return {=>}
 */
export const OneSnippet: React.FC<OneSnipProps> = ({
  snippet,
  editing,
  loading,
  title,
  language,
  value,
  description,
  tags,
  source,
  id,
}) => {
  const { accessToken, username } = useUserContext();
  const [baseLg] = useMediaQuery('(min-width: 62em)');

  const { hasCopied, onCopy } = useClipboard(value);

  const [lineNumbers, setLineNumbers] = useBoolean();
  const [wrapLines, setWrapLines] = useBoolean();
  const [faveSnippet, setFaveSnippet] = useBoolean();

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {!loading && (
          <MotionArticle
            as="article"
            borderWidth="1px"
            borderRadius="lg"
            border={['1px solid #bbb']}
            overflow="hidden"
            mx="auto"
            my={6}
            width="100%"
            p={['10px']}
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
            positionTransition
          >
            <Flex
              as="header"
              height="50px"
              bg="#f6f6f6"
              borderRadius="6px"
              borderBottom={['1px solid #f6f6f6']}
              alignItems="center"
              padding="20px"
              justifyContent="space-between"
              _hover={{ bg: '#fff' }}
              cursor="default"
            >
              <h2>{title}</h2>

              <h3>{language}</h3>
            </Flex>

            <>
              <MotionSection
                pt="6px"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.04, 0.62, 0.23, 0.98],
                }}
              >
                <MotionBox ml="-10px" mr="-10px">
                  {editing && (
                    <HStack>
                      <ButtonGroup
                        size="xs"
                        isAttached
                        variant="outline"
                      >
                        <Button
                          onClick={setLineNumbers.toggle}
                          mr="-px"
                          fontWeight="light"
                          rightIcon={
                            lineNumbers ? (
                              <CheckIcon fontSize="10px" />
                            ) : (
                              <CloseIcon fontSize="10px" />
                            )
                          }
                        >
                          {lineNumbers
                            ? 'Hide line numbers'
                            : 'Show line numbers'}
                        </Button>

                        <Button
                          onClick={setWrapLines.toggle}
                          mr="-px"
                          fontWeight="light"
                          rightIcon={
                            wrapLines ? (
                              <CheckIcon fontSize="10px" />
                            ) : (
                              <CloseIcon fontSize="10px" />
                            )
                          }
                        >
                          {wrapLines
                            ? 'Keep long lines'
                            : 'Wrap long lines'}
                        </Button>

                        <Button
                          fontWeight="light"
                          mr="-px"
                          rightIcon={
                            hasCopied ? (
                              <CheckIcon fontSize="10px" />
                            ) : (
                              <CopyIcon fontSize="10px" />
                            )
                          }
                        >
                          Copy
                        </Button>
                      </ButtonGroup>
                    </HStack>
                  )}
                  <IconButton
                    variant="outline"
                    color="gray.400"
                    bg="rgb(255,255,255, .3)"
                    size="xs"
                    aria-label="Copy snippet"
                    onClick={onCopy}
                    icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                    position="absolute"
                    right="36px"
                    mt="10px"
                  />
                  <Viewer
                    id={id}
                    value={value}
                    language={language}
                    wrapLongLines={wrapLines}
                    showLineNumbers={lineNumbers}
                  />
                </MotionBox>

                <MotionP
                  p="10px"
                  fontSize="14px"
                  fontWeight="medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                  d="flex"
                  alignItems="baseline"
                >
                  {description}
                </MotionP>
              </MotionSection>
              <MotionFooter p={2}>
                <HStack
                  display="flex"
                  alignItems="center"
                  spacing={4}
                >
                  <MotionUl listStyleType="none" display="flex">
                    {editing
                      ? tags &&
                        tags
                          .split(', ')

                          .map((tag) => (
                            <MotionLi
                              key={`form-${tag}`}
                              color="gray.600"
                              fontSize="sm"
                              cursor="pointer"
                              pr="12px"
                              _before={{
                                content: `'+ '`,
                                fontWeight: 'bold',
                              }}
                              _hover={{ textDecoration: 'underline' }}
                            >
                              {tag}
                            </MotionLi>
                          ))
                      : tags &&
                        tags
                          .split(', ')
                          .slice(0, 3)
                          .map((tag) => (
                            <MotionLi
                              key={`form-${tag}`}
                              color="gray.600"
                              fontSize="sm"
                              cursor="pointer"
                              pr="12px"
                              _before={{
                                content: `'+ '`,
                                fontWeight: 'bold',
                              }}
                              _hover={{ textDecoration: 'underline' }}
                            >
                              {tag}
                            </MotionLi>
                          ))}
                    {!editing && tags.split(', ').length > 3 && (
                      <IconButton
                        variant="outline"
                        color="gray.400"
                        bg="rgb(255,255,255, .3)"
                        size="xs"
                        p={0}
                        aria-label="See more tags"
                        icon={<AddIcon fontSize="10px" />}
                      />
                    )}
                  </MotionUl>

                  {!editing && snippet && (
                    <Box
                      as="span"
                      _before={{
                        content: `': '`,
                        fontSize: 'sm',
                        fontWeight: 'bold',
                      }}
                    >
                      {snippet.addedBy}
                      <Box
                        as="span"
                        ml="2"
                        color="gray.600"
                        fontSize="sm"
                        _after={{ content: `'.'` }}
                      >
                        <TimeAgo date={snippet.addedOn} />
                      </Box>
                    </Box>
                  )}
                  {!editing && snippet && snippet.likedBy.length > 0 && (
                    <Tooltip
                      hasArrow
                      arrowSize={6}
                      closeDelay={500}
                      size="sm"
                      variant="outline"
                      placement="right-end"
                      gutter={20}
                      colorScheme="whatsapp"
                      label={
                        <VStack as="ul">
                          {snippet.likedBy.map((like, i) => (
                            <Box
                              as="li"
                              fontSize="12px"
                              key={`${i}-${id}-${like}`}
                            >
                              {like}
                            </Box>
                          ))}
                        </VStack>
                      }
                      bg="red.600"
                    >
                      <Box
                        as="span"
                        ml="2"
                        color="gray.600"
                        fontSize="sm"
                        _before={{
                          content: `'/ '`,
                          color: 'blue.400',
                          fontWeight: 'bold',
                        }}
                      >
                        {snippet.likedBy.length} likes
                      </Box>
                    </Tooltip>
                  )}
                  {source && (
                    <IconButton
                      variant="link"
                      as="a"
                      aria-label="Source"
                      href={source}
                      target="_blank"
                      rel="noreferrer"
                      icon={<LinkIcon fontSize="10px" />}
                    />
                  )}
                  {!editing &&
                  snippet &&
                  snippet.addedBy === username ? (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => snippet._id}
                      mr="-px"
                      fontWeight="light"
                      rightIcon={<EditIcon fontSize="10px" />}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="xs"
                      mr="-px"
                      fontWeight="light"
                      rightIcon={
                        faveSnippet ? (
                          <MinusIcon fontSize="10px" />
                        ) : (
                          <AddIcon fontSize="10px" />
                        )
                      }
                      onClick={() => {
                        setFaveSnippet.toggle();
                        // handleFave();
                      }}
                    >
                      {!editing &&
                      username &&
                      snippet &&
                      !faveSnippet &&
                      snippet.likedBy.includes(username)
                        ? 'Unfave'
                        : 'Fave'}
                    </Button>
                  )}
                </HStack>
              </MotionFooter>
            </>
          </MotionArticle>
        )}
      </AnimatePresence>
    </>
  );
};
