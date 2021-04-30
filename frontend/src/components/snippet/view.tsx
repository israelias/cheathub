/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Grid,
  GridItem,
  Box,
  Heading,
  Text,
  HStack,
  Flex,
  Tag,
  Button,
  ButtonProps,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useHistory } from 'react-router-dom';
import { Viewer } from './editor/viewer';
import { TimeAgo } from '../shared/time';
import { MotionBox } from '../shared/motion-box';
import { likeRequest, postRequest } from '../../lib/fetcher';
import { useUserContext } from '../../context/user.context';

interface ViewProps {
  snippet: Snippet;
  i: number;
  expanded: false | number;
  setExpanded: React.Dispatch<React.SetStateAction<number | false>>;
  expandDetails: false | number;
  setExpandDetails: React.Dispatch<
    React.SetStateAction<number | false>
  >;
}

export const View: React.FC<ViewProps> = ({
  snippet,
  i,
  expanded,
  setExpanded,
  expandDetails,
  setExpandDetails,
}) => {
  const isOpen = i === expanded;
  const [isAlsoOpen, setIsAlsoOpen] = React.useState(false);
  const isOpenDetails = i === expandDetails;
  const { username, accessToken } = useUserContext();
  const history = useHistory();
  return (
    <MotionBox
      display="grid"
      border={['1px solid']}
      borderColor="#ceccca"
      bg="#f5f0ee"
      borderRadius=".75rem"
      mb="2rem"
      pt="1.5rem"
      pb="1.875rem"
      boxShadow={['0 2px 4px 0 rgb(0 0 0 / 20%)']}
      // gridColumn={{ base: 'unset', lg: '2/3' }}
      // gridRow={{ base: 'unset', lg: '1/-1' }}
      mt={{ base: 'unset', lg: '4rem' }}
    >
      <MotionBox
        initial={false}
        fontSize="1.5rem"
        fontWeight={700}
        padding={['0 1.3rem']}
        mb="1.125rem"
        fontFamily={`Apercu, -apple-system, BlinkMacSystemFont, Segoe UI,
          Roboto, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
          sans-serif`}
      >
        <Flex justifyContent="space-between">
          <Text
            mb={0}
            mt={0}
            lineHeight="1.6"
            overflowWrap="break-word"
            wordBreak="break-word"
            textAlign="left"
          >
            {snippet.title}
          </Text>

          <CardButton
            size="xs"
            onClick={() => {
              setExpanded(isOpen ? false : i);
            }}
          >
            {snippet.filename && `.${snippet.filename.split('.')[1]}`}
          </CardButton>
        </Flex>
      </MotionBox>

      <MotionBox
        // ml="-2px"
        // mr="-2px"
        // paddingTop="3rem"
        height="100%"
        borderRadius={0}
        bg="#a5a486"
        color="#1f2326"
        // border={['3px inset']}
        borderColor="#ceccca"
      >
        <MotionBox
          id="double"
          as="div"
          mt={0}
          mb="1rem"
          // margin="1px"
          overflow="auto"
          fontFamily={['monospace, monospace']}
          fontSize="1em"
          border={['1px inset']}
          borderColor="#ceccca"
          // borderBottom={0}
          // borderTop={0}
          bg="#a5a486"
          css={{
            '&::-webkit-scrollbar': {
              width: '0px',
            },
            '&::-webkit-scrollbar-track': {
              width: '0px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#1c3535',
              borderRadius: '0px',
            },
          }}
        >
          <AnimatePresence initial={false}>
            {isOpen && (
              <MotionBox
                border={['1px solid']}
                borderColor="#a5a486"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 1, height: '0' },
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.04, 0.62, 0.23, 0.98],
                }}
                display="block"
                textAlign="left"
                fontWeight="normal"
                fontSize="0.875rem"
                overflowWrap="break-word"
                whiteSpace="pre-wrap"
                fontFamily={[
                  `'Monaco, Menlo, 'Ubuntu Mono', 'Droid Sans Mono',
                  Consolas, monospace'`,
                ]}
              >
                <Viewer
                  id={snippet._id}
                  value={snippet.value}
                  language={snippet.language}
                />
              </MotionBox>
            )}
          </AnimatePresence>
        </MotionBox>

        <MotionBox
          // HIDDEN BEFORE FOOTER DETAILS
          id="display_2"
          as="div"
          margin={0}
          // overflow="auto"
          // margin="1px"
          // height="100%"
          borderRadius={0}
          bg="#a5a486"
          color="#1f2326"
          // borderTop={['1px inset']}
          // borderColor="#ceccca"
          // mt="1rem"
          // borderTop={0}
          // borderBottom={0}
        >
          <AnimatePresence initial={false}>
            {isOpenDetails && (
              <MotionBox
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 1, height: '0' },
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.04, 0.62, 0.23, 0.98],
                  // when: 'afterChildren',
                }}
              >
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

                  <MotionBox
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
                      <Box
                        as="span"
                        ml="2"
                        color="gray.600"
                        fontSize="sm"
                      >
                        {snippet.likedBy.length} likes
                      </Box>
                    )}
                    {snippet.likedBy.length > 0 &&
                      snippet.likedBy.map((liked) => (
                        <Box
                          key={liked}
                          as="span"
                          ml="2"
                          color="gray.600"
                          fontSize="sm"
                        >
                          {liked}
                        </Box>
                      ))}
                  </MotionBox>
                </MotionBox>
              </MotionBox>
            )}
          </AnimatePresence>
        </MotionBox>
      </MotionBox>

      <MotionBox
        fontSize="1.5rem"
        fontWeight={700}
        padding={['0 1.3rem']}
        mt="1.125rem"
        fontFamily={`Apercu, -apple-system, BlinkMacSystemFont, Segoe UI,
          Roboto, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
          sans-serif`}
      >
        <Flex justifyContent="space-between">
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
          </HStack>
          <HStack>
            {snippet.addedBy === username ? (
              <CardButton variant="link" size="xs" value="+">
                <Link to={`/posts/${snippet._id}`}>Edit</Link>
              </CardButton>
            ) : (
              <CardButton
                size="xs"
                value="+"
                onFocus={() => console.log(snippet.likedBy)}
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
                {username && snippet.likedBy.includes(username)
                  ? 'Unfave'
                  : 'Fave'}
              </CardButton>
            )}

            <CardButton
              size="xs"
              value="+"
              onClick={() => {
                setExpandDetails(isOpenDetails ? false : i);
              }}
            >
              {isOpenDetails ? '-' : '+'}
            </CardButton>
          </HStack>
        </Flex>
      </MotionBox>
    </MotionBox>
  );
};

interface CardButtonProps extends ButtonProps {
  children?: React.ReactNode;
}
export const CardButton: React.FC<CardButtonProps> = ({
  children,
  ...props
}) => {
  const wtf = 'wtf';
  return (
    <Button
      gridColumn={['span 1']}
      gridRow={['span 1']}
      height={['calc(36px + 1vw)']}
      width={['calc(36px + 1vw)']}
      justifySelf="center"
      borderRadius="100%"
      bg="#f6f1ef"
      border={['1px solid']}
      borderColor={['#75685e']}
      boxShadow={['0px 0px 4px #eae5df']}
      color={['#5e5957']}
      outline="none"
      margin="8px"
      // filter={['brightness(0.95)']}
      _active={{
        filter: ['brightness(0.95)'],
        boxShadow: ['0px 0px 4px #eae5df'],
      }}
      _hover={{
        filter: ['brightness(1.00)'],
        boxShadow: ['0px 0px 2px #5e5957'],
      }}
      _focus={{
        filter: ['brightness(0.95)'],
        boxShadow: ['0px 0px 2px #5e5957'],
      }}
      _disabled={{
        opacity: '0.5',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
