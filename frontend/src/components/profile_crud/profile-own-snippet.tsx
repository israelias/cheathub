import React, { ReactInstance } from 'react'

interface ProfileOwnSnippets {
  snippets: [{}];
}

export const ProfileOwnSnippets: React.FC<ProfileOwnSnippets> = ({ snippets }) => {
    return (
      <div>
        <h1 id="clear">Your Gists</h1>
        {snippets.map(( snippet: Array ) => (
          <div>
          <h2>{snippet.title} -
            <a href="/edit/<%= snippet._id %>">EDIT</a>
          </h2>
          <h3>snippet.language</h3>
          <h4>snippet.createdOn</h4>
          <section id="code">
            <pre>snippet.value</pre>
          </section>
          <section id="description">
            <p>snippet.description</p>
          </section>
          {snippet.tags.length > 0 && snippet.tags[0] !== "" &&
            <section id="snippet-tags">
            <p>
              { snippet.tags.map(( tag: string ) => (
                <button onClick={() => window.location.href='/tags/{tag}'} id="tag">{tag}</button>
              ))}
              </p>
            </section>
          }
        </div>
        ))}

      </div>
    );
}