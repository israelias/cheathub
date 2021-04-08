import { Divider } from '@chakra-ui/layout';
import React from 'react';
import { Search } from '../snippet_crud/search-form';
import { SnippetFeed } from '../snippet-feed';

interface searchSnippetProps {
  username: string;
  snippets: Snippet[];
}

export const SearchSnippet: React.FC<searchSnippetProps> = ({
  username,
  snippets,
}) => {
  // const [searchTerm, setSearchTerm] = React.useState<searchTerm>();
  // const [searchBy, setSearchBy] = React.useState<searchBy>();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBy, setSearchBy] = React.useState<searchBy>('title');
  const [query, setQuery] = React.useState('home');
  return (
    <div>
      <Search
        query={'query'}
        searchBy={searchBy}
        onSearchByChange={() => setSearchBy(searchBy)}
        searchTerm={searchTerm}
        onSearchTermChange={() => setSearchTerm(searchTerm)}
      />
      <button onClick={() => (window.location.href = '/snippets/all')}>
        All
      </button>
      <h1>
        Searching for {searchTerm} by {searchBy}
      </h1>

      <SnippetFeed
        searchBy={searchBy}
        searchTerm={searchTerm}
        snippets={snippets}
        username={username}
      />
    </div>
  );
};
