/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  useQuery,
  UseQueryResult,
  useInfiniteQuery,
  // useQueryClient,
  // useMutation,
  useQueryClient,
} from 'react-query';
import axios from 'axios';
// import { LoggedinHeader } from '../components/shared/header';
// import { Search } from '../components/snippet_crud/search-form';
import { SnippetFeed } from '../components/snippet-feed';
// import { ToUserButton } from '../components/shared/special-button'
import { getRequest } from '../lib/fetcher';
import { fetchSnippets, useSnippetsInfinite } from '../lib/axios';
import { useUserContext } from '../context/user.context';
import { checkStatus } from '../lib/isError';
import useIntersectionObserver from '../lib/useIntersect';
import {
  MainHeader,
  // MainFeed,
  Container as MainContainer,
} from '../components/layout/commonCard';

// import useIntersectionObserver from '../lib/useIntersect';

interface ProfileProps extends RouteComponentProps<{ id: string }> {
  snippets: Snippet[];
}

export const SnipTest: React.FC<ProfileProps> = ({
  snippets,
  history,
  match,
}) => {
  const user = useUserContext();
  const queryClient = useQueryClient();
  const username = user!.username ? user!.username : 'joem';
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBy, setSearchBy] = React.useState<SearchBy>('title');
  const [tagId, setTagId] = React.useState('');
  const [usernameId, setUsernameId] = React.useState('');
  const onTagIdClick = () => setTagId(tagId);
  const onUsernameIdClick = () => setUsernameId(usernameId);

  const [tagParam, setTagParam] = React.useState<string>('python');
  const [pageParam, setPageParam] = React.useState<number>(1);

  const {
    snips,
    status,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSnippetsInfinite(tagParam);

  const target = React.useRef<HTMLDivElement>(null);

  useIntersectionObserver(target, {
    enabled: !!snips && hasNextPage,
    onIntersect: fetchNextPage,
  });

  const message = checkStatus(status, error);

  if (message) return <p>{message}</p>;
  return (
    <div>
      {/* <LoggedinHeader
        loggedIn={true}
        username={match.params.id}
      /> */}
      <MainHeader />
      {snips &&
        snips.map((snip) => <h1 key={snip._id}>{snip.title}</h1>)}
      {/* <SnippetFeed
        setTagId={onTagIdClick}
        setUsernameId={onUsernameIdClick}
        searchBy={searchBy}
        searchTerm={searchTerm}
        snippets={snips}
        username={username}
        // tagParam={tagParam}
        setTagParam={setTagParam}
      /> */}
      <div ref={target} />
      {isFetchingNextPage && <p>...loading more</p>}
      {!isLoading && !hasNextPage && <p>You caught them all</p>}
    </div>
  );
};
