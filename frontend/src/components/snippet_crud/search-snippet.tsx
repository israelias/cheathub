import React from 'react';
import { useHistory } from 'react-router-dom';
import { Search } from './search-form';
import { SnippetFeed } from '../snippet-feed';

interface SearchSnippetProps {
  username: string;
  snippets: Snippet[];
  setTagId: () => void;
  setUsernameId: () => void;
}

export const SearchSnippet: React.FC<SearchSnippetProps> = ({
  username,
  snippets,
  setTagId,
  setUsernameId,
}) => {
  // const [searchTerm, setSearchTerm] = React.useState<searchTerm>();
  // const [searchBy, setSearchBy] = React.useState<searchBy>();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBy, setSearchBy] = React.useState<SearchBy>('title');
  const [query, setQuery] = React.useState('home');
  const [tagParam, setTagParam] = React.useState('');
  const history = useHistory();
  return (
    <div>
      <Search
        query={query}
        searchBy={searchBy}
        onSearchByChange={() => setSearchBy(searchBy)}
        searchTerm={searchTerm}
        onSearchTermChange={() => setSearchTerm(searchTerm)}
      />
      <button
        type="button"
        onClick={() => {
          history.push('/snippets/all');
          setQuery(username);
        }}
      >
        All
      </button>
      <h1>
        Searching for {searchTerm} by {searchBy}
      </h1>

      <SnippetFeed
        setTagParam={setTagParam}
        setTagId={setTagId}
        setUsernameId={setUsernameId}
        searchBy={searchBy}
        searchTerm={searchTerm}
        snippets={snippets}
        username={username}
      />
    </div>
  );
};
