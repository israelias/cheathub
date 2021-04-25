/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
  useColorModeValue as mode,
  Button,
  Flex,
  Stack,
  Text,
  Link,
  HStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Select,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MinusIcon,
} from '@chakra-ui/icons';
import { PATHS } from '../../constants/paths.constants';
import { useUserContext } from '../../context/user.context';
// import { data as collections, data } from '../../testapi';
import { TimeAgo } from '../shared/time';

interface CollectionsProps {
  IloggedIn?: Boolean;
  Iusername?: String;
  collections: Collection[];
}

const Collections: React.FC<CollectionsProps> = ({
  IloggedIn,
  Iusername,
  collections,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { username } = useUserContext();
  const [collectionId, setCollectionId] = React.useState('');

  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple>
        {collections.map((collection, i) => (
          <>
            <AccordionItem key={i}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Flex
                        flex="1"
                        textAlign="left"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box fontWeight="light" fontSize="16px">
                          {collection.name}
                        </Box>
                        {collection.snippets && (
                          <Box
                            as="span"
                            color="gray.600"
                            fontSize="sm"
                            mr={3}
                          >
                            {collection.snippets.length} snips
                          </Box>
                        )}
                      </Flex>
                      {isExpanded ? (
                        <MinusIcon fontSize="12px" />
                      ) : (
                        <AddIcon fontSize="12px" />
                      )}
                    </AccordionButton>
                  </h2>
                  {collection.snippets &&
                    collection.snippets.map((snippet) => (
                      <AccordionPanel
                        key={snippet._id}
                        pb={4}
                        borderTop={['1px solid']}
                        // borderBottom={['1px solid']}
                        borderColor={mode('#fff', '#878787')}
                      >
                        <Table size="sm">
                          <Thead>
                            <Tr>
                              <Th
                                colspan={2}
                                _before={{
                                  content: `">"`,
                                  position: 'absolute',
                                  left: '16px',
                                }}
                              >
                                {' '}
                                {snippet.title}
                              </Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr>
                              <Td>lang</Td>
                              <Td textAlign="right">
                                {snippet.language}
                              </Td>
                            </Tr>
                            <Tr>
                              <Td>also in</Td>
                              <Td textAlign="right">
                                <Select>
                                  {collections.map((col) =>
                                    col.snippets.map(
                                      (snip: Snippet, j: number) =>
                                        snip._id === snippet._id && (
                                          <option value={col.name}>
                                            {col.name}
                                          </option>
                                        )
                                    )
                                  )}
                                </Select>
                              </Td>
                            </Tr>
                            <Tr>
                              <Td>last modified</Td>
                              <Td isNumeric textAlign="right">
                                <TimeAgo date={snippet.updatedOn} />
                              </Td>
                            </Tr>
                            <AccordionItem>
                              <AccordionButton>
                                <Flex
                                  flex="1"
                                  textAlign="left"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Text as="sub">
                                    Expand further.
                                  </Text>
                                  <AccordionIcon />
                                </Flex>
                              </AccordionButton>

                              <AccordionPanel pb={4}>
                                <Tr>
                                  <Td>source</Td>
                                  <Td textAlign="right">
                                    <Link
                                      href={snippet.source}
                                      target="_blank"
                                      noReferer="true"
                                      isTruncated
                                    >
                                      {snippet.source.slice(0, 12)}
                                    </Link>
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td>file</Td>
                                  <Td textAlign="right">
                                    {snippet.filename}
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td>likes</Td>
                                  <Td isNumeric>
                                    {snippet.likedBy.length > 0
                                      ? snippet.likedBy.length
                                      : 0}
                                  </Td>
                                </Tr>
                              </AccordionPanel>
                            </AccordionItem>
                          </Tbody>
                          <Tfoot>
                            <Tr>
                              <Th textAlign="right" colspan={2}>
                                Edit Snippet
                              </Th>
                            </Tr>
                          </Tfoot>
                        </Table>

                        {/* <Flex
                          flex="1"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box
                            as="h3"
                            color="gray.600"
                            fontSize="sm"
                            _before={{ content: `">"` }}
                          >
                            {snippet.title}
                          </Box>

                          <HStack pr={6} maxWidth="50%">
                            <Link
                              href={snippet.source}
                              color="gray.600"
                              fontSize="sm"
                            >
                              EDIT
                            </Link>
                            <Text
                              as="samp"
                              isTruncated
                              color="gray.600"
                              fontSize="sm"
                            >
                              {snippet.filename}
                            </Text>
                          </HStack>
                        </Flex>
                        <Flex
                          flex="1"
                          justifyContent="space-between"
                          alignItems="center"
                          mt={2}
                        >
                          <HStack>
                            <Text
                              as="span"
                              color="gray.600"
                              fontSize="xs"
                            >
                              {snippet.language}
                            </Text>

                            <Text
                              as="span"
                              color="gray.600"
                              fontSize="xs"
                            >
                              <TimeAgo date={snippet.updatedOn} />
                            </Text>
                          </HStack>
                          <HStack pr={6}>
                            <Text
                              href={snippet.source}
                              color="gray.600"
                              fontSize="sm"
                            >
                              Source
                            </Text>

                            <Link
                              href={snippet.source}
                              target="_blank"
                              noReferer="true"
                              color="gray.600"
                              fontSize="xs"
                              isTruncated
                            >
                              SOURCE {snippet.source}
                            </Link>
                          </HStack>
                        </Flex> */}
                      </AccordionPanel>
                    ))}
                </>
              )}
            </AccordionItem>
          </>
        ))}
      </Accordion>
    </>
  );
};

export default Collections;
// addedBy: 'noah',
//         addedOn: 'Thu, 01 Apr 2021 14:25:50 GMT',
//         description: 'Define a linked-list in Python',
//         filename: 'nody.py',
//         language: 'Python',
//         likedBy: ['chris', 'kate', 'kevin', 'noah'],
//         private: false,
//         source: 'https://stackoverflow.com',
//         tags: ['python', 'class'],
//         title: 'Python Node Implementation',
//         updatedOn: 'Thu, 01 Apr 2021 14:25:50 GMT',
