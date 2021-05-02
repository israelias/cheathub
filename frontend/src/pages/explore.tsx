/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-extra-boolean-cast */
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import axios from 'axios';
import { Search } from '../components/snippet/crud/search-form';
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

import { View } from '../components/snippet/view';

// interface FetchProps {
//   page: number;
//   tag: string;
// }
// const fetchSnippets = async ({ page = 1, tag = '' }: FetchProps) => {
//   const { data } = await axios.get(
//     `http://localhost:5000/api/snippets?page=${page}&tags=${tag}`
//   );
//   return data;
// };

import '../components/collections/styles.css';

interface ExploreProps extends RouteComponentProps<{ id: string }> {
  snippets: Snippet[];
}

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
export const Explore: React.FC<ExploreProps> = ({
  snippets,
  history,
  match,
}) => {
  const user = useUserContext();
  const [tagParam, setTagParam] = React.useState('');
  const [pageParam, setPageParam] = React.useState(1);

  const [expanded, setExpanded] = React.useState<false | number>(0);
  const [expandDetails, setExpandDetails] = React.useState<
    false | number
  >(false);

  // const {
  //   error,
  //   status,
  //   data,
  //   isFetching,
  //   isPreviousData,
  // } = useQuery(
  //   ['snippets', pageParam, tagParam],
  //   () => fetchSnippets({ page: pageParam, tag: tagParam }),
  //   {
  //     keepPreviousData: true,
  //     staleTime: 5000,
  //   }
  // );

  // React.useEffect(() => {
  //   if (data?.has_next) {
  //     queryClient.prefetchQuery(['snippets', pageParam + 1], () =>
  //       fetchSnippets({
  //         page: pageParam + 1,
  //         tag: tagParam,
  //       })
  //     );
  //   }
  // }, [data, pageParam, tagParam, queryClient]);

  const loadMoreButtonRef = React.useRef<HTMLButtonElement>(null);
  // useIntersectionObserver(loadMoreButtonRef, {
  //   enabled: data?.has_next,
  //   onIntersect: () => {
  //     setPageParam((p) => p + 1);
  //     queryClient.prefetchQuery(['snippets', pageParam + 1], () =>
  //       fetchSnippets({
  //         page: pageParam + 1,
  //         tag: tagParam,
  //       })
  //     );
  //   },
  // });
  // const isVisible = !!entry?.isIntersecting;

  return (
    <>
      <Secondary>fff</Secondary>
      <Content>
        {/* <>
          {data?.items?.map((item: Snippet, i: number) => (
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
        </> */}

        <div>
          <div>
            Current Page:
            {pageParam + 1}
          </div>
          <button
            type="button"
            onClick={() =>
              setPageParam((old) => Math.max(old - 1, 0))
            }
            disabled={pageParam === 0}
          >
            Previous
          </button>
          <button
            type="button"
            ref={loadMoreButtonRef}
            // onClick={() => setPageParam((p) => p + 1)}
            onClick={() => {
              // setPageParam((old) => (data?.has_next ? old + 1 : old));
            }}
            // disabled={isPreviousData || !data?.has_next}
          >
            Next Page
          </button>

          {/* <div>{isFetching ? 'Fetching...' : null}</div> */}
        </div>
      </Content>
    </>
  );
};
