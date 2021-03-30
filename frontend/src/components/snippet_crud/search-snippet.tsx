import { Divider } from '@chakra-ui/layout';
import React from 'react'

interface searchSnippetProps {

}

export const SearchSnippet: React.FC<searchSnippetProps> = ({}) => {
    return (
      <div>
        <form action="/search_snippets/<%= username %>" method="POST">
          <div>

            <input type="text" name="search" placeholder="Search snippets" />
            <select name="search_type">
              <option value="title">Title</option>
              <option value="language">Language</option>
              <option value="tag">Tags</option>
            </select>

          </div>
          <button type="submit">Search</button>
        </form>
        <button onClick={() => window.location.href='/snippets/all'}>All</button>
        <h1>Searching for {searchterm} by {searchby}</h1>

        {snippets.map((snippet) => (
          snippet.tag = snippet.tags.join('') &&
          snippet[searchBy].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 &&
          (
            <div>
              <h2>snippet.title</h2>
              { user === snippet.creater && <a href="/edit/snippet.id">EDIT</a>}
              <h3>snippet.language</h3>
              <h4><a href="/snippets/user/snippet.creator %>">{snippet.creator}</a> - {snippet.createdOn}</h4>
          <section id="snippet-code">
            <pre>{snippet.valie}</pre>
          </section>
          <section id="snippet-notes">
            <p>{snippet.description}</p>
          </section>
          {
            snippet.tags.length > 0 && snippet.tags[0] !== '' &&
            <section id="snippet-tags">
              <p>
                {
                  snippet.tags.map((tag) => (
                    <button onClick={() => window.location.href='/tags/{tag}'} id="single-tag">{tag}</button>
                  ))
                }
              </p>
            </section>
          }
            </div>
          )
        ))}
      </div>
    );
}