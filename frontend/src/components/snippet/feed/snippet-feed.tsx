/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from 'react';
// import { string } from 'yup/lib/locale';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Tag,
  TagProps,
  Button,
  ButtonProps,
  HStack,
  chakra,
  Link as Linker,
  useColorModeValue as mode,
  HTMLChakraProps,
} from '@chakra-ui/react';
import {
  HTMLMotionProps,
  motion,
  AnimatePresence,
  AnimateSharedLayout,
  AnimationProps,
  usePresence,
} from 'framer-motion';
import { Viewer } from '../editor/viewer';
import { TimeAgo } from '../../shared/time';

type Merge<P, T> = Omit<P, keyof T> & T;

type MotionBoxProps = Merge<
  HTMLChakraProps<'div'>,
  HTMLMotionProps<'div'>
>;

export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

const MotionBoxTwo = motion(Box);

const MotionBoxThree: React.FC = ({ children }) => {
  const [isPresent, safeToRemove] = usePresence();

  React.useEffect(() => {
    !isPresent && setTimeout(() => safeToRemove, 1000);
  }, [isPresent]);
  return <div>{children}</div>;
};

interface SnippetFeedProps {
  snippets: Snippet[];
  searchBy: SearchBy;
  searchTerm: SearchTerm;
  username: string;
  setTagId: () => void;
  setUsernameId: () => void;
  tagParam?: string;
  setTagParam: React.Dispatch<React.SetStateAction<string>>;
  // setCurrentTag: () => void;
}
// useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]

export const SnippetFeed: React.FC<SnippetFeedProps> = ({
  snippets,
  searchBy,
  searchTerm,
  username,
  setTagId,
  setUsernameId,
  tagParam,
  setTagParam,
  // setCurrentTag,
}) => {
  // const [tagParam, setTagParam] = React.useState('');
  const wtf = 'wtf';

  return (
    <AnimateSharedLayout type="crossfade">
      <MotionBoxTwo
        variants={{
          open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          },
          closed: {
            transition: {
              staggerChildren: 0.05,
              staggerDirection: -1,
            },
          },
        }}
      >
        {snippets.map(
          (snippet) =>
            // snippet[searchBy].indexOf(searchTerm) !== -1
            true && (
              <AnimatePresence exitBeforeEnter>
                <>
                  <MotionBoxTwo
                    // maxW="sm"
                    padding={['0 10px']}
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
                    <Box
                      padding={['0 10px']}
                      border={['1px solid #bbb']}
                    >
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
                          <Box
                            as="span"
                            ml="2"
                            color="gray.600"
                            fontSize="sm"
                          >
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
                  </MotionBoxTwo>
                </>
              </AnimatePresence>
            )
        )}
      </MotionBoxTwo>
    </AnimateSharedLayout>
  );
};
