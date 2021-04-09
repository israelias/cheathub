import React from 'react';
// import { string } from 'yup/lib/locale';
import { Tags } from './shared/tags';
import { Likes } from './shared/liked-by';

interface SnippetFeedProps {
  snippets: Snippet[];
  searchBy: SearchBy;
  searchTerm: SearchTerm;
  username: string;
  setTagId: () => void;
  setUsernameId: () => void;
}

export const SnippetFeed: React.FC<SnippetFeedProps> = ({
  snippets,
  searchBy,
  searchTerm,
  username,
  setTagId,
  setUsernameId,
}) => (
  // const [tags, setTags] = React.useState('');
  // const [searchParams, setSearchParams] = React.useState('');
  // const [searchText, setSearchText] = React.useState(searchTerm);
  // const [snippetsBase, setSnippetsBase] = React.useState(snippets);
  // searchTerm && setSearchText(typeof(searchTerm) === 'string' ? searchTerm.toLowerCase() : searchTerm);
  // snippet.tags && setTags(snippet.tags.join(''));
  // snippet[searchBy] && setSearchParams(searchBy.toLowerCase());
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
            {snippet.tags.length > 0 &&
              snippet.tags[0] !== '' && (
                <Tags
                  tags={snippet.tags}
                  setTagId={setTagId}
                />
              )}
            {snippet.likedBy.length > 0 && (
              <Likes
                usernames={snippet.likedBy}
                setUsernameId={setUsernameId}
              />
            )}
          </div>
        )
    )}
  </>
);
