import { Divider } from '@chakra-ui/layout';
import React from 'react'
import { Search } from '../snippet_crud/search-form'
import { Snippet } from '../profile_crud/profile-own-snippet';
import { SnippetFeed } from '../snippet-feed'
import { searchBy, searchTerm} from '../snippet_crud/search-form'

interface searchSnippetProps {
  username: String;
  snippets: [Snippet];
}

// type selectOptions = "title" | "language" | "tag"
// type searchText = string

// interface selectOptions {
//   string: "title" | "language" | "tag"
// }

export const SearchSnippet: React.FC<searchSnippetProps> = ({
  username,
  snippets,
}) => {
  const [searchTerm, setSearchTerm] = React.useState<searchTerm>();
  const [searchBy, setSearchBy] = React.useState<searchBy>();
    return (
      <div>
        <Search
          query={username}
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
          snippets={snippets}
          username={username}
        />
      </div>
    );
}