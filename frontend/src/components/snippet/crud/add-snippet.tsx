/* eslint-disable no-console */
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
import { LANGUAGES } from '../../../constants/languages.constants';
import {
  putRequest,
  getRequest,
  postRequest,
} from '../../../lib/fetcher';
import { Viewer } from '../editor/viewer';

import {
  CodeBlock,
  Display,
  Card,
  Heading,
  Description,
  ButtonGroup,
  Button as CardButton,
  FormCardPage,
  FormCardView,
  FormCardContainer,
  FormCardContainerTop,
  FormCardTitle,
  FormCard,
  FormHeading,
  FormText,
  FormBottom,
  FormBottomLeft,
  FormBottomRight,
  IconClose,
  SuccessButton,
  DefeatButton,
  FormTop,
  FormTopAbsolute,
  FormTopCell,
  FormTopCellRight,
  GenerateTagList,
  NewRowWrapper,
  TagList,
  TagItem,
} from '../../layout/styled/commonCard';

import { useUserContext } from '../../../context/user.context';

interface AddProps extends RouteComponentProps {}

export const AddSnippet = withRouter(({ history }: AddProps) => {
  const { accessToken } = useUserContext();
  const languages = [{ value: '', label: 'All' }, ...LANGUAGES];
  const [message, setMessage] = React.useState(null);

  const [title, setTitle] = React.useState('Your Title');
  const [value, setValue] = React.useState('Hello world!');
  const [description, setDescription] = React.useState(
    'Your description'
  );
  const [language, setLanguage] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [editing, setEditing] = React.useState(false);

  return (
    <FormCardPage>
      <FormCardView>
        <FormCardContainerTop>
          <FormCardTitle>Create Snippet</FormCardTitle>
        </FormCardContainerTop>
        <FormCardContainer>
          <FormCard>
            <>
              <FormTopAbsolute>
                <Card>
                  <Heading>
                    <p>{title}</p>
                  </Heading>
                  <CodeBlock>
                    <>
                      <Viewer
                        value={value}
                        language={language}
                        id="test"
                      />
                    </>
                  </CodeBlock>
                  <Description>
                    <p>{description}</p>
                  </Description>
                  <NewRowWrapper>Posted By</NewRowWrapper>
                  <NewRowWrapper>
                    <TagList>
                      <TagItem>item</TagItem>
                    </TagList>
                  </NewRowWrapper>

                  <ButtonGroup>
                    <CardButton>Add</CardButton>
                    <CardButton>test</CardButton>
                    <CardButton>Expand</CardButton>
                  </ButtonGroup>
                </Card>
              </FormTopAbsolute>
            </>
            <Container>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await postRequest({
                      url: `api/snippets`,
                      accessToken,

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
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    console.log('VALUE', e.target.value);
                  }}
                />
                <TextInput
                  onFocus={() => setEditing(true)}
                  onBlur={() => setEditing(false)}
                  name="tags"
                  label="Tags: (separate by semicolon)"
                  value={tags}
                  onChange={(e) =>
                    setTags(
                      e.target.value.toString().replace(/\D/g, '')
                    )
                  }
                />
                <Button type="submit">Add Snippet</Button>
              </form>
              {message && (
                <div style={{ color: 'tomato' }}>
                  {JSON.stringify(message, null, 2)}
                </div>
              )}
            </Container>
          </FormCard>
        </FormCardContainer>
      </FormCardView>
    </FormCardPage>
  );
});
