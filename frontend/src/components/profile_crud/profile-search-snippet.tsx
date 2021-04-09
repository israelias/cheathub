import React from 'react';
import { RouteComponentProps } from 'react-router';

interface SearchUserProps extends RouteComponentProps {}

export const SearchUser: React.FC<SearchUserProps> = ({
  history,
}) => (
  <div>
    <form action="/search_snippets/{user}" method="POST">
      <input
        type="text"
        name="search"
        placeholder="Search snippets"
      />
      <select name="search_type">
        <option value="title">Title</option>
        <option value="language">Language</option>
        <option value="tag">Tags</option>
      </select>
      <input type="submit" value="Search" />
    </form>
    <button
      type="button"
      onClick={() => history.push('/profile')}
    >
      All
    </button>
  </div>
);
