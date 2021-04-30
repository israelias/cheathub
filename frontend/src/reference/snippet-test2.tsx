/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import axios from 'axios';
// import { LoggedinHeader } from '../components/shared/header';
// import { Search } from '../components/snippet_crud/search-form';
import { SnippetFeed } from '../components/snippet/feed/snippet-feed';
// import { ToUserButton } from '../components/shared/special-button'
import { getRequest } from '../lib/fetcher';
import { fetchSnippets } from '../lib/axios';
import { useUserContext } from '../context/user.context';
import { checkStatus } from '../lib/isError';
import useIntersectionObserver from '../lib/useIntersect';
import {
  MainHeader,
  // MainFeed,
  Container as MainContainer,
} from '../components/layout/styled/commonCard';

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
  // const queryClient = useQueryClient();
  const username = user!.username ? user!.username : 'joem';
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBy, setSearchBy] = React.useState<SearchBy>('title');
  const [tagId, setTagId] = React.useState('');
  const [usernameId, setUsernameId] = React.useState('');
  const onTagIdClick = () => setTagId(tagId);
  const onUsernameIdClick = () => setUsernameId(usernameId);

  const [tagParam, setTagParam] = React.useState<string>('');
  const [pageParam, setPageParam] = React.useState<number>(1);

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
  //   if (data?.meta.has_next) {
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
  //   enabled: data?.meta.has_next,
  //   // onIntersect: fetchNextPage,
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

  // const message = checkStatus(status, error);

  // if (message) return <p>{message}</p>;
  return (
    <div>
      {/* <LoggedinHeader
        loggedIn={true}
        username={match.params.id}
      /> */}
      <MainHeader />
      {/* <SnippetFeed
        setTagId={onTagIdClick}
        setUsernameId={onUsernameIdClick}
        searchBy={searchBy}
        searchTerm={searchTerm}
        snippets={data?.items}
        username={username}
        // tagParam={tagParam}
        setTagParam={setTagParam}
      /> */}
      <button type="button" ref={loadMoreButtonRef}>
        ''
      </button>
    </div>
  );
};
