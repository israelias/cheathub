/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-extra-boolean-cast */
import * as React from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  // useMutation,
  // useQueryClient,
} from 'react-query';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  HStack,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Search } from '../components/snippet_crud/search-form';
// import { ToUserButton } from '../components/shared/special-button'
import { getRequest } from '../lib/fetcher';
import { useUserContext } from '../context/user.context';
import { isError } from '../lib/isError';
import {
  MainFeed,
  Container as MainContainer,
} from '../components/layout/styled/commonCard';
import useIntersectionObserver from '../lib/useIntersect';

import { fetchSnippets } from '../lib/axios';
import { searchSnippets } from '../services/get.service';

import { Primary } from '../containers/primary.container';
import { Secondary } from '../containers/secondary.container';
import { Content } from '../connectors/main';
import { SideNav } from '../connectors/side';

import { View } from '../components/card/view';
import { Wrapper } from '../components/card/wrapper';
// import Collections from '../components/collections';
import { View as CollectionView } from '../components/collections/view';
import { AddCollection } from '../components/collections/add-collection';

interface CollectionsProps
  extends RouteComponentProps<{ id: string }> {}

/**
 * Frontend public endpoint that represents an array of snippets from an HTTP get request.
 *
 * @file defines Explore page route
 * @since 2021-04-08
 * @param {any} snippets
 * @param {any} history
 * @param {any} match
 * @param {any}
 * @return {=>}
 */
export const CollectionsHome: React.FC<CollectionsProps> = ({
  match,
}) => {
  const user = useUserContext();
  const username = match.params.id || user?.username;

  const router = useHistory();
  React.useEffect(() => {
    if (!(user.username || user.accessToken)) {
      router.push('/login');
    }
  });

  const { status, data } = useQuery(
    'myCollections',
    () =>
      getRequest({
        url: `api/users/${username}/collections`,
        accessToken: user?.accessToken,
      }),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const {
    status: allSnippetsStatus,
    data: allSnippetsData,
  } = useQuery(
    'allSnippets',
    () =>
      getRequest({
        url: `api/users/${username}/snippets`,
        accessToken: user?.accessToken,
      }),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  const [tagParam, setTagParam] = React.useState('');
  const [pageParam, setPageParam] = React.useState(1);

  const [expanded, setExpanded] = React.useState<false | number>(0);
  const [expandDetails, setExpandDetails] = React.useState<
    false | number
  >(false);

  const [
    expandedCollection,
    setExpandedCollection,
  ] = React.useState<number>(0);

  const [
    expandedCollectionDetails,
    setExpandedCollectionDetails,
  ] = React.useState<false | number>(0);

  const [selectedSnippets, setSelectedSnippets] = React.useState<
    false | number
  >(0);

  const [collectionsData, setCollectionsData] = React.useState(data);

  const [collectionId, setCollectionId] = React.useState<string>('');
  const [addCollection, setAddCollection] = React.useState<boolean>(
    false
  );
  return status === 'loading' ? (
    <Secondary>
      <p>Loading...</p>
    </Secondary>
  ) : status === 'error' ? (
    <Secondary>
      <p>Error fetching data...</p>
    </Secondary>
  ) : (
    <>
      <Secondary>
        <SideNav>
          <Box marginBottom="10px">
            {/* <Flex
              flex="1"
              textAlign="left"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box fontWeight="light" fontSize="16px">
                Collections
              </Box>
              <IconButton
                aria-label="add collection"
                onClick={() => setAddCollection(true)}
                icon={<AddIcon fontSize="12px" />}
              />
            </Flex> */}
          </Box>
          <Box paddingTop="10px">
            <AddCollection
              j={-1}
              id="formData"
              collectionId="formData"
              allSnippetsData={allSnippetsData}
              collectionsData={collectionsData}
              setCollectionId={setCollectionId}
              expandedCollection={expandedCollection}
              setExpandedCollection={setExpandedCollection}
            />
          </Box>
          <Box paddingTop="10px">
            {data?.map((collection: Collection, i: number) => (
              <CollectionView
                key={i}
                i={i}
                id={collection._id}
                collection={collection}
                collections={collectionsData}
                collectionId={collectionId}
                setCollectionId={setCollectionId}
                expandedCollection={expandedCollection}
                setExpandedCollection={setExpandedCollection}
                expandedCollectionDetails={expandedCollectionDetails}
                setExpandedCollectionDetails={
                  setExpandedCollectionDetails
                }
              />
            ))}
          </Box>
        </SideNav>
      </Secondary>
      <Content>
        <Wrapper>
          {data[0].snippets.map((item: Snippet, i: number) => (
            <View
              key={i}
              i={i}
              snippet={item}
              expanded={expanded}
              setExpanded={setExpanded}
              expandDetails={expandDetails}
              setExpandDetails={setExpandDetails}
            />
          ))}
        </Wrapper>
      </Content>
    </>
  );
};
