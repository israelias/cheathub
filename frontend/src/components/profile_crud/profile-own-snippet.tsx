import React from 'react';
import { Tags } from '../shared/tags';

export interface SnippetState {
  snippet: Snippet[];
}

export interface SnippetProps {
  snippets: Snippet[];
  setTagId: () => void;
}

export const ProfileOwnSnippets: React.FC<SnippetProps> = ({
  snippets,
  setTagId,
}) => (
  <div>
    <h1 id="clear">Your Gists</h1>
    {snippets.map((snippet) => (
      // eslint-disable-next-line no-underscore-dangle
      <div key={snippet._id}>
        <h2>
          {snippet.title} -
          <a href={`/edit/${snippet.id}`}>EDIT</a>
        </h2>
        <h3>{snippet.language}</h3>
        <h4>{snippet.addedOn}</h4>
        <section id="code">
          <pre>{snippet.value}</pre>
        </section>
        <section id="description">
          <p>{snippet.description}</p>
        </section>
        {snippet.tags.length > 0 &&
          snippet.tags[0] !== '' && (
            <Tags setTagId={setTagId} tags={snippet.tags} />
          )}
      </div>
    ))}
  </div>
);
