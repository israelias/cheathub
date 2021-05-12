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
  useColorModeValue as mode,
  Select,
} from '@chakra-ui/react';

import { AnimatePresence, motion } from 'framer-motion';

import { LANGUAGES } from '../../../constants/languages.constants';
import { BrandButton } from '../../shared/brand-button';
import { StyledLabel } from './form-label';
import {
  PrimaryFooter,
  SecondaryHeader,
  SecondaryFooter,
} from '../../shared/particulars';

import { MotionForm } from '../../shared/motion';

const MotionBar = motion(Box);

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
    <AnimatePresence exitBeforeEnter>
      <MotionBar
        as="section"
        borderRadius="10px"
        padding={['0 10px']}
        border={['1px solid']}
        borderColor={mode('#9992b6', '#b6b1cb')}
        mt="10px"
        display="flex"
        flexDirection="column"
        width="100%"
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { opacity: 1, height: 'auto' },
          collapsed: { opacity: 0, height: '0' },
        }}
        transition={{
          duration: 0.5,
          ease: [0.04, 0.62, 0.23, 0.98],
        }}
        positionTransition
      >
        <AnimatePresence exitBeforeEnter>
          <MotionForm id="snippet" onSubmit={handleSubmit}>
            <FormControl pt="10px" isRequired id="title">
              <StyledLabel label="Title" />
              <Input
                mt="10px"
                type="text"
                borderColor={mode('#7e88c3', '#786e89')}
                focusBorderColor={mode('#ff5470', '#fde24f')}
                bg={mode('#fafafa', '#0b0914')}
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
                borderColor={mode('#7e88c3', '#786e89')}
                focusBorderColor={mode('#ff5470', '#fde24f')}
                bg={mode('#fafafa', '#0b0914')}
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
                fontSize="sm"
                borderColor={mode('#7e88c3', '#786e89')}
                focusBorderColor={mode('#ff5470', '#fde24f')}
                bg={mode('#fafafa', '#0b0914')}
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
                borderRadius="6px"
                borderColor={mode('#7e88c3', '#786e89')}
                focusBorderColor={mode('#ff5470', '#fde24f')}
                bg={mode('#fafafa', '#0b0914')}
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
                borderRadius="6px"
                borderColor={mode('#7e88c3', '#786e89')}
                focusBorderColor={mode('#ff5470', '#fde24f')}
                bg={mode('#fafafa', '#0b0914')}
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
                borderRadius="6px"
                borderColor={mode('#7e88c3', '#786e89')}
                focusBorderColor={mode('#ff5470', '#fde24f')}
                bg={mode('#fafafa', '#0b0914')}
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
                hidden
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
        </AnimatePresence>
      </MotionBar>

      <Box position="sticky" width="100%" mt="auto" bottom={0}>
        {' '}
        <SecondaryFooter>
          {editing && (
            <MotionForm
              ml="8px"
              id="delete-snippet"
              onSubmit={handleDelete}
            >
              <BrandButton
                type="button"
                isLoading={deleting}
                loadingText="Deleting"
                onClick={() => setAlert(true)}
              >
                Delete
              </BrandButton>
            </MotionForm>
          )}

          <BrandButton type="button" onClick={handleCancel}>
            Cancel
          </BrandButton>

          <BrandButton
            mr="16px"
            type="submit"
            form="snippet"
            isLoading={submitting}
            loadingText="Submitting"
          >
            {editing ? 'Update' : 'Add'}
          </BrandButton>
        </SecondaryFooter>
      </Box>
    </AnimatePresence>
  );
};

export default SnippetCrud;
