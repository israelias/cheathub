/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-extra-boolean-cast */
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  // useMutation,
  // useQueryClient,
} from 'react-query';
import axios from 'axios';
import { Search } from '../components/snippet_crud/search-form';
// import { ToUserButton } from '../components/shared/special-button'
import { getRequest } from '../lib/fetcher';
import { useUserContext } from '../context/user.context';
import { isError } from '../lib/isError';
import {
  MainFeed,
  Container as MainContainer,
} from '../components/layout/commonCard';
import useIntersectionObserver from '../lib/useIntersect';
import Layout from '../components/layout';

interface FetchProps {
  page: number;
  tag: string;
}
const fetchSnippets = async ({ page = 1, tag = '' }: FetchProps) => {
  const { data } = await axios.get(
    `http://localhost:5000/api/snippets?page=${page}&tags=${tag}`
  );
  return data;
};

interface ExploreProps extends RouteComponentProps<{ id: string }> {
  snippets: Snippet[];
}

export const Explore: React.FC<ExploreProps> = ({
  snippets,
  history,
  match,
}) => {
  const queryClient = useQueryClient();
  const user = useUserContext();
  const username = user!.username ? user!.username : 'joem';
  const [tagParam, setTagParam] = React.useState('');
  const [pageParam, setPageParam] = React.useState(1);
  // const [currentTag, setCurrentTag] = React.useState('');
  // const onTagParamClick = (tag: string) => setTagParam(tag);

  const {
    error,
    status,
    data,
    isFetching,
    isPreviousData,
  } = useQuery(
    ['snippets', pageParam, tagParam],
    () => fetchSnippets({ page: pageParam, tag: tagParam }),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  React.useEffect(() => {
    if (data?.meta.has_next) {
      queryClient.prefetchQuery(['snippets', pageParam + 1], () =>
        fetchSnippets({
          page: pageParam + 1,
          tag: tagParam,
        })
      );
    }
  }, [data, pageParam, tagParam, queryClient]);

  const loadMoreButtonRef = React.useRef<HTMLButtonElement>(null);
  useIntersectionObserver(loadMoreButtonRef, {
    enabled: data?.meta.has_next,
    // onIntersect: fetchNextPage,
    onIntersect: () => {
      setPageParam((p) => p + 1);
      queryClient.prefetchQuery(['snippets', pageParam + 1], () =>
        fetchSnippets({
          page: pageParam + 1,
          tag: tagParam,
        })
      );
    },
  });
  // const isVisible = !!entry?.isIntersecting;

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' && isError(error) ? (
    <p>Error: {error.message}</p>
  ) : (
    <Layout>
      <MainContainer>
        <MainFeed snippets={data?.items} />
      </MainContainer>

      <div>
        <div>
          Current Page:
          {pageParam + 1}
        </div>
        <button
          type="button"
          onClick={() => setPageParam((old) => Math.max(old - 1, 0))}
          disabled={pageParam === 0}
        >
          Previous
        </button>
        <button
          type="button"
          ref={loadMoreButtonRef}
          // onClick={() => setPageParam((p) => p + 1)}
          onClick={() => {
            setPageParam((old) =>
              data?.meta.has_next ? old + 1 : old
            );
          }}
          disabled={isPreviousData || !data?.meta.has_next}
        >
          Next Page
        </button>

        <div>{isFetching ? 'Fetching...' : null}</div>
      </div>
    </Layout>
  );
};
