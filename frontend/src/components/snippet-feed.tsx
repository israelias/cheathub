import React from 'react'
import { Tags } from './shared/tags'
import { searchBy, searchTerm} from './snippet_crud/search-form'
import { string } from 'yup/lib/locale'

interface snippetFeedProps {
  snippets: Snippet[],
  searchBy: searchBy,
  searchTerm: searchTerm,
  username: String,
}

interface snippetFeedPropsState {

}

export const SnippetFeed: React.FC<snippetFeedProps> = ({
  snippets,
  searchBy,
  searchTerm,
  username,
}) => {
  const [tags, setTags] = React.useState('');
  const [searchParams, setSearchParams] = React.useState('');
  const [searchText, setSearchText] = React.useState(searchTerm);
  const [snippetsBase, setSnippetsBase] = React.useState(snippets);


  snippets.map((snippet) => {
    searchTerm && setSearchText(typeof(searchTerm) === 'string' ? searchTerm.toLowerCase() : searchTerm);
    snippet.tags && setTags(snippet.tags.join(''));
    snippet[searchBy] && setSearchParams(searchBy.toLowerCase());

    if (snippet[searchBy].toLowerCase().indexOf(searchText) !== -1) {
      return (
        <div>
          <h2>{snippet.title}</h2>
          { username === snippet.addedBy && <a href={`/edit/${snippet.id}`}>EDIT</a>}
          <h3>{snippet.language}</h3>
          <h4><a href={`/snippets/user/${snippet.addedBy}`}>{snippet.addedBy}</a> - {snippet.addedOn}</h4>
          <section id="snippet-code">
            <pre>{snippet.value}</pre>
          </section>
          <section id="snippet-notes">
            <p>{snippet.description}</p>
          </section>
          { snippet.tags.length > 0 && snippet.tags[0] !== '' &&
            <Tags
              tags={snippet.tags}
            />
          }
        </div>
      )
    }

  })
    return (
      <>
      {
        snippets.map((snippet) => (
          {
            if (snippet.tags){
              setParsedTags(snippet.tags.join(''))
            };
            if (snippet[searchBy].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {

            }

          }
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
            <Tags
                tags={snippet.tags}
              />
          }
            </div>
          )
        ))
      }
      </>
    );
}