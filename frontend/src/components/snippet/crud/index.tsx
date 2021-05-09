/* eslint-disable no-alert */
/* eslint-disable no-console */

/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';

import {
  Flex,
  Heading,
  IconButton,
  Button,
  ButtonGroup,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Box,
  HStack,
  VStack,
  Editable,
  EditableInput,
  EditablePreview,
  Checkbox,
  Switch,
  Divider,
  Select,
} from '@chakra-ui/react';

import { AnimatePresence, motion } from 'framer-motion';

import { LANGUAGES } from '../../../constants/languages.constants';

import { StyledLabel } from './form-label';

import { MotionForm } from '../../shared/motion-box';

/**
 * Frontend private endpoint that represents a single code snippet post.
 * Selected by `_id`.
 * CRUD operations begin from this component tree.
 * @file defines route for one unique Snippet.
 * @date 2021-04-21
 * @param {any} match
 * @param {any} history
 * @return {=>}
 */
const SnippetCrud: React.FC<{
  snippet: Snippet | undefined;
  editing: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  tags: string;
  setTags: React.Dispatch<React.SetStateAction<string>>;
  source: string;
  setSource: React.Dispatch<React.SetStateAction<string>>;
  privatize?: string;
  setPrivatize?: React.Dispatch<React.SetStateAction<string>>;
  submitting?: boolean;
  deleting: boolean;
  setId?: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleDelete: React.FormEventHandler<HTMLFormElement>;
  handleCancel: React.MouseEventHandler<HTMLButtonElement>;
}> = ({
  editing,
  setAlert,
  title,
  setTitle,
  language,
  setLanguage,
  value,
  setValue,
  description,
  setDescription,
  tags,
  setTags,
  source,
  setSource,
  privatize,
  setPrivatize,
  submitting,
  deleting,
  handleSubmit,
  handleDelete,
  handleCancel,
}) => {
  const languages = [{ value: '', label: 'All' }, ...LANGUAGES];
  return (
    <>
      <Box
        borderRadius="10px"
        padding={['0 10px']}
        border={['1px solid #bbb']}
        mt="10px"
      >
        <AnimatePresence exitBeforeEnter>
          <MotionForm id="snippet" onSubmit={handleSubmit}>
            <FormControl pt="10px" isRequired id="title">
              <StyledLabel label="Title" />
              <Input
                mt="10px"
                type="text"
                borderColor="#f6f6f6"
                fontSize="sm"
                placeHolder="My New Code Snippet"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormHelperText hidden>Title.</FormHelperText>
            </FormControl>

            <FormControl pt="10px" isRequired id="body">
              <StyledLabel label="Code Snippet" />
              <Textarea
                mt="10px"
                mr="-10px"
                minHeight="20vh"
                fontSize="sm"
                borderRadius={0}
                placeHolder="hello world"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <FormHelperText hidden>
                Paste code from a source or type here directly.
              </FormHelperText>
            </FormControl>

            <FormControl pt="10px" isRequired id="description">
              <StyledLabel label="Description" />
              <Textarea
                mt="10px"
                borderColor="#f6f6f6"
                fontSize="sm"
                placeHolder="About my new code snippet..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormHelperText hidden>
                A short description of your code snippet.
              </FormHelperText>
            </FormControl>

            <FormControl pt="10px" isRequired id="language">
              <StyledLabel label="Language" />
              <Select
                mt="10px"
                size="sm"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((lang: Options) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl pt="10px" id="tags">
              <StyledLabel label="Tags" />
              <Input
                mt="10px"
                type="text"
                size="sm"
                borderColor="#f6f6f6"
                placeHolder="intros, how-tos, placeholders"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <FormHelperText>
                Tags (separated by comma).
              </FormHelperText>
            </FormControl>

            <FormControl pt="10px" id="source">
              <StyledLabel label="Source" />
              <Input
                mt="10px"
                type="text"
                size="sm"
                borderColor="#f6f6f6"
                value={source}
                placeholder="https://"
                onChange={(e) => setSource(e.target.value)}
              />
              <FormHelperText hidden>
                Add a URL source?
              </FormHelperText>
            </FormControl>

            <FormControl pt="10px" display="flex" alignItems="center">
              <FormLabel
                p={['0 10px']}
                m={0}
                bg="#f6f6f6"
                borderRadius="md"
                color="gray.700"
                fontWeight="light"
                size="sm"
                fontSize="sm"
                htmlFor="private"
                mb="0"
              >
                Make private
              </FormLabel>
              {privatize && setPrivatize && (
                <Switch
                  ml="10px"
                  size="sm"
                  id="private"
                  value={privatize}
                  onChange={(e) => setPrivatize(e.target.value)}
                />
              )}
              <FormHelperText hidden>
                Snippets are public by default
              </FormHelperText>
            </FormControl>
          </MotionForm>
          {editing ? (
            <HStack>
              <MotionForm id="delete" onSubmit={handleDelete}>
                <Button
                  type="button"
                  isLoading={deleting}
                  loadingText="Deleting"
                  onClick={() => setAlert(true)}
                >
                  Delete
                </Button>
              </MotionForm>
              <ButtonGroup
                variant="outline"
                spacing="8"
                alignSelf="center"
                padding={['20px 10px']}
              >
                <Button
                  ml="12px"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  form="snippet"
                  isLoading={submitting}
                  loadingText="Submitting"
                >
                  {editing ? 'Update' : 'Add'}
                </Button>
              </ButtonGroup>
            </HStack>
          ) : (
            <HStack>
              <MotionForm id="delete" onSubmit={handleDelete}>
                <Button
                  type="button"
                  isLoading={deleting}
                  loadingText="Deleting"
                  onClick={() => setAlert(true)}
                >
                  Delete
                </Button>
              </MotionForm>
              <ButtonGroup
                variant="outline"
                spacing="8"
                alignSelf="center"
                padding={['20px 10px']}
              >
                <Button
                  ml="12px"
                  type="button"
                  onClick={() => {
                    setTitle('');
                    setDescription('');
                    setValue('');
                    setLanguage('');
                    setTags('');
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  form="snippet"
                  isLoading={submitting}
                  loadingText="Submitting"
                >
                  {editing ? 'Update' : 'Add'}
                </Button>
              </ButtonGroup>
            </HStack>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
};

export default SnippetCrud;
