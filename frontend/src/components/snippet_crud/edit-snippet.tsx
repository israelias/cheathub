import React from 'react';
// import { useHistory } from 'react-router-dom';
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

interface Props {
  snippet: Snippet;
}

export const EditSnippet: React.FC<Props> = ({
  snippet,
}) => {
  // const history = useHistory();
  const languages = [
    { value: '', label: 'All' },
    ...LANGUAGES,
  ];
  return (
    <Container>
      <h1>Editing {snippet.title}</h1>
      <form action={`/edit/${snippet.id}`} method="POST">
        <TextInput name="title" label="Title:" />

        <FormControl id="body">
          <FormLabel>Code Snippet:</FormLabel>
          <Textarea />
        </FormControl>

        <TextInput
          name="description"
          label="Description:"
        />
        <SelectInput
          label="Language:"
          value="Select Language"
          options={languages}
        />
        <TextInput
          name="tags"
          value={snippet.tags.join(';')}
          label="Tags: (separate by semicolon)"
        />
        <Button type="submit">Update Snippet</Button>
      </form>
      <form action={`/delete/${snippet.id}`} method="POST">
        <Button type="submit">Delete Snippet</Button>
      </form>
    </Container>
  );
};
