import React from 'react';

interface SearchUserProps {}

export const SearchUser: React.FC<SearchUserProps> = ({}) => {
  return (
    <div>
      <form action="/search_snippets/{user}" method="POST">
        <input type="text" name="search" placeholder="Search snippets" />
        <select name="search_type">
          <option value="title">Title</option>
          <option value="language">Language</option>
          <option value="tag">Tags</option>
        </select>
        <input type="submit" value="Search" />
      </form>
      <button onClick={() => (window.location.href = '/profile')}>All</button>
    </div>
  );
};
