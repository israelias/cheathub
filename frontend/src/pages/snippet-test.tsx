import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  useQuery,
  // useInfiniteQuery,
  // useQueryClient,
  // useMutation,
  // useQueryClient,
} from 'react-query';
import axios from 'axios';
// import { LoggedinHeader } from '../components/shared/header';
// import { Search } from '../components/snippet_crud/search-form';
import { SnippetFeed } from '../components/snippet-feed';
// import { ToUserButton } from '../components/shared/special-button'
import { getRequest } from '../lib/fetcher';
import { useUserContext } from '../context/user.context';
import { isError } from '../lib/isError';
import {
  MainHeader,
  // MainFeed,
  Container as MainContainer,
} from '../components/layout/commonCard';

// import useIntersectionObserver from '../lib/useIntersect';

interface ProfileProps
  extends RouteComponentProps<{ id: string }> {
  snippets: Snippet[];
}

export const SnipTest: React.FC<ProfileProps> = ({
  snippets,
  history,
  match,
}) => {
  const user = useUserContext();
  const username = user!.username ? user!.username : 'joem';
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBy, setSearchBy] = React.useState<SearchBy>(
    'title'
  );
  const [tagId, setTagId] = React.useState('');
  const [usernameId, setUsernameId] = React.useState('');
  const onTagIdClick = () => setTagId(tagId);
  const onUsernameIdClick = () => setUsernameId(usernameId);

  const {
    data: dataS,
    error: errorS,
    isLoading: isLoadingS,
    status: statusS,
  } = useQuery('testSnips', () =>
    getRequest({
      url: `api/users/joem/snippets`,
      accessToken: user!.accessToken,
    })
  );
  if (isLoadingS) return <p>Loading...</p>;
  if (statusS === 'error') {
    if (isError(errorS)) {
      return (
        <p>{`An error has occurred: ${errorS.message}`}</p>
      );
    }
  }

  return (
    <div>
      {/* <LoggedinHeader
        loggedIn={true}
        username={match.params.id}
      /> */}
      <MainHeader />
      <SnippetFeed
        setTagId={onTagIdClick}
        setUsernameId={onUsernameIdClick}
        searchBy={searchBy}
        searchTerm={searchTerm}
        snippets={dataS}
        username={username}
      />
      ;
    </div>
  );
};
