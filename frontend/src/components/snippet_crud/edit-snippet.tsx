/* eslint-disable no-underscore-dangle */
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Container,
} from '@chakra-ui/react';
import { SelectInput } from './select-input';
import { TextInput } from './text-search-input';
import { LANGUAGES } from '../../constants/languages.constants';
import { CodeEditor } from '../editor/editor';
import { Viewer } from '../editor/viewer';
import {
  putRequest,
  getRequest,
  postRequest,
} from '../../lib/fetcher';
import { useUserContext } from '../../context/user.context';

import { Secondary } from '../../containers/secondary.container';
import { Primary } from '../../containers/primary.container';

interface EditProps extends RouteComponentProps {
  snippet: Snippet;
  snippetId: string;
}

export const EditSnippet = withRouter(
  ({ snippet, snippetId, history }: EditProps) => {
    const languages = [{ value: '', label: 'All' }, ...LANGUAGES];
    const user = useUserContext();
    const [message, setMessage] = React.useState(null);

    const [title, setTitle] = React.useState(snippet.title);
    const [value, setValue] = React.useState(snippet.value);
    const [description, setDescription] = React.useState(
      snippet.description
    );
    const [language, setLanguage] = React.useState(snippet.language);
    const [tags, setTags] = React.useState(snippet.tags.join(';'));
    const [editing, setEditing] = React.useState(true);
    const [id, setId] = React.useState(snippetId);

    return (
      <>
        <Secondary>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await putRequest({
                  url: `api/snippets/${id}`,
                  // accessToken: user!.accessToken,
                  accessToken:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYxODMxMzI3MCwianRpIjoiNjNmZDc5OGYtMjBiYy00ZjZkLTg1ZmYtODlhZGI5ZTU5MWIxIiwibmJmIjoxNjE4MzEzMjcwLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiam9lbSIsImV4cCI6MTYxODMyNDA3MH0.0HwJ3u1JCAlpk6obK3wY8hMm3UuB8Rp9Se0q_fLxh0E',
                  body: {
                    title,
                    description,
                    value,
                    language,
                    tags: tags.split(';'),
                  },
                  redirectTo: '/',
                  history,
                });
              } catch (err) {
                setMessage(err);
              }
            }}
          >
            <TextInput
              name="title"
              label="Title:"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <FormControl id="body">
              <FormLabel>Code Snippet:</FormLabel>
              {/* <Viewer
                id={snippet._id}
                language={snippet.language}
                value={value}
              /> */}

              {/* <CodeEditor
              value={value}
              language={snippet.language}
            /> */}
              <Textarea
                // hidden
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </FormControl>

            <TextInput
              name="description"
              label="Description:"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <SelectInput
              label="Language:"
              options={languages}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            <TextInput
              name="tags"
              label="Tags: (separate by semicolon)"
              // value={snippet.tags.join(';')}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <Button type="submit">
              {editing ? 'Update Snippet' : 'Add Snippet'}
            </Button>
          </form>
          <form action={`/delete/${snippet.id}`} method="POST">
            <Button type="submit">Delete Snippet</Button>
          </form>
          {message && (
            <div style={{ color: 'tomato' }}>
              {JSON.stringify(message, null, 2)}
            </div>
          )}
        </Secondary>
        <Primary>
          <h1>Editing {snippet.title}</h1>
          <Viewer
            id={snippet._id}
            language={snippet.language}
            value={value}
          />
        </Primary>
      </>
    );
  }
);
