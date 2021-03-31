import { withRouter } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Container,
} from "@chakra-ui/react";
import { SelectInput } from './select-input';
import { TextInput } from './text-search-input';
import { LANGUAGES } from '../../constants/languages.constants'

export const AddSnippet = withRouter(({ history }) => {
  const languages = [{ value: '', label: 'All'}, ...LANGUAGES];
  return (
    <Container>
      <h1>Create Snippet</h1>
      <form
        action="/snippet/add"
        method="POST"
      >
        <TextInput
          name="title"
          label="Title:"
        />

        <FormControl id="body">
          <FormLabel>Code Snippet:</FormLabel>
          <Textarea></Textarea>
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
          label="Tags: (separate by semicolon)"
        />
        <Button type="submit">Add Snippet</Button>
      </form>
    </Container>
  );
});