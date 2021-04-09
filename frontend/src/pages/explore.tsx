import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  useQuery,
  // useMutation,
  // useQueryClient,
} from 'react-query';
// import { QueryResultBase } from '@types/react-query'
import { LoggedinHeader } from '../components/shared/header';
import { SnippetFeed } from '../components/snippet-feed';
import { Search } from '../components/snippet_crud/search-form';
// import { ToUserButton } from '../components/shared/special-button'
import { getRequest } from '../lib/fetcher';
import { useUserContext } from '../context/user.context';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

interface ExploreProps
  extends RouteComponentProps<{ id: string }> {
  snippets: Snippet[];
}

export const Explore: React.FC<ExploreProps> = ({
  snippets,
  history,
  match,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBy, setSearchBy] = React.useState<SearchBy>(
    'title'
  );
  const [tagId, setTagId] = React.useState('');
  const [usernameId, setUsernameId] = React.useState('');
  const user = useUserContext();
  const username = user!.username ? user!.username : 'joem';

  const onTagIdClick = () => setTagId(tagId);
  const onUsernameIdClick = () => setUsernameId(usernameId);
  const { isLoading, error, status, data } = useQuery(
    'allSnippets',
    () =>
      getRequest({
        url: `api/snippets`,
        accessToken: user!.accessToken,
      })
  );
  if (isLoading) return <p>Loading...</p>;

  if (status === 'error') {
    if (isError(error)) {
      return (
        <p>{`An error has occurred: ${error.message}`}</p>
      );
    }
  }

  return (
    <div>
      <LoggedinHeader loggedIn={true} username={username} />
      <Search
        query="query"
        searchBy={searchBy}
        onSearchByChange={() => setSearchBy(searchBy)}
        searchTerm={searchTerm}
        onSearchTermChange={() => setSearchTerm(searchTerm)}
      />
      <button
        type="button"
        onClick={() => history.push('/snippets/all')}
      >
        All
      </button>
      <h1>
        Searching for {searchTerm} by {searchBy}
      </h1>

      <SnippetFeed
        setTagId={onTagIdClick}
        setUsernameId={onUsernameIdClick}
        searchBy={searchBy}
        searchTerm={searchTerm}
        snippets={data}
        username={username}
      />
    </div>
  );
};
