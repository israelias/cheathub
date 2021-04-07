import * as React from 'react';
import { RouteComponentProps } from "react-router";
import { LoggedinHeader } from '../components/shared/header'
import { SnippetFeed } from '../components/snippet-feed'
import { Search } from '../components/snippet_crud/search-form'
import { ToUserButton} from '../components/shared/special-button'
import { getRequest } from "../lib/fetcher";
import { useUserContext } from '../context/user.context';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query';

interface exploreProps extends RouteComponentProps<{id: string}> {
  snippets: Snippet[];
}

export const Explore: React.FC<exploreProps> = ({
  snippets,
  history,
  match
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchBy, setSearchBy] = React.useState<searchBy>("title");
  const user = useUserContext();
  const username = user!.username ? user!.username : "joem";
  const { isLoading, error, data } = useQuery(
    'allSnippets', () =>
    getRequest({
      url: `api/snippets`,
      accessToken: user!.accessToken,
    })
   )
   if (isLoading) return <p>Loading...</p>

  //  if (error) return <p>{'An error has occurred: ' + error.message}</p>

    return (
      <div>
        <LoggedinHeader
          loggedIn={true}
          username={username}
          />
        <Search
          query={"query"}
          searchBy={searchBy}
          onSearchByChange={() => setSearchBy(searchBy)}
          searchTerm={searchTerm}
          onSearchTermChange={() => setSearchTerm(searchTerm)}
        />
        <button onClick={() => window.location.href='/snippets/all'}>All</button>
        <h1>Searching for {searchTerm} by {searchBy}</h1>

        <SnippetFeed
          searchBy={searchBy}
          searchTerm={searchTerm}
          snippets={data}
          username={username}
        />

      </div>
    );
}