import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
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
import {
  putRequest,
  getRequest,
  postRequest,
} from '../../lib/fetcher';
import { useUserContext } from '../../context/user.context';

interface AddProps extends RouteComponentProps {}

export const AddSnippet = withRouter(({ history }: AddProps) => {
  const languages = [{ value: '', label: 'All' }, ...LANGUAGES];
  const [message, setMessage] = React.useState(null);

  const [title, setTitle] = React.useState('');
  const [value, setValue] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [language, setLanguage] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [editing, setEditing] = React.useState(false);

  return (
    <Container>
      <h1>Create Snippet</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await postRequest({
              url: `api/snippets`,
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
          <Textarea
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
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Button type="submit">Add Snippet</Button>
      </form>
      {message && (
        <div style={{ color: 'tomato' }}>
          {JSON.stringify(message, null, 2)}
        </div>
      )}
    </Container>
  );
});
