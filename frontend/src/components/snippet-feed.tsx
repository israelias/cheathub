import React from 'react';
import { Tags } from './shared/tags';
import { Likes } from './shared/liked-by';
import { string } from 'yup/lib/locale';

interface snippetFeedProps {
  snippets: Snippet[];
  searchBy: searchBy;
  searchTerm: searchTerm;
  username: string;
}

export const SnippetFeed: React.FC<snippetFeedProps> = ({
  snippets,
  searchBy,
  searchTerm,
  username,
}) => {
  // const [tags, setTags] = React.useState('');
  // const [searchParams, setSearchParams] = React.useState('');
  // const [searchText, setSearchText] = React.useState(searchTerm);
  // const [snippetsBase, setSnippetsBase] = React.useState(snippets);
  // searchTerm && setSearchText(typeof(searchTerm) === 'string' ? searchTerm.toLowerCase() : searchTerm);
  // snippet.tags && setTags(snippet.tags.join(''));
  // snippet[searchBy] && setSearchParams(searchBy.toLowerCase());
  return (
    <>
      {snippets.map(
        (snippet) =>
          snippet[searchBy].indexOf(searchTerm) !== -1 && (
            <div>
              <h2>{snippet.title}</h2>
              {username === snippet.addedBy && (
                <a href={`/edit/${snippet.id}`}>EDIT</a>
              )}
              <h3>{snippet.language}</h3>
              <h4>
                <a href={`/snippets/user/${snippet.addedBy}`}>
                  {snippet.addedBy}
                </a>{' '}
                - {snippet.addedOn}
              </h4>
              <section id="snippet-code">
                <pre>{snippet.value}</pre>
              </section>
              <section id="snippet-notes">
                <p>{snippet.description}</p>
              </section>
              {snippet.tags.length > 0 && snippet.tags[0] !== '' && (
                <Tags tags={snippet.tags} />
              )}
              {snippet.likedBy.length > 0 && (
                <Likes usernames={snippet.likedBy} />
              )}
            </div>
          )
      )}
    </>
  );
};
